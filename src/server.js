// Servidor HTTP del MVP: API JSON + archivos estáticos de public/. Sin dependencias externas.
import http from 'node:http';
import { readFile, writeFile, stat, rm } from 'node:fs/promises';
import { randomBytes, randomUUID } from 'node:crypto';
import path from 'node:path';
import { db, FILES_DIR, TIPOS } from './db.js';

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(import.meta.dirname, 'public');
// Simulación del registro institucional: sólo se comprueba el dominio, no la regularidad.
const DOMINIO = (process.env.EMAIL_DOMINIO || 'unlam.edu.ar').toLowerCase();
const ADMIN_KEY = process.env.ADMIN_KEY || randomBytes(6).toString('hex');
const MAX_BODY = 15 * 1024 * 1024;
const EXTENSIONES = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.txt', '.md', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.zip']);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
};

class HttpError extends Error {
  constructor(status, message, codigo) { super(message); this.status = status; this.codigo = codigo; }
}

const q = {
  usuarioPorToken: db.prepare('SELECT id, email, nombre FROM usuarios WHERE token = ?'),
  usuarioPorEmail: db.prepare('SELECT id, email, nombre, token FROM usuarios WHERE email = ?'),
  crearUsuario: db.prepare('INSERT INTO usuarios (email, nombre, token) VALUES (?, ?, ?)'),
  cursadas: db.prepare(`SELECT c.id AS comisionId, c.codigo, c.cuatrimestre, c.docente, m.id AS materiaId, m.nombre AS materia
    FROM inscripciones i JOIN comisiones c ON c.id = i.comision_id JOIN materias m ON m.id = c.materia_id
    WHERE i.usuario_id = ? ORDER BY m.nombre`),
  precargadas: db.prepare('SELECT comision_id FROM inscripciones_precargadas WHERE email = ?'),
  inscribir: db.prepare('INSERT OR IGNORE INTO inscripciones (usuario_id, comision_id) VALUES (?, ?)'),
  borrarInscripciones: db.prepare('DELETE FROM inscripciones WHERE usuario_id = ?'),
  materias: db.prepare('SELECT id, nombre FROM materias ORDER BY nombre'),
  materia: db.prepare('SELECT id, nombre FROM materias WHERE id = ?'),
  comisiones: db.prepare('SELECT id, materia_id AS materiaId, codigo, cuatrimestre, docente, activa FROM comisiones ORDER BY materia_id, cuatrimestre DESC, codigo'),
  comision: db.prepare(`SELECT c.id, c.codigo, c.cuatrimestre, c.docente, m.id AS materiaId, m.nombre AS materia
    FROM comisiones c JOIN materias m ON m.id = c.materia_id WHERE c.id = ?`),
  inscripto: db.prepare('SELECT 1 FROM inscripciones WHERE usuario_id = ? AND comision_id = ?'),
  materialesDeMateria: db.prepare(`SELECT ${camposMaterial()}, x.archivo_ruta AS archivoRuta FROM materiales x JOIN comisiones c ON c.id = x.comision_id
    LEFT JOIN usuarios u ON u.id = x.autor_id WHERE c.materia_id = ? ORDER BY x.creado DESC, x.id DESC`),
  material: db.prepare(`SELECT ${camposMaterial()}, x.archivo_ruta AS archivoRuta FROM materiales x JOIN comisiones c ON c.id = x.comision_id
    LEFT JOIN usuarios u ON u.id = x.autor_id WHERE x.id = ?`),
  crearMaterial: db.prepare(`INSERT INTO materiales (comision_id, tipo, titulo, docente, tema, contexto, advertencia,
    archivo_nombre, archivo_ruta, archivo_mime, enlace, autor_id, origen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'participante')`),
  consultas: db.prepare(`SELECT k.id, k.texto, k.creado, u.id AS autorId, u.nombre AS autor FROM consultas k
    JOIN usuarios u ON u.id = k.autor_id WHERE k.comision_id = ? ORDER BY k.creado DESC, k.id DESC`),
  consulta: db.prepare('SELECT id, comision_id AS comisionId, autor_id AS autorId FROM consultas WHERE id = ?'),
  respuestas: db.prepare(`SELECT r.id, r.texto, r.util, r.creado, u.id AS autorId, u.nombre AS autor FROM respuestas r
    JOIN usuarios u ON u.id = r.autor_id WHERE r.consulta_id = ? ORDER BY r.creado, r.id`),
  respuesta: db.prepare('SELECT r.id, r.consulta_id AS consultaId, r.autor_id AS autorId, r.util FROM respuestas r WHERE r.id = ?'),
  crearConsulta: db.prepare('INSERT INTO consultas (comision_id, autor_id, texto) VALUES (?, ?, ?)'),
  crearRespuesta: db.prepare('INSERT INTO respuestas (consulta_id, autor_id, texto) VALUES (?, ?, ?)'),
  marcarUtil: db.prepare('UPDATE respuestas SET util = ? WHERE id = ?'),
  evento: db.prepare('INSERT INTO eventos (usuario_id, tipo, datos) VALUES (?, ?, ?)'),
  eventos: db.prepare(`SELECT e.id, e.creado, e.tipo, e.datos, u.email, u.nombre FROM eventos e
    LEFT JOIN usuarios u ON u.id = e.usuario_id ORDER BY e.id`),
  usuarios: db.prepare('SELECT id, email, nombre, creado FROM usuarios ORDER BY id'),
  borrarMaterial: db.prepare('DELETE FROM materiales WHERE id = ?'),
  actualizarNombre: db.prepare('UPDATE usuarios SET nombre = ? WHERE id = ?'),
  // Resumen de cada cursada para la pantalla «Mis materias» (reemplaza a las notificaciones, que quedan fuera del MVP).
  resumenCursadas: db.prepare(`SELECT i.comision_id AS comisionId,
      (SELECT COUNT(*) FROM materiales x WHERE x.comision_id = i.comision_id) AS materiales,
      (SELECT COUNT(*) FROM consultas k WHERE k.comision_id = i.comision_id) AS consultas,
      (SELECT COUNT(*) FROM consultas k WHERE k.comision_id = i.comision_id
         AND NOT EXISTS (SELECT 1 FROM respuestas r WHERE r.consulta_id = k.id)) AS sinRespuesta,
      (SELECT COUNT(*) FROM consultas k WHERE k.comision_id = i.comision_id AND k.autor_id = i.usuario_id
         AND EXISTS (SELECT 1 FROM respuestas r WHERE r.consulta_id = k.id AND r.autor_id <> i.usuario_id)) AS misConsultasRespondidas
    FROM inscripciones i WHERE i.usuario_id = ?`),
  conteoPorMateria: db.prepare(`SELECT c.materia_id AS materiaId, COUNT(x.id) AS materiales FROM comisiones c
    LEFT JOIN materiales x ON x.comision_id = c.id GROUP BY c.materia_id`),
};

