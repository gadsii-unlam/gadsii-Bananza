// Cliente del MVP de UNLaMigos. Recorrido principal (brief v3):
// Ingreso → Mis materias → Materia (cursada precargada → tipos disponibles → lista → detalle) → Ver / descargar.
// Complementarios: subir material con contexto, consultas por comisión y respuestas entre estudiantes.
const main = document.querySelector('#contenido');
const topbar = document.querySelector('#topbar');
const estado = {
  token: localStorage.getItem('unlamigos.token'),
  usuario: null, catalogo: null, resumen: null,
  filtros: JSON.parse(sessionStorage.getItem('unlamigos.filtros') || '{}'), seleccion: {}, materiales: {}, abiertas: new Set(),
  confirmarOtra: null, filtroConsultas: 'todas', emailPendiente: null,
};
let refresco = null;

/* ---------- Utilidades ---------- */
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ruta = () => location.hash.slice(1).split('/').map(decodeURIComponent);
const ir = destino => { if (location.hash === '#' + destino) render(); else location.hash = destino; };
const hue = texto => [...String(texto)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
const iniciales = nombre => String(nombre || '?').trim().split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase();
const avatar = (nombre, clase = '') => `<span class="avatar ${clase}" style="--h:${hue(nombre)}" aria-hidden="true">${esc(iniciales(nombre))}</span>`;
const fechaDe = v => new Date(String(v).replace(' ', 'T') + 'Z');
function hace(v) {
  const seg = (Date.now() - fechaDe(v)) / 1000;
  if (seg < 60) return 'recién';
  if (seg < 3600) return `hace ${Math.floor(seg / 60)} min`;
  if (seg < 86400) return `hace ${Math.floor(seg / 3600)} h`;
  if (seg < 7 * 86400) return `hace ${Math.floor(seg / 86400)} d`;
  return fechaDe(v).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
}
const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;

const ICONOS = {
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  back: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
  award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  clip: '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  thumb: '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>',
  right: '<polyline points="9 18 15 12 9 6"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
};
const ic = (nombre, clase = '') => `<svg class="i ${clase}" viewBox="0 0 24 24" aria-hidden="true">${ICONOS[nombre]}</svg>`;
const ICONO_TIPO = { Parcial: 'clipboard', Final: 'award', Apunte: 'pencil', Bibliografía: 'book', Otro: 'clip' };
const PLURAL_TIPO = { Parcial: 'Parciales', Final: 'Finales', Apunte: 'Apuntes', Bibliografía: 'Bibliografía', Otro: 'Otros' };
const COLOR_TIPO = { Parcial: 'parcial', Final: 'final', Apunte: 'apunte', Bibliografía: 'biblio', Otro: 'otro' };
const tipoChip = t => `<span class="chip type t-${esc(t)}">${esc(t)}</span>`;
const tipoIcono = t => `<span class="type-icon t-${esc(t)}">${ic(ICONO_TIPO[t] || 'file')}</span>`;
const LOGO = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><path d="M7 5v7a5 5 0 0 0 10 0V5"/></svg>';

let toastT;
function avisar(mensaje, tipo = 'ok') {
  const t = document.querySelector('#toast');
  t.className = `toast ${tipo}`;
  t.innerHTML = `${ic(tipo === 'error' ? 'alert' : 'check')}<span>${esc(mensaje)}</span>`;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), tipo === 'error' ? 6000 : 3500);
}

async function api(metodo, url, cuerpo) {
  const res = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json', ...(estado.token ? { 'X-Token': estado.token } : {}) },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  }).catch(() => { throw new Error('No se pudo conectar con el servidor. Revisá tu conexión o que el MVP esté encendido.'); });
  const datos = await res.json().catch(() => ({}));
  if (res.status === 401 && estado.token) { salir(false); throw new Error(datos.error); }
  if (!res.ok) { const e = new Error(datos.error || 'No se pudo completar la acción.'); e.codigo = datos.codigo; throw e; }
  return datos;
}

// Registro de uso para las métricas del TP5. Si falla, no interrumpe al usuario.
function evento(tipo, datos) {
  if (estado.token) api('POST', '/api/eventos', { tipo, datos }).catch(() => {});
}

const guardarFiltros = () => sessionStorage.setItem('unlamigos.filtros', JSON.stringify(estado.filtros));

function salir(avisarSalida = true) {
  localStorage.removeItem('unlamigos.token');
  sessionStorage.removeItem('unlamigos.filtros');
  Object.assign(estado, { token: null, usuario: null, resumen: null, filtros: {}, seleccion: {}, materiales: {}, abiertas: new Set(), emailPendiente: null });
  if (avisarSalida) avisar('Cerraste la sesión.');
  ir('ingresar');
}

const cursadaDe = materiaId => estado.usuario?.cursadas.find(c => c.materiaId === materiaId);
const materiaDe = id => estado.catalogo.materias.find(m => m.id === id);
const cursadaTexto = m => `Comisión ${m.codigo} · ${m.cuatrimestre}`;
const esOtraCursada = (material, cursada) => Boolean(cursada) && material.comisionId !== cursada.comisionId;
const urlArchivo = (id, descargar) => `/api/materiales/${id}/archivo?t=${encodeURIComponent(estado.token)}${descargar ? '&descargar=1' : ''}`;
const opciones = (valores, actual) => valores.map(([v, t]) => `<option value="${esc(v)}" ${String(v) === String(actual) ? 'selected' : ''}>${esc(t)}</option>`).join('');
const previsualizable = m => /^(application\/pdf|image\/|text\/)/.test(m.archivoMime || '');

function titulo(texto) { document.title = texto ? `${texto} · UNLaMigos` : 'UNLaMigos'; }

function pintarTopbar(activa) {
  if (!estado.usuario) { topbar.hidden = true; return; }
  topbar.hidden = false;
  const u = estado.usuario;
  topbar.innerHTML = `<div class="topbar-inner">
    <a class="logo" href="#materias"><span class="logo-mark">${LOGO}</span><span>UNLa<b>migos</b></span></a>
    <nav class="nav" aria-label="Principal">
      <a href="#materias" class="${activa === 'materias' ? 'active' : ''}">Mis materias</a>
      <a href="#subir" class="${activa === 'subir' ? 'active' : ''}">Subir material</a>
    </nav>
    <span class="spacer"></span>
    <div class="user-menu">
      <button class="user-btn" type="button" data-accion="menu" aria-haspopup="true" aria-expanded="false">${avatar(u.nombre)}<span class="name">${esc(u.nombre)}</span></button>
      <div class="menu" id="menu" hidden>
        <div class="menu-head"><b>${esc(u.nombre)}</b><div class="small muted">${esc(u.email)}</div></div>
        <a href="#cursadas">${ic('settings')} Mis cursadas y perfil</a>
        <button type="button" data-accion="salir">${ic('logout')} Salir</button>
      </div>
    </div></div>`;
}

const cargando = () => `<div class="page"><div class="loading">${'<div class="skeleton"></div>'.repeat(3)}</div></div>`;

