# UNLaMigos · Bananza

Trabajo del grupo **Bananza** para Gestión Aplicada al Desarrollo de Software II (3665), UNLaM, 2.º cuatrimestre de 2026.

Integrantes: Carlos Antonio Solis Rocha, Franco Kowalski, Iara Sol Rodriguez, Leonardo Barbaro, Maximiliano Caseres.

## Qué es

**UNLaMigos** es una aplicación web para estudiantes de Ingeniería en Informática de la UNLaM. Sirve para encontrar y compartir apuntes, parciales, finales y bibliografía ordenados por **materia, comisión y cuatrimestre**, cada uno con su contexto y sus advertencias, y para hacer consultas a estudiantes de la misma comisión.

- **Problema:** conseguir material y respuestas cuesta tiempo y depende de conocer el canal o a la persona correcta (entrevistas del TP2).
- **Usuario primario:** el estudiante que busca información, especialmente quien cursa sin grupos ni contactos.
- **Estado:** MVP probado el 3/11/2026 con tres estudiantes (TP5). Decisión: perseverar. El piloto con una comisión real, que es el paso siguiente, no se hizo.

El estado completo, las decisiones y lo que falta están en el documento integrador: [`docs/tpi/TPI-Bananza.md`](docs/tpi/TPI-Bananza.md).

## Cómo se ejecuta

Requiere **Node.js 22.13 o superior**. Usa `node:sqlite` y no tiene dependencias de npm, así que no hace falta `npm install`.

```bash
cd src
npm run reset                  # crea la base y carga seed/datos.json (borra los datos previos)
ADMIN_KEY=una-clave npm start  # http://localhost:3000
```

- App: http://localhost:3000. Para entrar, cualquier correo que termine en `unlam.edu.ar`. El registro es simulado.
- Panel del equipo: http://localhost:3000/admin.html?clave=una-clave. Tiene el resumen de M1 y M2 por participante y el CSV de eventos.
- Variables: `PORT` (3000), `DATA_DIR` (`src/data/`), `ADMIN_KEY` (si falta, se genera una y se muestra en la consola) y `EMAIL_DOMINIO` (`unlam.edu.ar`).
- `npm run seed` agrega lo nuevo de `seed/datos.json` sin borrar nada.

Funcionalidades, qué se simula y registro de uso: [`src/README.md`](src/README.md).

Para usarlo con otras personas hace falta un hosting de Node.js con **disco persistente**: la base y los archivos subidos viven en `DATA_DIR`. Hoy **no hay respaldo**: si se pierde ese disco, se pierden los aportes.

## Cómo se continúa

En orden de prioridad (el detalle y el porqué están en el punto 4 del documento integrador):

1. **Respaldo y subida de archivos.** Es el riesgo principal del TP6. Hoy el archivo viaja en base64 dentro del JSON, se guarda en el disco del servidor y no tiene copia.
2. **Corregir el ingreso.** El control del dominio usa `endsWith`, así que acepta `x@noesunlam.edu.ar`. Además, cualquiera que escriba un correo ya registrado recibe la sesión de esa persona. Como mínimo: verificación por enlace al correo. Está en `src/server.js`, ruta `POST /api/registro`.
3. **Cambios de interfaz del TP5** (brief v4, «Cambios de alcance»). Ninguno está construido:
   - que la tarjeta de la materia lleve a sus contenidos;
   - distinguir la materia de la comisión;
   - etiquetas de lista cerrada;
   - un mensaje de formato no admitido que diga qué formatos sí se aceptan.
4. **El piloto de la hipótesis v4:** una comisión real, varias semanas, sin material precargado. Criterios y condición de pivote en [`docs/brief.md`](docs/brief.md).
5. **Consultar a la UNLaM** si permite una aplicación externa y si expone una forma de verificar alumnos e inscripciones (supuestos 7 y 8, sin evidencia).

Deuda conocida, además de lo anterior:

- todo el backend está en `server.js`, sin capas ni migraciones;
- no hay pruebas automáticas;
- la clave del panel y la sesión de los archivos viajan en la URL;
- los límites de tamaño son incoherentes (10 MB en el cliente, 15 MB en el servidor).

## Mapa del repositorio

| Ruta | Qué hay |
|---|---|
| `docs/brief.md` | Brief de producto, **versión 5** (la última). Cada versión abre con lo que cambió y por qué. |
| `docs/prompts.md` | Registro de trabajo con IA, con sus huecos declarados al final. |
| `docs/evidencia/tp2/` | Relevamiento del TP2: guía de preguntas y entrevistas a U1, U2 y U3. |
| `docs/evidencia/tp5/` | Prueba del TP5: guion de la sesión, fichas de observación y grabaciones por tarea de U1, U2 y U3. |
| `docs/metricas.md` | Métricas M1 y M2, métrica vanidosa y criterio de éxito del TP5. |
| `docs/diseno/` | TP3: alternativas A, B y C, propuesta final y wireframe navegable (`wireframe/index.html`). |
| `docs/evaluacion/` | TP4: perfil del producto evaluado (equipo Sumate) y evaluación heurística hecha con IA. |
| `docs/arquitectura/` | TP6: arquitectura real del MVP y de la visión, decisiones heredadas, componente más riesgoso y los dos diagramas. |
| `docs/tpi/TPI-Bananza.md` | Documento integrador del TPI. |
| `src/` | El MVP. |

## Líneas base

Cada entrega tiene su tag. `tp4-entrega` es el único que el equipo aplicó durante la cursada. Los demás se aplicaron al preparar el TPI, en el commit que cierra cada entrega en `main`:

| Tag | Commit | Fecha | Qué contiene |
|---|---|---|---|
| `tp1-entrega` | `93912b4` | 29/08/2026 | Brief v1 y primera entrada del registro de IA. |
| `tp2-entrega` | `2074356` | 02/09/2026 | Entrevistas U1, U2 y U3, y brief v2. Las entrevistas estaban todavía en `docs/evidencia/` con nombres provisorios; se ordenaron en `docs/evidencia/tp2/` el 08/09 (`3dc4e72`). |
| `tp3-entrega` | `eb277cc` | 14/09/2026 | Brief v3, alternativas y wireframe. `propuesta-final.md` se commiteó el 22/09 y entra en `tp4-entrega`. |
| `tp4-entrega` | `401f2b7` | 22/09/2026 | Tag original del equipo. La evaluación con IA (`docs/evaluacion/`) se mergeó después, el 27/09 (`f751443`). |
| `tp5-entrega` | `d8320da` | 11/11/2026 | MVP, métricas, guion, evidencia de las sesiones y brief v4. Se eligió este y no el merge del 09/11 (`ab9812b`) porque ahí `docs/metricas.md` estaba borrado (`db28bab`); se restauró el 11/11 (`46de60a`). |
| `tp6-entrega` | `53da1eb` | 19/11/2026 | Brief v5 y `docs/arquitectura/tp6-arquitectura.md`, en la rama `tp6` antes de mergear. Se eligió este y no el merge a `main` (`3a8e9ee`) porque ese merge borró `docs/arquitectura/`; se restauró en `tpi-entrega`. |
| `tpi-entrega` | rama `tpi` | 21/11/2026 | README, arquitectura restaurada, brief v5 sin el párrafo duplicado, registro de IA y documento integrador. |

No hay línea base del **TP7**: no encontramos en el repositorio commits ni archivos que correspondan a esa entrega.