function camposMaterial() {
  return `x.id, x.tipo, x.titulo, x.docente, x.tema, x.contexto, x.advertencia, x.archivo_nombre AS archivoNombre,
    x.archivo_mime AS archivoMime, x.enlace, x.origen, x.creado, u.nombre AS autor, x.autor_id AS autorId,
    c.id AS comisionId, c.codigo, c.cuatrimestre, c.materia_id AS materiaId`;
}

// Tipo y tamaño del archivo para el detalle (corrección 9 del TP4). No expone la ruta en disco.
async function conTamano(material) {
  const { archivoRuta, ...resto } = material;
  const info = archivoRuta ? await stat(path.join(FILES_DIR, path.basename(archivoRuta))).catch(() => null) : null;
  return { ...resto, archivoTamano: info?.size ?? null };
}

function registrar(usuarioId, tipo, datos) {
  q.evento.run(usuarioId ?? null, tipo, datos ? JSON.stringify(datos) : null);
}

function texto(valor, campo, { requerido = true, max = 1000 } = {}) {
  const limpio = typeof valor === 'string' ? valor.trim() : '';
  if (requerido && !limpio) throw new HttpError(400, `Completá el campo «${campo}».`);
  if (limpio.length > max) throw new HttpError(400, `El campo «${campo}» admite hasta ${max} caracteres.`);
  return limpio || null;
}

function perfil(usuario) {
  return { ...usuario, token: undefined, cursadas: q.cursadas.all(usuario.id) };
}

function autenticar(req, url) {
  const token = req.headers['x-token'] || url.searchParams.get('t');
  const usuario = token ? q.usuarioPorToken.get(String(token)) : undefined;
  if (!usuario) throw new HttpError(401, 'Tu sesión no es válida. Volvé a ingresar.');
  return usuario;
}