/* ---------- 1. Ingreso ---------- */
function renderIngreso() {
  titulo('Ingresar'); pintarTopbar();
  const segundoPaso = Boolean(estado.emailPendiente);
  main.innerHTML = `<div class="auth"><div class="auth-card">
    <section class="auth-hero">
      <span class="logo" style="color:white"><span class="logo-mark" style="background:rgb(255 255 255 / .2);box-shadow:none">${LOGO}</span>UNLaMigos</span>
      <div><h1>El material de tu cursada, sin depender de a quién conocés.</h1>
      <p style="margin-top:.8rem">Para estudiantes de Ingeniería en Informática de la UNLaM.</p></div>
      <ul>
        <li><span class="ico">${ic('layers')}</span><div><b>Ordenado por comisión y cuatrimestre</b><small>Parciales, finales, apuntes y bibliografía de tu cursada, primero.</small></div></li>
        <li><span class="ico">${ic('info')}</span><div><b>Con contexto y advertencias</b><small>Sabés de dónde sale cada material y qué puede tener mal.</small></div></li>
        <li><span class="ico">${ic('users')}</span><div><b>Consultas entre compañeros</b><small>Un canal por comisión, sólo para estudiantes.</small></div></li>
      </ul>
    </section>
    <section class="auth-form">
      ${segundoPaso ? `
        <div class="stepper"><span class="dot on"></span><span class="dot on"></span><span class="dot"></span> Paso 2 de 3</div>
        <h2>¡Te damos la bienvenida!</h2><p class="muted">Es tu primera vez. ¿Cómo querés que te vean tus compañeros en las consultas?</p>
        <form id="form-ingreso" novalidate>
          <div class="field"><span class="label">Correo institucional</span><div class="input" style="background:var(--surface-2)">${esc(estado.emailPendiente)}</div></div>
          <div class="field"><label for="nombre">Nombre o apodo<span class="req">*</span></label>
            <input class="input" id="nombre" name="nombre" maxlength="60" autocomplete="name" required autofocus placeholder="Ej.: Caro M."></div>
          <button class="btn primary lg block" type="submit">Continuar ${ic('right')}</button>
          <button class="btn ghost block" type="button" data-accion="otro-correo" style="margin-top:.5rem">Usar otro correo</button>
        </form>` : `
        <h2>Ingresá con tu correo institucional</h2><p class="muted">Si es tu primera vez, te registramos en el momento.</p>
        <form id="form-ingreso" novalidate>
          <div class="field"><label for="email">Correo institucional<span class="req">*</span></label>
            <input class="input" id="email" name="email" type="email" autocomplete="email" required autofocus aria-describedby="email-ayuda email-error" ${estado.errorEmail ? 'aria-invalid="true"' : ''} value="${esc(estado.emailIngresado || '')}">
            <p class="hint" id="email-ayuda">Tiene que terminar en <b>@unlam.edu.ar</b> (por ejemplo, <b>nombre@alumno.unlam.edu.ar</b>).</p>
            <p class="field-error" id="email-error" ${estado.errorEmail ? '' : 'hidden'}>${ic('alert')}<span>${esc(estado.errorEmail || '')}</span></p></div>
          <button class="btn primary lg block" type="submit">Ingresar ${ic('right')}</button>
        </form>`}
      <p class="auth-note">${ic('shield')}<span>Sólo pueden entrar cuentas de la UNLaM. Los docentes no ven el contenido.</span></p>
    </section></div></div>`;
  main.querySelector('[autofocus]')?.focus();
}

function errorEmail(mensaje) {
  estado.errorEmail = mensaje;
  renderIngreso();
  document.querySelector('#email')?.select();
}

/* ---------- 2. Cursadas y perfil (inscripción simulada) ---------- */
function renderCursadas() {
  titulo('Mis cursadas'); pintarTopbar('cursadas');
  const onboarding = !estado.usuario.cursadas.length;
  const actuales = new Map(estado.usuario.cursadas.map(c => [c.materiaId, c.comisionId]));
  const cuatrimestre = estado.catalogo.materias.flatMap(m => m.comisiones).find(c => c.activa)?.cuatrimestre;
  main.innerHTML = `<div class="page narrow">
    ${onboarding ? '<div class="stepper"><span class="dot on"></span><span class="dot on"></span><span class="dot on"></span> Último paso</div>' : `<a class="back" href="#materias">${ic('back')} Mis materias</a>`}
    <div class="page-head"><div><h1>${onboarding ? '¿Qué estás cursando?' : 'Mis cursadas y perfil'}</h1>
      <p class="muted">Elegí tu comisión en cada materia. Te mostramos primero el material de tu cursada y te sumamos al canal de consultas de tu comisión.</p></div></div>
    ${onboarding ? '' : `<form id="form-nombre" class="card card-pad" style="margin-bottom:1.25rem;display:flex;gap:1rem;align-items:flex-end;flex-wrap:wrap">
      ${avatar(estado.usuario.nombre, 'lg')}
      <div class="field" style="flex:1;min-width:200px;margin:0"><label for="perfil-nombre">Tu nombre en las consultas</label><input class="input" id="perfil-nombre" name="nombre" maxlength="60" value="${esc(estado.usuario.nombre)}"></div>
      <button class="btn" type="submit">Guardar nombre</button></form>`}
    <form id="form-cursadas" class="card">
      ${estado.catalogo.materias.map(m => {
        const elegida = actuales.get(m.id) ?? '';
        const activas = m.comisiones.filter(c => c.activa);
        return `<fieldset class="course-pick ${elegida ? 'on' : ''}" style="border:0;margin:0">
          <legend class="sr">${esc(m.nombre)}</legend>
          <h3>${esc(m.nombre)}</h3>
          <div class="seg" role="radiogroup" aria-label="Comisión de ${esc(m.nombre)}">
            <label><input type="radio" name="m-${esc(m.id)}" value="" ${elegida === '' ? 'checked' : ''}><span>No la curso</span></label>
            ${activas.map(c => `<label><input type="radio" name="m-${esc(m.id)}" value="${c.id}" ${elegida === c.id ? 'checked' : ''}><span>Com. ${esc(c.codigo)}</span></label>`).join('')}
          </div></fieldset>`;
      }).join('')}
      <div class="form-actions">${onboarding ? '' : '<a class="btn ghost" href="#materias">Cancelar</a>'}<button class="btn primary" type="submit">${onboarding ? 'Listo, ver mis materias' : 'Guardar cursadas'}</button></div>
    </form>
    <p class="small faint" style="margin-top:1rem">${cuatrimestre ? `Comisiones del ${esc(cuatrimestre)}. ` : ''}Para esta prueba, la inscripción no se verifica con la UNLaM.</p>
  </div>`;
}

/* ---------- 3. Mis materias ---------- */
async function renderMaterias() {
  titulo('Mis materias'); pintarTopbar('materias');
  main.innerHTML = cargando();
  estado.resumen = await api('GET', '/api/yo/resumen').catch(() => null);
  const res = new Map((estado.resumen?.cursadas || []).map(r => [r.comisionId, r]));
  const totales = new Map((estado.resumen?.materias || []).map(r => [r.materiaId, r.materiales]));
  const cursadas = estado.usuario.cursadas;
  const propias = new Set(cursadas.map(c => c.materiaId));
  const otras = estado.catalogo.materias.filter(m => !propias.has(m.id));
  const nombre = estado.usuario.nombre.split(' ')[0];
  main.innerHTML = `<div class="page">
    <div class="page-head"><div><div class="eyebrow">${esc(cursadas[0]?.cuatrimestre || '')}</div><h1>Hola, ${esc(nombre)} 👋</h1>
      <p class="muted">Elegí una materia para ver el material de tu comisión.</p></div>
      <a class="btn primary" href="#subir">${ic('upload')} Subir material</a></div>
    <section class="subjects" aria-label="Materias que cursás">${cursadas.map(c => {
      const r = res.get(c.comisionId) || {};
      return `<article class="subject" style="--h:${hue(c.materiaId)}">
        <div class="subject-top"><span class="subject-badge">${esc(iniciales(c.materia))}</span>
          <div><h2>${esc(c.materia)}</h2><div class="meta"><span class="chip">Com. ${esc(c.codigo)}</span><span class="chip">${esc(c.cuatrimestre)}</span>${c.docente ? `<span class="chip">${esc(c.docente)}</span>` : ''}</div></div></div>
        <div class="stats">
          <div class="stat"><b>${r.materiales ?? '–'}</b><span>materiales de tu comisión</span></div>
          <div class="stat ${r.sinRespuesta ? 'hot' : ''}"><b>${r.sinRespuesta ?? '–'}</b><span>${r.sinRespuesta === 1 ? 'consulta sin responder' : 'consultas sin responder'}</span></div>
        </div>
        ${r.misConsultasRespondidas ? `<span class="chip ok" style="align-self:flex-start">${ic('chat')} ${plural(r.misConsultasRespondidas, 'consulta tuya tiene respuesta', 'consultas tuyas tienen respuesta')}</span>` : ''}
        <div class="actions"><a class="btn primary" href="#materia/${esc(c.materiaId)}">${ic('layers')} Materiales</a><a class="btn" href="#materia/${esc(c.materiaId)}/consultas">${ic('chat')} Consultas</a></div>
      </article>`;
    }).join('')}</section>
    ${otras.length ? `<div class="section-title"><div><h2>Otras materias</h2><p class="small muted">¿Buscás algo de una materia que ya cursaste o que vas a cursar?</p></div></div>
      <div class="other-subjects">${otras.map(m => `<a href="#materia/${esc(m.id)}">${esc(m.nombre)} <span class="faint">${totales.get(m.id) ?? 0}</span></a>`).join('')}</div>` : ''}
  </div>`;
}

