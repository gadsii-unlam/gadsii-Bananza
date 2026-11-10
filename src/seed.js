// Carga manual de los datos de prueba (seed/datos.json). Con --reset borra la base y los archivos antes de cargar.
import { readFileSync, rmSync, copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const DATA_DIR = process.env.DATA_DIR || path.join(import.meta.dirname, 'data');
if (process.argv.includes('--reset')) rmSync(DATA_DIR, { recursive: true, force: true });

const { db, FILES_DIR } = await import('./db.js');
const datos = JSON.parse(readFileSync(path.join(import.meta.dirname, 'seed', 'datos.json'), 'utf8'));

const insertMateria = db.prepare('INSERT OR IGNORE INTO materias (id, nombre) VALUES (?, ?)');
const insertComision = db.prepare('INSERT OR IGNORE INTO comisiones (materia_id, codigo, cuatrimestre, docente, activa) VALUES (?, ?, ?, ?, ?)');
const comisionId = db.prepare('SELECT id FROM comisiones WHERE materia_id = ? AND codigo = ? AND cuatrimestre = ?');
const insertPrecarga = db.prepare('INSERT OR IGNORE INTO inscripciones_precargadas (email, comision_id) VALUES (?, ?)');
const existeMaterial = db.prepare('SELECT 1 FROM materiales WHERE comision_id = ? AND titulo = ?');
const insertMaterial = db.prepare(`INSERT INTO materiales
  (comision_id, tipo, titulo, docente, tema, contexto, advertencia, archivo_nombre, archivo_ruta, archivo_mime, origen)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'equipo')`);

function idDe(materia, codigo, cuatrimestre) {
  const fila = comisionId.get(materia, codigo, cuatrimestre);
  if (!fila) throw new Error(`No existe la comisión ${materia} ${codigo} ${cuatrimestre} en seed/datos.json`);
  return fila.id;
}

for (const m of datos.materias) insertMateria.run(m.id, m.nombre);
for (const c of datos.comisiones) insertComision.run(c.materia, c.codigo, c.cuatrimestre, c.docente ?? null, c.activa === false ? 0 : 1);
for (const p of datos.inscripciones_precargadas) {
  for (const [materia, codigo, cuatrimestre] of p.cursadas) insertPrecarga.run(p.email.toLowerCase(), idDe(materia, codigo, cuatrimestre));
}
let cargados = 0;
for (const m of datos.materiales) {
  const comision = idDe(m.materia, m.codigo, m.cuatrimestre);
  if (existeMaterial.get(comision, m.titulo)) continue;
  const origen = path.join(import.meta.dirname, 'seed', 'archivos', m.archivo);
  if (!existsSync(origen)) throw new Error(`Falta el archivo seed/archivos/${m.archivo}`);
  const destino = `seed-${m.archivo}`;
  copyFileSync(origen, path.join(FILES_DIR, destino));
  insertMaterial.run(comision, m.tipo, m.titulo, m.docente || null, m.tema || null, m.contexto, m.advertencia || null, m.archivo, destino, mimeDe(m.archivo));
  cargados++;
}

function mimeDe(nombre) {
  const ext = path.extname(nombre).toLowerCase();
  return { '.md': 'text/markdown', '.txt': 'text/plain', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }[ext] || 'application/octet-stream';
}

console.log(`Datos de prueba cargados: ${datos.materias.length} materias, ${datos.comisiones.length} comisiones, ${cargados} materiales nuevos.`);