function exigirInscripcion(usuario, comisionId) {
  if (!q.inscripto.get(usuario.id, comisionId)) throw new HttpError(403, 'Las consultas son sólo para estudiantes de esa comisión.');
}

const rutas = [
  ['POST', /^\/api\/registro$/, async ({ body }) => {
    const email = texto(body.email, 'Correo institucional', { max: 120 }).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+$/.test(email) || !email.endsWith(DOMINIO)) {
      throw new HttpError(400, `Usá tu correo institucional (termina en ${DOMINIO}).`);
    }
    let usuario = q.usuarioPorEmail.get(email);
    if (usuario) {
      registrar(usuario.id, 'ingreso');
    } else {
      // Primer ingreso: el cliente pide el nombre en un segundo paso.
      if (!body.nombre?.trim()) return { necesitaNombre: true };
      const nombre = texto(body.nombre, 'Nombre', { max: 60 });
      const token = randomUUID();
      const { lastInsertRowid } = q.crearUsuario.run(email, nombre, token);
      usuario = { id: Number(lastInsertRowid), email, nombre, token };
      for (const { comision_id } of q.precargadas.all(email)) q.inscribir.run(usuario.id, comision_id);
      registrar(usuario.id, 'registro');
    }
    return { token: usuario.token, usuario: perfil(usuario) };
  }],
  ['GET', /^\/api\/yo$/, ({ usuario }) => perfil(usuario)],
  ['PUT', /^\/api\/yo$/, ({ usuario, body }) => {
    const nombre = texto(body.nombre, 'Nombre', { max: 60 });
    q.actualizarNombre.run(nombre, usuario.id);
    return perfil({ ...usuario, nombre });
  }],
  ['GET', /^\/api\/yo\/resumen$/, ({ usuario }) => ({
    cursadas: q.resumenCursadas.all(usuario.id),
    materias: q.conteoPorMateria.all(),
  })],
  ['PUT', /^\/api\/yo\/cursadas$/, ({ usuario, body }) => {
    const ids = Array.isArray(body.comisionIds) ? body.comisionIds.map(Number) : [];
    if (!ids.length) throw new HttpError(400, 'Elegí al menos una materia que estés cursando.');
    const materiasElegidas = new Set();
    for (const id of ids) {
      const c = q.comision.get(id);
      if (!c) throw new HttpError(400, 'Una de las comisiones elegidas no existe.');
      if (materiasElegidas.has(c.materiaId)) throw new HttpError(400, `Elegiste dos comisiones de ${c.materia}. Dejá sólo la tuya.`);
      materiasElegidas.add(c.materiaId);
    }
    q.borrarInscripciones.run(usuario.id);
    for (const id of ids) q.inscribir.run(usuario.id, id);
    registrar(usuario.id, 'cursadas_elegidas', { comisionIds: ids });
    return perfil(usuario);
  }],
  ['GET', /^\/api\/catalogo$/, () => {
    const comisiones = q.comisiones.all();
    return { tipos: TIPOS, materias: q.materias.all().map(m => ({ ...m, comisiones: comisiones.filter(c => c.materiaId === m.id) })) };
  }],
  ['GET', /^\/api\/materias\/([\w-]+)\/materiales$/, async ({ params: [materiaId] }) => {
    const materia = q.materia.get(materiaId);
    if (!materia) throw new HttpError(404, 'La materia no existe.');
    return { materia, materiales: await Promise.all(q.materialesDeMateria.all(materiaId).map(conTamano)) };
  }],
  ['GET', /^\/api\/materiales\/(\d+)$/, async ({ params: [id] }) => {
    const material = q.material.get(Number(id));
    if (!material) throw new HttpError(404, 'El material no existe.');
    return conTamano(material);
  }],
  ['POST', /^\/api\/materiales$/, async ({ usuario, body }) => {
    const comision = q.comision.get(Number(body.comisionId));
    if (!comision) throw new HttpError(400, 'Elegí la comisión y el cuatrimestre del material.');
    const titulo = texto(body.titulo, 'Título', { max: 120 });
    const tipo = texto(body.tipo, 'Tipo de material', { max: 30 });
    if (!TIPOS.includes(tipo)) throw new HttpError(400, 'Elegí un tipo de material de la lista.');
    const contexto = texto(body.contexto, 'Contexto del aporte');
    const docente = texto(body.docente, 'Docente', { requerido: false, max: 80 });
    const tema = texto(body.tema, 'Tema o unidad', { requerido: false, max: 120 });
    const advertencia = texto(body.advertencia, 'Advertencias', { requerido: false });
    const enlace = texto(body.enlace, 'Enlace', { requerido: false, max: 500 });
    if (enlace && !/^https?:\/\//i.test(enlace)) throw new HttpError(400, 'El enlace tiene que empezar con http:// o https://.');
    let archivo = null;
    if (body.archivo?.base64) {
      const nombre = path.basename(String(body.archivo.nombre || 'archivo')).slice(0, 120);
      const ext = path.extname(nombre).toLowerCase();
      if (!EXTENSIONES.has(ext)) throw new HttpError(400, `No se admiten archivos ${ext || 'sin extensión'}. Usá PDF, imagen, texto u Office.`);
      const datos = Buffer.from(String(body.archivo.base64), 'base64');
      if (!datos.length) throw new HttpError(400, 'El archivo está vacío.');
      const ruta = `${randomUUID()}${ext}`;
      await writeFile(path.join(FILES_DIR, ruta), datos);
      archivo = { nombre, ruta, mime: MIME[ext] || 'application/octet-stream' };
    }
    if (!archivo && !enlace) throw new HttpError(400, 'Adjuntá un archivo o pegá un enlace al material.');
    const { lastInsertRowid } = q.crearMaterial.run(comision.id, tipo, titulo, docente, tema, contexto, advertencia,
      archivo?.nombre ?? null, archivo?.ruta ?? null, archivo?.mime ?? null, enlace, usuario.id);
    const enSuCursada = Boolean(q.inscripto.get(usuario.id, comision.id));
    registrar(usuario.id, 'material_subido', { materialId: Number(lastInsertRowid), comisionId: comision.id, enSuCursada, conAdvertencia: Boolean(advertencia) });
    return { id: Number(lastInsertRowid), materiaId: comision.materiaId };
  }],
  ['DELETE', /^\/api\/materiales\/(\d+)$/, async ({ usuario, params: [id] }) => {
    const material = q.material.get(Number(id));
    if (!material) throw new HttpError(404, 'El material no existe.');
    if (material.autorId !== usuario.id) throw new HttpError(403, 'Sólo quien subió el material puede eliminarlo.');
    q.borrarMaterial.run(material.id);
    if (material.archivoRuta) await rm(path.join(FILES_DIR, path.basename(material.archivoRuta)), { force: true });
    registrar(usuario.id, 'material_eliminado', { materialId: material.id });
    return { ok: true };
  }],
  ['GET', /^\/api\/comisiones\/(\d+)\/consultas$/, ({ usuario, params: [id] }) => {
    const comision = q.comision.get(Number(id));
    if (!comision) throw new HttpError(404, 'La comisión no existe.');
    exigirInscripcion(usuario, comision.id);
    const consultas = q.consultas.all(comision.id).map(k => ({ ...k, respuestas: q.respuestas.all(k.id).map(r => ({ ...r, util: Boolean(r.util) })) }));
    return { comision, consultas };
  }],
  ['POST', /^\/api\/comisiones\/(\d+)\/consultas$/, ({ usuario, body, params: [id] }) => {
    const comision = q.comision.get(Number(id));
    if (!comision) throw new HttpError(404, 'La comisión no existe.');
    exigirInscripcion(usuario, comision.id);
    const { lastInsertRowid } = q.crearConsulta.run(comision.id, usuario.id, texto(body.texto, 'Tu consulta'));
    registrar(usuario.id, 'consulta_publicada', { consultaId: Number(lastInsertRowid), comisionId: comision.id });
    return { id: Number(lastInsertRowid) };
  }],
  ['POST', /^\/api\/consultas\/(\d+)\/respuestas$/, ({ usuario, body, params: [id] }) => {
    const consulta = q.consulta.get(Number(id));
    if (!consulta) throw new HttpError(404, 'La consulta no existe.');
    exigirInscripcion(usuario, consulta.comisionId);
    const { lastInsertRowid } = q.crearRespuesta.run(consulta.id, usuario.id, texto(body.texto, 'Tu respuesta'));
    registrar(usuario.id, 'respuesta_publicada', { consultaId: consulta.id, respuestaId: Number(lastInsertRowid), propia: consulta.autorId === usuario.id });
    return { id: Number(lastInsertRowid) };
  }],
  ['POST', /^\/api\/respuestas\/(\d+)\/util$/, ({ usuario, body, params: [id] }) => {
    const respuesta = q.respuesta.get(Number(id));
    if (!respuesta) throw new HttpError(404, 'La respuesta no existe.');
    const consulta = q.consulta.get(respuesta.consultaId);
    if (consulta.autorId !== usuario.id) throw new HttpError(403, 'Sólo quien hizo la consulta puede marcar una respuesta como útil.');
    const util = body.util === false ? 0 : 1;
    q.marcarUtil.run(util, respuesta.id);
    registrar(usuario.id, util ? 'respuesta_util' : 'respuesta_util_quitada', { consultaId: consulta.id, respuestaId: respuesta.id, deOtroEstudiante: respuesta.autorId !== usuario.id });
    return { util: Boolean(util) };
  }],
  ['POST', /^\/api\/eventos$/, ({ usuario, body }) => {
    const tipo = texto(body.tipo, 'tipo', { max: 40 });
    if (!/^[a-z_]+$/.test(tipo)) throw new HttpError(400, 'Tipo de evento inválido.');
    const datos = body.datos && typeof body.datos === 'object' ? body.datos : null;
    if (datos && JSON.stringify(datos).length > 2000) throw new HttpError(400, 'Evento demasiado grande.');
    if (tipo === 'enlace_abierto' && datos) {
      // Los materiales con enlace externo no pasan por el servidor: se completa el dato de cursada acá.
      const material = q.material.get(Number(datos.materialId));
      if (material) Object.assign(datos, { materiaId: material.materiaId, comisionId: material.comisionId, enSuCursada: Boolean(q.inscripto.get(usuario.id, material.comisionId)) });
    }
    registrar(usuario.id, tipo, datos);
    return { ok: true };
  }],
];