/* ---------- 4. Materia: cabecera + pestañas ---------- */
async function renderMateria(materiaId, pestaña) {
  const materia = materiaDe(materiaId);
  if (!materia) return renderNoEncontrado();
  const cursada = cursadaDe(materiaId);
  if (pestaña === 'consultas' && !cursada) return ir(`materia/${materiaId}`);
  titulo(materia.nombre); pintarTopbar('materias');
  if (!estado.resumen) estado.resumen = await api('GET', '/api/yo/resumen').catch(() => null);
  const r = estado.resumen?.cursadas.find(x => x.comisionId === cursada?.comisionId);
  main.innerHTML = `<div class="page">
    <a class="back" href="#materias">${ic('back')} Mis materias</a>
    <header class="subject-hero" style="--h:${hue(materiaId)}">
      <div class="row"><div><div class="eyebrow">Materia</div><h1>${esc(materia.nombre)}</h1>
        ${cursada ? `<div class="context-pill">Tu cursada: Comisión ${esc(cursada.codigo)} · ${esc(cursada.cuatrimestre)}${cursada.docente ? ` <span class="chip">${esc(cursada.docente)}</span>` : ''}</div>`
          : '<div class="context-pill">No cursás esta materia <a class="chip primary" href="#cursadas">Agregarla</a></div>'}</div>
        <a class="btn primary" href="#subir/${esc(materiaId)}">${ic('upload')} Subir material</a></div>
      <nav class="tabs" aria-label="Secciones de la materia">
        <a class="tab ${pestaña !== 'consultas' ? 'active' : ''}" href="#materia/${esc(materiaId)}" ${pestaña !== 'consultas' ? 'aria-current="page"' : ''}>${ic('layers')} Materiales</a>
        ${cursada ? `<a class="tab ${pestaña === 'consultas' ? 'active' : ''}" href="#materia/${esc(materiaId)}/consultas" ${pestaña === 'consultas' ? 'aria-current="page"' : ''}>${ic('chat')} Consultas<span class="hide-sm">&nbsp;de mi comisión</span> ${r?.sinRespuesta ? `<span class="count hot">${r.sinRespuesta}</span>` : r?.consultas ? `<span class="count">${r.consultas}</span>` : ''}</a>` : ''}
      </nav>
    </header>
    ${pestaña === 'consultas' && vistaOtra(materia, cursada) ? `<div class="alert info" style="margin-bottom:1rem">${ic('info')}<div class="alert-body">Estas son las consultas de tu comisión (${esc(cursada.codigo)}). En Materiales seguís viendo la Comisión ${esc(estado.filtros[materiaId].codigo)} · ${esc(estado.filtros[materiaId].cuatrimestre)}.</div></div>` : ''}
    <div id="tab"></div></div>`;
  if (pestaña === 'consultas') await renderConsultas(cursada.comisionId);
  else await renderMateriales(materia);
}

const vistaOtra = (materia, cursada) => {
  const f = estado.filtros[materia.id];
  return Boolean(cursada && f && (f.codigo !== cursada.codigo || f.cuatrimestre !== cursada.cuatrimestre));
};

/* ---------- 4a. Materiales: tipos disponibles → lista → detalle ---------- */
function filtrosDe(materia) {
  const cursada = cursadaDe(materia.id);
  const base = cursada || materia.comisiones.find(c => c.activa) || materia.comisiones[0] || {};
  if (!estado.filtros[materia.id]) { estado.filtros[materia.id] = { codigo: base.codigo, cuatrimestre: base.cuatrimestre, tipo: '', q: '' }; guardarFiltros(); }
  return estado.filtros[materia.id];
}

async function renderMateriales(materia) {
  const tab = document.querySelector('#tab');
  if (!estado.materiales[materia.id]) tab.innerHTML = '<div class="loading"><div class="skeleton"></div><div class="skeleton"></div></div>';
  estado.materiales[materia.id] = (await api('GET', `/api/materias/${materia.id}/materiales`)).materiales;
  const cursada = cursadaDe(materia.id);
  if (!estado.abiertas.has(materia.id)) {
    estado.abiertas.add(materia.id);
    evento('materia_abierta', { materiaId: materia.id, comisionId: cursada?.comisionId ?? null });
  }
  const f = filtrosDe(materia);
  const codigos = [...new Set(materia.comisiones.map(c => c.codigo))];
  // Sólo cuatrimestres que existen para la comisión elegida: evita combinaciones vacías que no son tales.
  const cuatrimestres = [...new Set(materia.comisiones.filter(c => c.codigo === f.codigo).map(c => c.cuatrimestre))];
  if (!cuatrimestres.includes(f.cuatrimestre)) f.cuatrimestre = cuatrimestres[0];
  const otra = cursada && (f.codigo !== cursada.codigo || f.cuatrimestre !== cursada.cuatrimestre);
  tab.innerHTML = `
    <div class="toolbar">
      <div class="cursada-select" role="group" aria-label="Cursada que estás viendo">
        <span class="small muted" id="viendo">Viendo</span>
        ${codigos.length > 1 ? `<select class="select" id="f-codigo" data-filtro="codigo" aria-labelledby="viendo f-codigo">${opciones(codigos.map(c => [c, `Comisión ${c}`]), f.codigo)}</select>`
          : `<span class="fixed-value">Comisión ${esc(f.codigo)}</span>`}
        ${cuatrimestres.length > 1 ? `<select class="select" id="f-cuatrimestre" data-filtro="cuatrimestre" aria-label="Cuatrimestre">${opciones(cuatrimestres.map(c => [c, c]), f.cuatrimestre)}</select>`
          : `<span class="fixed-value">${esc(f.cuatrimestre)}</span>`}
        ${otra ? `<button class="btn sm" type="button" data-accion="mi-cursada">${ic('back')} Restablecer mi cursada</button>` : ''}
      </div>
      <div class="search input-icon">${ic('search')}<input class="input" id="f-q" type="search" placeholder="Buscar por título, tema o docente" value="${esc(f.q)}" aria-label="Buscar en los materiales"></div>
    </div>
    ${otra ? `<div class="alert warn" style="margin-bottom:1rem">${ic('alert')}<div class="alert-body"><strong>Estás viendo otra cursada: Comisión ${esc(f.codigo)} · ${esc(f.cuatrimestre)}</strong>La tuya es Comisión ${esc(cursada.codigo)} · ${esc(cursada.cuatrimestre)}. Lo que encuentres acá puede no coincidir con tu cursada.</div></div>` : ''}
    <div id="dyn"></div>`;
  pintarLista(materia);
}