// Rutas que no exigen sesión.
const publicas = new Set(['/api/registro', '/api/catalogo']);

async function servirArchivoMaterial(req, res, url, id) {
  const usuario = autenticar(req, url);
  const material = q.material.get(Number(id));
  if (!material?.archivoRuta) throw new HttpError(404, 'Este material no tiene archivo adjunto.');
  const descargar = url.searchParams.get('descargar') === '1';
  const enSuCursada = Boolean(q.inscripto.get(usuario.id, material.comisionId));
  if (url.searchParams.get('registrar') !== '0') {
    registrar(usuario.id, descargar ? 'recurso_descargado' : 'recurso_visualizado', { materialId: material.id, materiaId: material.materiaId, comisionId: material.comisionId, enSuCursada });
  }
  const datos = await readFile(path.join(FILES_DIR, path.basename(material.archivoRuta)));
  const nombre = encodeURIComponent(material.archivoNombre || 'material');
  res.writeHead(200, {
    'Content-Type': material.archivoMime?.startsWith('text/') ? 'text/plain; charset=utf-8' : material.archivoMime || 'application/octet-stream',
    'Content-Disposition': `${descargar ? 'attachment' : 'inline'}; filename*=UTF-8''${nombre}`,
    'Content-Security-Policy': 'sandbox',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'private, no-store',
  });
  res.end(datos);
}