function pintarLista(materia) {
  const dyn = document.querySelector('#dyn');
  if (!dyn) return;
  const f = filtrosDe(materia);
  guardarFiltros();
  const cursada = cursadaDe(materia.id);
  const enCursada = estado.materiales[materia.id].filter(m => m.codigo === f.codigo && m.cuatrimestre === f.cuatrimestre);
  const termino = f.q.trim().toLowerCase();
  const buscados = termino ? enCursada.filter(m => [m.titulo, m.tema, m.docente, m.contexto].join(' ').toLowerCase().includes(termino)) : enCursada;
  const visibles = buscados.filter(m => !f.tipo || m.tipo === f.tipo);
  const conteo = t => buscados.filter(m => m.tipo === t).length;
  const elegido = visibles.find(m => m.id === estado.seleccion[materia.id]);
  if (!visibles.length && !termino) evento('sin_resultados', { materiaId: materia.id, codigo: f.codigo, cuatrimestre: f.cuatrimestre, tipo: f.tipo });

  dyn.innerHTML = `
    <div class="type-tabs" role="group" aria-label="Tipos de material disponibles">
      <button type="button" class="type-tab" data-tipo="" aria-pressed="${!f.tipo}">Todos <span class="n">${buscados.length}</span></button>
      ${estado.catalogo.tipos.map(t => `<button type="button" class="type-tab" style="--c:var(--c-${COLOR_TIPO[t]})" data-tipo="${esc(t)}" aria-pressed="${f.tipo === t}" ${conteo(t) ? '' : 'data-vacio="1"'}>${ic(ICONO_TIPO[t])} ${esc(PLURAL_TIPO[t])} <span class="n">${conteo(t) || '<span class="sr">sin material</span>0'}</span></button>`).join('')}
    </div>
    <div class="browse ${elegido ? 'con-detalle' : ''}">
      <section aria-label="Materiales">${visibles.length ? `<p class="small muted" style="margin-bottom:.6rem">${elegido ? '' : 'Elegí un material para ver su detalle completo. '}${plural(visibles.length, 'material', 'materiales')} · Comisión ${esc(f.codigo)} · ${esc(f.cuatrimestre)}${f.tipo ? ` · ${esc(PLURAL_TIPO[f.tipo])}` : ''}</p>
        <div class="list">${visibles.map(m => itemMaterial(m, cursada, elegido)).join('')}</div>`
      : `<div class="empty"><div class="ill">${ic(termino ? 'search' : 'layers')}</div>
          <h3>${termino ? `Nada coincide con «${esc(f.q)}»` : f.tipo ? `No hay ${esc(PLURAL_TIPO[f.tipo]).toLowerCase()} de esta cursada` : 'Todavía no hay material para esta selección'}</h3>
          <p class="muted">${termino ? 'Probá con otras palabras.' : `Nadie subió ${f.tipo ? esc(PLURAL_TIPO[f.tipo]).toLowerCase() : 'material'} de la Comisión ${esc(f.codigo)} · ${esc(f.cuatrimestre)}. No te mostramos material de otras comisiones como si fuera de la tuya.`}</p>
          <div class="actions">${f.tipo ? '<button class="btn" type="button" data-tipo="">Ver todos los tipos</button>' : ''}${termino ? '<button class="btn" type="button" data-accion="limpiar-busqueda">Limpiar búsqueda</button>' : ''}<a class="btn primary" href="#subir/${esc(materia.id)}">${ic('upload')} Subir material</a></div></div>`}
      </section>
      <div class="scrim ${elegido ? 'open' : ''}" data-accion="cerrar-detalle"></div>
      ${elegido ? `<aside id="detalle" class="card detail open" aria-label="Detalle del material" tabindex="-1">${detalle(elegido, cursada)}</aside>` : ''}
    </div>`;
}

function itemMaterial(m, cursada, elegido) {
  const otra = esOtraCursada(m, cursada);
  const autor = m.origen === 'equipo' ? 'Equipo UNLaMigos' : m.autorId === estado.usuario.id ? 'Vos' : m.autor || 'Estudiante';
  return `<article class="item ${elegido?.id === m.id ? 'selected' : ''}" data-elegir="${m.id}">
    ${tipoIcono(m.tipo)}
    <div class="body">
      <h3><button class="item-title" type="button" data-elegir="${m.id}">${esc(m.titulo)}</button></h3>
      <div class="tags">${tipoChip(m.tipo)}<span class="chip">${esc(cursadaTexto(m))}</span>${otra ? '<span class="chip warn">Otra cursada</span>' : ''}${m.tema ? `<span class="chip">${esc(m.tema)}</span>` : ''}${m.enlace && !m.archivoNombre ? `<span class="chip">${ic('link')} Enlace</span>` : ''}</div>
      <p class="context">${esc(m.contexto)}</p>
      ${m.advertencia ? `<div class="warn-line">${ic('alert')}<span><b>Advertencia:</b> ${esc(m.advertencia)}</span></div>` : ''}
    </div>
    <div class="side"><span class="who">${esc(autor)}</span>
      ${m.archivoNombre ? `<button class="btn sm" type="button" data-descargar="${m.id}" ${otra || m.advertencia ? 'data-confirmar="1"' : ''} aria-label="Descargar ${esc(m.titulo)}" title="Descargar">${ic('download')}</button>` : ''}</div>
    ${confirmacionDe(m, cursada, 'lista')}${estadoDescarga(m, 'lista')}
  </article>`;
}

// Prevención de errores (TP3, punto 7; TP4, corrección 2): se confirma en el mismo lugar donde se pidió la descarga.
function confirmacionDe(m, cursada, lugar) {
  if (estado.confirmarOtra?.id !== m.id || estado.confirmarOtra.lugar !== lugar) return '';
  const otra = esOtraCursada(m, cursada);
  const motivo = otra ? `Es de la Comisión ${esc(m.codigo)} · ${esc(m.cuatrimestre)} y la tuya es Comisión ${esc(cursada.codigo)} · ${esc(cursada.cuatrimestre)}.` : '';
  return `<div class="inline-confirm" role="alertdialog" aria-labelledby="conf-${m.id}" aria-describedby="conf-d-${m.id}">
    <p id="conf-${m.id}"><b>${otra ? 'Este material es de otra cursada' : 'Este material tiene una advertencia'}</b></p>
    <p id="conf-d-${m.id}" class="small">${motivo}${otra && m.advertencia ? ' ' : ''}${m.advertencia ? `Advertencia: ${esc(m.advertencia)}` : ''}</p>
    <div class="inline-confirm-actions"><button class="btn warn sm" type="button" data-descargar="${m.id}" data-confirmado="1">${ic('download')} Sí, descargar igual</button>
      <button class="btn ghost sm" type="button" data-accion="cancelar-confirmacion">Cancelar</button></div></div>`;
}

// Resultado de la descarga junto a la acción y anunciado por lectores de pantalla.
function estadoDescarga(m, lugar) {
  const d = estado.descargado;
  return d?.id === m.id && d.lugar === lugar ? `<p class="inline-status" role="status">${ic('check')} Descarga iniciada: ${esc(m.archivoNombre)}</p>` : '';
}

function avisosDe(m, cursada) {
  return `${esOtraCursada(m, cursada) ? `<div class="alert warn">${ic('alert')}<div class="alert-body"><strong>Es de otra cursada</strong>Este material es de la Comisión ${esc(m.codigo)} · ${esc(m.cuatrimestre)}. La tuya es Comisión ${esc(cursada.codigo)} · ${esc(cursada.cuatrimestre)}.</div></div>` : ''}
    ${m.advertencia ? `<div class="alert warn">${ic('alert')}<div class="alert-body"><strong>Advertencia de quien lo subió</strong>${esc(m.advertencia)}</div></div>` : ''}`;
}

function datosDe(m) {
  const fila = (k, v) => `<dt>${k}</dt><dd class="${v ? '' : 'none'}">${esc(v || 'No informado')}</dd>`;
  return `<dl class="facts">
    ${fila('Materia', materiaDe(m.materiaId)?.nombre)}${fila('Cursada', cursadaTexto(m))}${fila('Tipo', m.tipo)}
    ${fila('Docente', m.docente)}${fila('Tema', m.tema)}
    ${m.archivoNombre ? fila('Archivo', `${formatoDe(m)}${m.archivoTamano != null ? ` · ${tamano(m.archivoTamano)}` : ''}`) : fila('Archivo', m.enlace ? 'Enlace externo' : '')}
    ${fila('Subido por', m.origen === 'equipo' ? 'Equipo UNLaMigos' : m.autorId === estado.usuario.id ? 'Vos' : m.autor)}
</dl>
    <div><div class="quote-label">Contexto del aporte</div><div class="quote">${esc(m.contexto)}</div></div>`;
}

function formatoDe(m) {
  const ext = (m.archivoNombre.match(/\.(\w+)$/)?.[1] || '').toUpperCase();
  return ({ JPG: 'Imagen JPG', JPEG: 'Imagen JPG', PNG: 'Imagen PNG', MD: 'Texto', TXT: 'Texto', DOC: 'Word', DOCX: 'Word', PPT: 'PowerPoint', PPTX: 'PowerPoint', XLS: 'Excel', XLSX: 'Excel', ZIP: 'ZIP' })[ext] || ext || 'Archivo';
}
function tamano(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
}

function accionesDe(m, cursada, { enVisor = false } = {}) {
  const otra = esOtraCursada(m, cursada);
  const lugar = enVisor ? 'visor' : 'detalle';
  let descarga = '';
  if (m.archivoNombre) {
    // En el detalle los avisos ya están a la vista: sólo se confirma si es de otra cursada.
    descarga = confirmacionDe(m, cursada, lugar) || `<button class="btn ${enVisor || !previsualizable(m) ? 'primary' : ''} block" type="button" data-descargar="${m.id}" ${otra ? 'data-confirmar="1"' : ''}>${ic('download')} Descargar</button>`;
    descarga += estadoDescarga(m, lugar);
  }
  return `${!enVisor && m.archivoNombre && previsualizable(m) ? `<a class="btn primary block" href="#recurso/${m.id}">${ic('eye')} Ver material</a>` : ''}
    ${descarga}
    ${m.enlace ? `<a class="btn ${m.archivoNombre ? '' : 'primary'} block" href="${esc(m.enlace)}" target="_blank" rel="noopener noreferrer" data-enlace="${m.id}">${ic('external')} Abrir enlace</a>` : ''}
    ${m.autorId === estado.usuario.id ? `<button class="btn danger ghost block" type="button" data-eliminar="${m.id}">${ic('trash')} Eliminar mi aporte</button>` : ''}`;
}

function detalle(m, cursada) {
  return `<div class="detail-head">${tipoIcono(m.tipo)}<div><h2>${esc(m.titulo)}</h2><div style="margin-top:.35rem">${tipoChip(m.tipo)}</div></div>
      <button class="btn ghost icon close-detail" type="button" data-accion="cerrar-detalle" aria-label="Cerrar detalle">${ic('x')}</button></div>
    <div class="detail-body">${avisosDe(m, cursada)}${datosDe(m)}</div>
    <div class="detail-actions">${accionesDe(m, cursada)}</div>`;
}