function exigirAdmin(url) {
  if (url.searchParams.get('clave') !== ADMIN_KEY) throw new HttpError(403, 'Clave de administración incorrecta.');
}

// Resumen para el equipo: insumo para las métricas del punto 1. Los tiempos son de la herramienta, no de la observación.
function resumen() {
  const eventos = q.eventos.all().map(e => ({ ...e, datos: e.datos ? JSON.parse(e.datos) : null }));
  const usuarios = q.usuarios.all().map(u => {
    const propios = eventos.filter(e => e.email === u.email);
    const primeraMateria = propios.find(e => e.tipo === 'materia_abierta');
    const primerAcceso = propios.find(e => ACCESOS.includes(e.tipo) && e.datos?.enSuCursada);
    const minutos = primeraMateria && primerAcceso ? (fechaUtc(primerAcceso.creado) - fechaUtc(primeraMateria.creado)) / 60000 : null;
    const consultasUsuario = db.prepare('SELECT id FROM consultas WHERE autor_id = ?').all(u.id);
    const conRespuestaDeOtro = consultasUsuario.filter(k => db.prepare('SELECT 1 FROM respuestas WHERE consulta_id = ? AND autor_id <> ?').get(k.id, u.id)).length;
    const conRespuestaUtil = consultasUsuario.filter(k => db.prepare('SELECT 1 FROM respuestas WHERE consulta_id = ? AND autor_id <> ? AND util = 1').get(k.id, u.id)).length;
    return {
      email: u.email, nombre: u.nombre, registrado: u.creado,
      minutosHastaRecursoDeSuCursada: minutos === null ? null : Math.round(minutos * 10) / 10,
      accesosARecursosDeOtraCursada: propios.filter(e => ACCESOS.includes(e.tipo) && e.datos && !e.datos.enSuCursada).length,
      busquedasSinResultados: propios.filter(e => e.tipo === 'sin_resultados').length,
      consultasPublicadas: consultasUsuario.length, consultasConRespuestaDeOtro: conRespuestaDeOtro, consultasConRespuestaUtil: conRespuestaUtil,
      respuestasAOtros: propios.filter(e => e.tipo === 'respuesta_publicada' && !e.datos?.propia).length,
      materialesSubidos: propios.filter(e => e.tipo === 'material_subido').length,
      materialesSubidosConAdvertencia: propios.filter(e => e.tipo === 'material_subido' && e.datos?.conAdvertencia).length,
    };
  });
  return { generado: new Date().toISOString(), usuarios };
}