/* ---------- 5. Visor ---------- */
// Markdown mínimo para los apuntes en texto: títulos, listas, tablas y negrita. El texto se escapa antes.
function markdown(texto) {
  const inline = s => s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '<code>$1</code>');
  const celdas = f => f.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  let html = '', lista = null, tabla = [];
  const cerrar = () => {
    if (lista) { html += `</${lista}>`; lista = null; }
    if (tabla.length) {
      const [cab, ...resto] = tabla.map(celdas).filter(f => !f.every(c => /^:?-+:?$/.test(c)));
      html += `<table><thead><tr>${cab.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${resto.map(f => `<tr>${f.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      tabla = [];
    }
  };
  for (const l of esc(texto).split('\n')) {
    const t = l.trim();
    let m;
    if (t.startsWith('|')) { if (lista) { html += `</${lista}>`; lista = null; } tabla.push(t); continue; }
    if ((m = t.match(/^(#{1,3})\s+(.*)/))) { cerrar(); html += `<h${m[1].length + 1}>${inline(m[2])}</h${m[1].length + 1}>`; }
    else if ((m = t.match(/^[-*]\s+(.*)/))) { if (lista !== 'ul') { cerrar(); html += '<ul>'; lista = 'ul'; } html += `<li>${inline(m[1])}</li>`; }
    else if ((m = t.match(/^\d+\.\s+(.*)/))) { if (lista !== 'ol') { cerrar(); html += '<ol>'; lista = 'ol'; } html += `<li>${inline(m[1])}</li>`; }
    else if (!t) cerrar();
    else { cerrar(); html += /^Material de ejemplo/.test(t) ? `<p class="note">${inline(t)}</p>` : `<p>${inline(t)}</p>`; }
  }
  cerrar();
  return html;
}

async function renderRecurso(id) {
  pintarTopbar('materias');
  if (!main.querySelector('.viewer')) main.innerHTML = cargando();
  const m = await api('GET', `/api/materiales/${id}`);
  const materia = materiaDe(m.materiaId);
  const cursada = cursadaDe(m.materiaId);
  titulo(m.titulo);
  const mime = m.archivoMime || '';
  let vista = `<div class="empty" style="border:0"><div class="ill">${ic('file')}</div><h3>Este formato no se puede ver en el navegador</h3><p class="muted">Descargalo para abrirlo en tu computadora.</p></div>`;
  if (mime === 'application/pdf') vista = `<iframe src="${urlArchivo(m.id)}" title="${esc(m.titulo)}"></iframe>`;
  else if (mime.startsWith('image/')) vista = `<img src="${urlArchivo(m.id)}" alt="${esc(m.titulo)}">`;
  else if (mime.startsWith('text/')) vista = '<div class="md" id="texto-material"><div class="skeleton" style="height:200px"></div></div>';
  main.innerHTML = `<div class="page">
    <a class="back" href="#materia/${esc(m.materiaId)}">${ic('back')} ${esc(materia.nombre)}</a>
    <div class="page-head"><div style="display:flex;gap:.9rem;align-items:center">${tipoIcono(m.tipo)}<div><h1>${esc(m.titulo)}</h1>
      <div style="display:flex;gap:.35rem;flex-wrap:wrap;margin-top:.45rem">${tipoChip(m.tipo)}<span class="chip">${esc(cursadaTexto(m))}</span>${esOtraCursada(m, cursada) ? '<span class="chip warn">Otra cursada</span>' : ''}</div></div></div></div>
    <div class="viewer">
      <section class="card doc" aria-label="Material">
        <div class="doc-bar">${ic('file')}<span class="name">${esc(m.archivoNombre || m.titulo)}</span><span class="spacer"></span>
          ${mime === 'application/pdf' ? `<a class="btn sm ghost" href="${urlArchivo(m.id)}" target="_blank" rel="noopener">${ic('external')} Pantalla completa</a>` : ''}</div>
        ${vista}</section>
      <aside class="card"><div class="detail-body">${avisosDe(m, cursada)}${datosDe(m)}</div><div class="detail-actions">${accionesDe(m, cursada, { enVisor: true })}</div></aside>
    </div></div>`;
  if (mime.startsWith('text/')) {
    const res = await fetch(urlArchivo(m.id));
    const cont = document.querySelector('#texto-material');
    if (cont) cont.innerHTML = res.ok ? markdown(await res.text()) : '<p>No se pudo cargar el material. Probá descargarlo.</p>';
  }
}

/* ---------- 6. Subir material ---------- */
const DZ_VACIA = `${ic('upload')}<div><b>Elegí un archivo</b> o arrastralo acá</div><div class="small muted">PDF, imagen, texto u Office · hasta 10 MB</div>`;

function renderSubir(materiaId) {
  titulo('Subir material'); pintarTopbar('subir');
  const desde = materiaId && materiaDe(materiaId);
  const volver = desde ? `materia/${desde.id}` : 'materias';
  const inicial = desde?.id || estado.usuario.cursadas[0]?.materiaId || estado.catalogo.materias[0].id;
  main.innerHTML = `<div class="page narrow">
    <a class="back" href="#${volver}">${ic('back')} ${desde ? esc(desde.nombre) : 'Mis materias'}</a>
    <div class="page-head"><div><h1>Subir material</h1><p class="muted">Lo que compartas lo ven estudiantes de la carrera. Contá de qué cursada es y qué tienen que saber antes de usarlo.</p></div></div>
    <form id="form-subir" class="card" novalidate>
      <section class="form-section"><h2><span class="step-num">1</span> ¿De qué cursada es?</h2>
        <div class="grid-2">
          <div class="field"><label for="s-materia">Materia<span class="req">*</span></label><select class="select" id="s-materia" name="materia">${opciones(estado.catalogo.materias.map(m => [m.id, m.nombre]), inicial)}</select></div>
          <div class="field"><label for="s-comision" id="s-comision-label">Comisión y cuatrimestre<span class="req">*</span></label><div id="s-comision-campo"></div><p class="hint" id="s-comision-ayuda"></p></div>
        </div></section>
      <section class="form-section"><h2><span class="step-num">2</span> ¿Qué es?</h2>
        <div class="field"><span class="label" id="tipo-label">Tipo de material<span class="req">*</span></span>
          <div class="seg" role="radiogroup" aria-labelledby="tipo-label">${estado.catalogo.tipos.map(t => `<label><input type="radio" name="tipo" value="${esc(t)}"><span>${ic(ICONO_TIPO[t])} ${esc(t)}</span></label>`).join('')}</div></div>
        <div class="field"><label for="s-titulo">Título<span class="req">*</span></label><input class="input" id="s-titulo" name="titulo" maxlength="120" placeholder="Ej.: Parcial 1 resuelto — Procesos e hilos"></div>
        <div class="grid-2">
          <div class="field"><label for="s-tema">Tema o unidad</label><input class="input" id="s-tema" name="tema" maxlength="120" placeholder="Ej.: Unidad 2 — Concurrencia"></div>
          <div class="field"><label for="s-docente">Docente</label><input class="input" id="s-docente" name="docente" maxlength="80"></div>
        </div></section>
      <section class="form-section"><h2><span class="step-num">3</span> Contexto para quien lo use</h2>
        <div class="field"><label for="s-contexto">¿De dónde sale y qué cubre?<span class="req">*</span></label><textarea class="textarea" id="s-contexto" name="contexto" maxlength="1000" placeholder="Ej.: lo dio la cátedra como práctica; resumen propio de las clases de septiembre; enunciado reconstruido de memoria…"></textarea></div>
        <div class="field"><label for="s-advertencia">Advertencias</label><textarea class="textarea" id="s-advertencia" name="advertencia" maxlength="1000" style="min-height:80px" placeholder="Ej.: el ejercicio 3 no está corregido; puede tener errores en la unidad 4."></textarea>
          <p class="hint">${ic('alert')} Si algo puede estar mal o incompleto, avisalo. Se muestra antes de abrir o descargar.</p></div></section>
      <section class="form-section"><h2><span class="step-num">4</span> El material</h2>
        <label class="dropzone" id="dropzone" for="s-archivo">
          <input id="s-archivo" name="archivo" type="file" class="sr" accept=".pdf,.png,.jpg,.jpeg,.txt,.md,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip">
          <div id="dz-texto">${DZ_VACIA}</div>
        </label>
        <div class="or">o</div>
        <div class="field" style="margin:0"><label for="s-enlace">Pegá un enlace</label><div class="input-icon">${ic('link')}<input class="input" id="s-enlace" name="enlace" type="url" placeholder="https://drive.google.com/…"></div></div>
      </section>
      <div class="form-actions"><a class="btn ghost" href="#${volver}">Cancelar</a><button class="btn primary" type="submit">${ic('upload')} Publicar material</button></div>
    </form></div>`;
  actualizarComisionesDeCarga();
}

function actualizarComisionesDeCarga() {
  const materia = materiaDe(document.querySelector('#s-materia').value);
  const cursada = cursadaDe(materia.id);
  const texto = c => `Comisión ${c.codigo} · ${c.cuatrimestre}${cursada?.comisionId === c.id ? ' (tu cursada)' : ''}`;
  const unica = materia.comisiones.length === 1 && materia.comisiones[0];
  // Con una sola comisión no se ofrece un selector (TP4, corrección 6).
  document.querySelector('#s-comision-campo').innerHTML = unica
    ? `<input type="hidden" name="comisionId" value="${unica.id}"><div class="fixed-value" aria-labelledby="s-comision-label">${esc(texto(unica))}</div>`
    : `<select class="select" id="s-comision" name="comisionId">${opciones(materia.comisiones.map(c => [c.id, texto(c)]), cursada?.comisionId ?? materia.comisiones[0]?.id)}</select>`;
  document.querySelector('#s-comision-ayuda').textContent = unica ? 'Es la única comisión cargada para esta materia.'
    : cursada ? 'Por defecto, tu cursada. Cambiala si es de otra comisión o de un cuatrimestre anterior.' : 'Elegí la cursada a la que corresponde.';
}

function mostrarArchivo(archivo) {
  document.querySelector('#dz-texto').innerHTML = archivo
    ? `<span class="file-picked">${ic('file')} ${esc(archivo.name)}</span><div class="small muted">${(archivo.size / 1024 / 1024).toFixed(2)} MB · tocá para cambiarlo</div>`
    : DZ_VACIA;
}

/* ---------- 4b. Consultas de la comisión ---------- */
async function renderConsultas(comisionId, refrescar = false) {
  const tab = document.querySelector('#tab');
  if (!tab) return;
  const borradores = refrescar ? [...tab.querySelectorAll('textarea')].map(t => [t.id, t.value]) : [];
  const foco = refrescar ? document.activeElement?.id : null;
  if (!refrescar) tab.innerHTML = '<div class="loading"><div class="skeleton"></div><div class="skeleton"></div></div>';
  const { comision, consultas } = await api('GET', `/api/comisiones/${comisionId}/consultas`);
  const yo = estado.usuario.id;
  const resuelta = k => k.respuestas.some(r => r.util);
  const filtradas = consultas.filter(k => estado.filtroConsultas === 'sin' ? !k.respuestas.length : estado.filtroConsultas === 'mias' ? k.autorId === yo : true);
  const nombreDe = (id, n) => id === yo ? 'Vos' : n;
  tab.innerHTML = `<div class="forum">
    <section class="card">
      <form id="form-consulta" class="composer" data-comision="${comision.id}">
        ${avatar(estado.usuario.nombre, 'lg')}
        <div class="grow"><label for="nueva-consulta" class="sr">Tu consulta</label>
          <textarea class="textarea" id="nueva-consulta" maxlength="1000" placeholder="¿Qué duda tenés? Contá el tema para que te puedan ayudar."></textarea>
          <div class="composer-actions"><span class="small muted">${ic('users')} La ven sólo estudiantes de la Comisión ${esc(comision.codigo)}</span><button class="btn primary" type="submit">Publicar consulta</button></div></div>
      </form>
      <div class="filters-row" style="border-top:1px solid var(--border)">
        <div class="seg" role="radiogroup" aria-label="Filtrar consultas">
          ${[['todas', 'Todas'], ['sin', 'Sin responder'], ['mias', 'Mías']].map(([v, t]) => `<label><input type="radio" name="filtro-consultas" value="${v}" ${estado.filtroConsultas === v ? 'checked' : ''}><span>${t}</span></label>`).join('')}
        </div><span class="small muted">${plural(filtradas.length, 'consulta', 'consultas')}</span></div>
      ${filtradas.length ? filtradas.map(k => `<article class="thread">
        <div class="post">${avatar(k.autor)}<div class="grow">
          <div class="post-head"><b>${esc(nombreDe(k.autorId, k.autor))}</b><span class="faint">${esc(hace(k.creado))}</span>
            ${resuelta(k) ? `<span class="chip ok">${ic('check')} Resuelta</span>` : k.respuestas.length ? `<span class="chip">${plural(k.respuestas.length, 'respuesta', 'respuestas')}</span>` : '<span class="chip warn">Sin respuesta</span>'}</div>
          <p class="post-text">${esc(k.texto)}</p></div></div>
        ${k.respuestas.length ? `<div class="replies">${k.respuestas.map(r => `<div class="post reply">${avatar(r.autor)}<div class="grow">
            <div class="post-head"><b>${esc(nombreDe(r.autorId, r.autor))}</b><span class="faint">${esc(hace(r.creado))}</span>${r.util ? `<span class="chip ok">${ic('thumb')} Le sirvió a quien preguntó</span>` : ''}</div>
            <p class="post-text">${esc(r.texto)}</p>
            ${k.autorId === yo && r.autorId !== yo ? `<button class="btn sm ${r.util ? 'ok-on' : ''}" style="margin-top:.4rem" type="button" data-util="${r.id}" data-valor="${r.util ? '0' : '1'}" aria-pressed="${r.util}">${ic('thumb')} ${r.util ? 'Te sirvió' : 'Me sirvió'}</button>` : ''}
          </div></div>`).join('')}</div>` : ''}
        <div class="reply-bar"><form class="reply-form" data-responder="${k.id}"><label for="resp-${k.id}" class="sr">Responder</label>
          <textarea class="textarea" id="resp-${k.id}" maxlength="1000" placeholder="${k.autorId === yo ? 'Agregar algo a tu consulta…' : 'Escribí una respuesta…'}"></textarea>
          <button class="btn" type="submit">Responder</button></form></div>
      </article>`).join('') : `<div class="empty" style="border:0;border-radius:0"><div class="ill">${ic('chat')}</div><h3>${consultas.length ? 'No hay consultas con este filtro' : 'Todavía no hay consultas'}</h3><p class="muted">${consultas.length ? 'Probá con «Todas».' : 'Sé la primera persona en preguntarle algo a tu comisión.'}</p></div>`}
    </section>
    <aside class="card side-card"><h3>${ic('info')} Cómo funciona</h3>
      <ul><li>Sólo participan estudiantes de ${esc(comision.materia)}, Comisión ${esc(comision.codigo)} · ${esc(comision.cuatrimestre)}.</li>
      <li>Los docentes no ven este canal.</li><li>Si una respuesta te sirvió, marcala con «Me sirvió»: ayuda a quien busque lo mismo.</li>
      <li>La lista se actualiza sola mientras la tenés abierta.</li></ul></aside>
  </div>`;
  for (const [id, valor] of borradores) { const t = document.getElementById(id); if (t) t.value = valor; }
  if (foco) document.getElementById(foco)?.focus();
  // Sin notificaciones (fuera del MVP): refresco periódico mientras la pantalla está abierta.
  clearInterval(refresco);
  refresco = setInterval(() => {
    const [p, , sub] = ruta();
    if (p === 'materia' && sub === 'consultas' && !document.hidden) renderConsultas(comisionId, true).catch(() => {});
  }, 15000);
}

function renderNoEncontrado() {
  titulo('No encontrado'); pintarTopbar();
  main.innerHTML = `<div class="page narrow"><div class="empty"><div class="ill">${ic('search')}</div><h3>Esta página no existe</h3><div class="actions"><a class="btn primary" href="#materias">Ir a mis materias</a></div></div></div>`;
}

/* ---------- Ruteo ---------- */
let rutaAnterior = '';
async function render() {
  clearInterval(refresco);
  let [pagina, id, sub] = ruta();
  const mismaPagina = rutaAnterior === `${pagina}/${id}`;
  rutaAnterior = `${pagina}/${id}`;
  try {
    estado.catalogo ||= await api('GET', '/api/catalogo');
    if (estado.token && !estado.usuario) estado.usuario = await api('GET', '/api/yo');
    if (!estado.usuario) return renderIngreso();
    if (!estado.usuario.cursadas.length && pagina !== 'subir') return renderCursadas();
    // Compatibilidad con rutas anteriores.
    if (pagina === 'materiales') return ir(`materia/${id}`);
    if (pagina === 'consultas') { const c = estado.usuario.cursadas.find(x => String(x.comisionId) === id); return ir(c ? `materia/${c.materiaId}/consultas` : 'materias'); }
    if (!pagina || pagina === 'ingresar') pagina = 'materias';
    if (!mismaPagina) window.scrollTo(0, 0);
    if (pagina === 'materias') await renderMaterias();
    else if (pagina === 'cursadas') renderCursadas();
    else if (pagina === 'materia') await renderMateria(id, sub);
    else if (pagina === 'recurso') await renderRecurso(id);
    else if (pagina === 'subir') renderSubir(id);
    else renderNoEncontrado();
  } catch (error) {
    main.innerHTML = `<div class="page narrow"><div class="empty"><div class="ill">${ic('alert')}</div><h3>No pudimos cargar esta pantalla</h3><p class="muted">${esc(error.message)}</p><div class="actions"><button class="btn primary" type="button" data-accion="reintentar">Reintentar</button><a class="btn" href="#materias">Ir a mis materias</a></div></div></div>`;
  }
}

function materiaActual() { const [p, id, sub] = ruta(); return p === 'materia' && sub !== 'consultas' ? materiaDe(id) : null; }

/* ---------- Formularios ---------- */
document.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.target;
  const boton = form.querySelector('button[type=submit]');
  boton.disabled = true;
  try {
    if (form.id === 'form-ingreso') {
      const email = estado.emailPendiente || form.email.value.trim();
      if (!estado.emailPendiente) {
        const error = !email ? 'Escribí tu correo institucional.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Revisá el formato del correo: falta la @ o el dominio.'
          : !email.toLowerCase().endsWith('unlam.edu.ar') ? 'Ese correo no es de la UNLaM. Usá el que termina en @unlam.edu.ar.' : null;
        estado.emailIngresado = email;
        if (error) return errorEmail(error);
      }
      const { token, usuario, necesitaNombre } = await api('POST', '/api/registro', { email, nombre: form.nombre?.value })
        .catch(e => { if (!estado.emailPendiente) errorEmail(e.message); throw Object.assign(e, { mostrado: !estado.emailPendiente }); });
      estado.errorEmail = null;
      if (necesitaNombre) { estado.emailPendiente = email.trim().toLowerCase(); return renderIngreso(); }
      localStorage.setItem('unlamigos.token', token);
      Object.assign(estado, { token, usuario, emailPendiente: null });
      if (form.nombre) avisar(`¡Listo, ${usuario.nombre}! Ya tenés tu cuenta.`);
      ir('materias');
    } else if (form.id === 'form-cursadas') {
      const comisionIds = [...form.querySelectorAll('input[type=radio]:checked')].map(r => r.value).filter(Boolean);
      estado.usuario = await api('PUT', '/api/yo/cursadas', { comisionIds });
      Object.assign(estado, { filtros: {}, seleccion: {}, resumen: null });
      avisar('Guardamos tus cursadas.');
      ir('materias');
    } else if (form.id === 'form-nombre') {
      estado.usuario = await api('PUT', '/api/yo', { nombre: form.nombre.value });
      avisar('Actualizamos tu nombre.');
      renderCursadas();
    } else if (form.id === 'form-subir') {
      const archivoInput = form.archivo.files[0];
      if (archivoInput && archivoInput.size > 10 * 1024 * 1024) throw new Error('El archivo supera los 10 MB.');
      const archivo = archivoInput ? { nombre: archivoInput.name, base64: await base64(archivoInput) } : null;
      const campos = Object.fromEntries(['comisionId', 'titulo', 'docente', 'tema', 'contexto', 'advertencia', 'enlace'].map(k => [k, form[k].value]));
      campos.tipo = form.querySelector('input[name=tipo]:checked')?.value || '';
      const { id, materiaId } = await api('POST', '/api/materiales', { ...campos, archivo });
      const c = materiaDe(materiaId).comisiones.find(x => x.id === Number(campos.comisionId));
      estado.filtros[materiaId] = { codigo: c.codigo, cuatrimestre: c.cuatrimestre, tipo: '', q: '' };
      estado.seleccion[materiaId] = id;
      estado.resumen = null;
      avisar('Publicaste el material. ¡Gracias por compartirlo!');
      ir(`materia/${materiaId}`);
    } else if (form.id === 'form-consulta') {
      await api('POST', `/api/comisiones/${form.dataset.comision}/consultas`, { texto: form.querySelector('textarea').value });
      estado.resumen = null;
      avisar('Publicaste tu consulta. Tus compañeros de comisión la van a ver acá.');
      await renderConsultas(form.dataset.comision);
    } else if (form.dataset.responder) {
      await api('POST', `/api/consultas/${form.dataset.responder}/respuestas`, { texto: form.querySelector('textarea').value });
      estado.resumen = null;
      avisar('Respuesta publicada.');
      await renderConsultas(cursadaDe(ruta()[1]).comisionId);
    }
  } catch (error) {
    if (!error.mostrado) avisar(error.message, 'error');
  } finally {
    if (boton.isConnected) boton.disabled = false;
  }
});

document.addEventListener('change', event => {
  const t = event.target;
  const materia = materiaActual();
  if (t.dataset.filtro && materia) {
    estado.filtros[materia.id][t.dataset.filtro] = t.value;
    delete estado.seleccion[materia.id];
    evento('filtro_cambiado', { materiaId: materia.id, campo: t.dataset.filtro, valor: t.value });
    renderMateriales(materia).then(() => document.getElementById(t.id)?.focus());
  }
  if (t.id === 's-materia') actualizarComisionesDeCarga();
  if (t.id === 's-archivo') mostrarArchivo(t.files[0]);
  if (t.name === 'filtro-consultas') { estado.filtroConsultas = t.value; renderConsultas(cursadaDe(ruta()[1]).comisionId, true); }
  if (t.type === 'radio' && t.name.startsWith('m-')) t.closest('.course-pick').classList.toggle('on', Boolean(t.value));
});

let busquedaT;
document.addEventListener('input', event => {
  if (event.target.id !== 'f-q') return;
  const materia = materiaActual();
  estado.filtros[materia.id].q = event.target.value;
  pintarLista(materia);
  clearTimeout(busquedaT);
  busquedaT = setTimeout(() => evento('busqueda', { materiaId: materia.id, q: event.target.value }), 800);
});

// Arrastrar y soltar en la carga de material.
document.addEventListener('dragover', e => { const dz = e.target.closest?.('#dropzone'); if (dz) { e.preventDefault(); dz.classList.add('over'); } });
document.addEventListener('dragleave', e => e.target.closest?.('#dropzone')?.classList.remove('over'));
document.addEventListener('drop', e => {
  const dz = e.target.closest?.('#dropzone');
  if (!dz) return;
  e.preventDefault(); dz.classList.remove('over');
  const input = document.querySelector('#s-archivo');
  if (e.dataTransfer.files.length) { input.files = e.dataTransfer.files; mostrarArchivo(input.files[0]); }
});

/* ---------- Clics ---------- */
document.addEventListener('click', async event => {
  const menu = document.querySelector('#menu');
  if (menu && !event.target.closest('.user-menu')) menu.hidden = true;
  const t = event.target.closest('button, a, .item, .scrim');
  if (!t) return;
  if (t.classList.contains('skip')) { event.preventDefault(); main.focus(); return; }
  const materia = materiaActual();
  const accion = t.dataset.accion;

  if (accion === 'menu') { menu.hidden = !menu.hidden; t.setAttribute('aria-expanded', String(!menu.hidden)); return; }
  if (accion === 'salir') return salir();
  if (accion === 'reintentar') return render();
  if (accion === 'otro-correo') { estado.emailPendiente = null; return renderIngreso(); }
  if (accion === 'mi-cursada' && materia) {
    const c = cursadaDe(materia.id);
    Object.assign(estado.filtros[materia.id], { codigo: c.codigo, cuatrimestre: c.cuatrimestre });
    delete estado.seleccion[materia.id];
    evento('cursada_restablecida', { materiaId: materia.id });
    return renderMateriales(materia);
  }
  if (accion === 'limpiar-busqueda' && materia) { estado.filtros[materia.id].q = ''; document.querySelector('#f-q').value = ''; return pintarLista(materia); }
  if (accion === 'cerrar-detalle' && materia) { delete estado.seleccion[materia.id]; estado.confirmarOtra = null; return pintarLista(materia); }
  if (accion === 'cancelar-confirmacion') {
    const { id, lugar } = estado.confirmarOtra || {};
    estado.confirmarOtra = null;
    await (materia ? pintarLista(materia) : renderRecurso(ruta()[1]));
    document.querySelector(`${lugar === 'lista' ? '.item' : lugar === 'detalle' ? '#detalle' : '.viewer'} [data-descargar="${id}"]`)?.focus();
    return;
  }

  if (t.dataset.tipo !== undefined && materia) {
    estado.filtros[materia.id].tipo = t.dataset.tipo;
    delete estado.seleccion[materia.id];
    evento('filtro_cambiado', { materiaId: materia.id, campo: 'tipo', valor: t.dataset.tipo });
    return pintarLista(materia);
  }
  if (t.dataset.descargar) {
    const materialId = Number(t.dataset.descargar);
    const lugar = t.closest('.item') ? 'lista' : t.closest('#detalle') ? 'detalle' : 'visor';
    const repintar = () => (materia ? pintarLista(materia) : renderRecurso(ruta()[1]));
    if (t.dataset.confirmar) {
      estado.confirmarOtra = { id: materialId, lugar };
      estado.descargado = null;
      await repintar();
      document.querySelector('[data-confirmado]')?.focus();
      return;
    }
    if (t.dataset.confirmado) evento('otra_cursada_confirmada', { materialId });
    estado.confirmarOtra = null;
    const a = document.createElement('a');
    a.href = urlArchivo(materialId, true);
    document.body.append(a); a.click(); a.remove();
    estado.descargado = { id: materialId, lugar };
    await repintar();
    document.querySelector(`.inline-status`)?.closest('.item, .detail-actions')?.querySelector(`[data-descargar="${materialId}"]`)?.focus();
    clearTimeout(estado.descargaT);
    estado.descargaT = setTimeout(() => { estado.descargado = null; }, 8000);
    return;
  }
  if (t.dataset.enlace) { evento('enlace_abierto', { materialId: Number(t.dataset.enlace) }); return; }
  if (t.dataset.eliminar) {
    if (!confirm('¿Eliminar este material? No se puede deshacer.')) return;
    try {
      const m = await api('GET', `/api/materiales/${t.dataset.eliminar}`);
      await api('DELETE', `/api/materiales/${t.dataset.eliminar}`);
      estado.resumen = null;
      avisar('Eliminaste el material.');
      delete estado.seleccion[m.materiaId];
      if (materia) renderMateriales(materia); else ir(`materia/${m.materiaId}`);
    } catch (error) { avisar(error.message, 'error'); }
    return;
  }
  if (t.dataset.util) {
    try {
      await api('POST', `/api/respuestas/${t.dataset.util}/util`, { util: t.dataset.valor === '1' });
      if (t.dataset.valor === '1') avisar('¡Gracias! Marcaste la respuesta como útil.');
      await renderConsultas(cursadaDe(ruta()[1]).comisionId, true);
    } catch (error) { avisar(error.message, 'error'); }
    return;
  }
  if (t.dataset.elegir && materia) {
    const id = Number(t.dataset.elegir);
    if (estado.seleccion[materia.id] === id) return;
    estado.seleccion[materia.id] = id;
    estado.confirmarOtra = null; estado.descargado = null;
    evento('detalle_abierto', { materialId: id, materiaId: materia.id });
    pintarLista(materia);
    document.querySelector('#detalle')?.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  document.querySelector('#menu')?.setAttribute('hidden', '');
  const materia = materiaActual();
  if (materia && estado.seleccion[materia.id]) { delete estado.seleccion[materia.id]; estado.confirmarOtra = null; pintarLista(materia); }
});

function base64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(String(lector.result).split(',')[1]);
    lector.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    lector.readAsDataURL(archivo);
  });
}

window.addEventListener('hashchange', render);
render();