const ACCESOS = ['recurso_visualizado', 'recurso_descargado', 'enlace_abierto'];
const fechaUtc = valor => Date.parse(valor.replace(' ', 'T') + 'Z');

function csv(filas) {
  const celda = v => `"${String(v ?? '').replaceAll('"', '""')}"`;
  return ['id,creado_utc,email,nombre,tipo,datos', ...filas.map(e => [e.id, e.creado, e.email, e.nombre, e.tipo, e.datos].map(celda).join(','))].join('\n');
}

async function leerCuerpo(req) {
  const partes = [];
  let total = 0;
  for await (const parte of req) {
    total += parte.length;
    if (total > MAX_BODY) throw new HttpError(413, 'El archivo es demasiado grande (máximo 10 MB).');
    partes.push(parte);
  }
  if (!total) return {};
  try { return JSON.parse(Buffer.concat(partes).toString('utf8')); } catch { throw new HttpError(400, 'Pedido inválido.'); }
}

async function servirEstatico(res, pathname) {
  const relativo = pathname === '/' ? 'index.html' : pathname.slice(1);
  const ruta = path.join(PUBLIC_DIR, path.normalize(relativo));
  if (!ruta.startsWith(PUBLIC_DIR)) throw new HttpError(404, 'No encontrado.');
  const info = await stat(ruta).catch(() => null);
  if (!info?.isFile()) throw new HttpError(404, 'No encontrado.');
  res.writeHead(200, { 'Content-Type': MIME[path.extname(ruta)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
  res.end(await readFile(ruta));
}

function json(res, status, datos) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(datos));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    const archivo = url.pathname.match(/^\/api\/materiales\/(\d+)\/archivo$/);
    if (archivo && req.method === 'GET') return await servirArchivoMaterial(req, res, url, archivo[1]);
    if (url.pathname === '/api/admin/resumen') { exigirAdmin(url); return json(res, 200, resumen()); }
    if (url.pathname === '/api/admin/eventos.csv') {
      exigirAdmin(url);
      res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="eventos-unlamigos.csv"' });
      return res.end(csv(q.eventos.all()));
    }
    if (url.pathname.startsWith('/api/')) {
      for (const [metodo, patron, manejador] of rutas) {
        const coincide = req.method === metodo && url.pathname.match(patron);
        if (!coincide) continue;
        const usuario = publicas.has(url.pathname) ? null : autenticar(req, url);
        const body = ['POST', 'PUT'].includes(req.method) ? await leerCuerpo(req) : {};
        return json(res, 200, await manejador({ usuario, body, params: coincide.slice(1), url }));
      }
      throw new HttpError(404, 'Ruta inexistente.');
    }
    if (req.method !== 'GET') throw new HttpError(405, 'Método no permitido.');
    return await servirEstatico(res, url.pathname);
  } catch (error) {
    const status = error.status || 500;
    if (status === 500) console.error(error);
    if (res.headersSent) return res.end();
    json(res, status, { error: status === 500 ? 'Ocurrió un error inesperado. Probá de nuevo.' : error.message, codigo: error.codigo });
  }
});

server.listen(PORT, () => {
  console.log(`UNLaMigos MVP en http://localhost:${PORT}`);
  console.log(`Panel del equipo: http://localhost:${PORT}/admin.html?clave=${ADMIN_KEY}`);
});
