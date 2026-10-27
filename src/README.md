# UNLaMigos — MVP (TP5)

Construye el alcance del brief v3 (`docs/brief.md`). Mantiene las decisiones de la alternativa A (`docs/diseno/propuesta-final.md`): cursada precargada y editable, lista con detalle lateral y avisos de contexto antes de descargar. La interfaz es propia, con modo claro y oscuro según el sistema, y se adapta a celular, donde el detalle se abre como panel inferior.

### Flujo principal (brief v3, pasos 1 a 7)

1. **Ingreso** con correo institucional. Si es la primera vez, se pide nombre o apodo.
2. **Cursadas:** se precargan por correo o el estudiante elige su comisión en cada materia. **Mis materias** muestra comisión, cuatrimestre, cantidad de materiales y consultas sin responder.
3. **Materia:** aplica la comisión y el cuatrimestre propios y muestra los **tipos de material disponibles**, con cantidad. Los tipos sin material aparecen deshabilitados.
4. **Tipo de material:** Parciales, Finales, Apuntes, Bibliografía u Otros. También hay búsqueda por texto.
5. **Lista:** cada material muestra tipo, comisión, cuatrimestre, tema, contexto y advertencia sin abrirlo.
6. **Detalle:** se abre al elegir un material. Muestra quién lo subió, tipo y tamaño del archivo, contexto completo, advertencias y aviso si es de otra cursada.
7. **Ver o descargar:** visor de PDF, imagen y texto (con formato). Descargar material de otra cursada, o con advertencia desde la lista, pide confirmación en el mismo lugar.

Si no hay resultados, se dice claramente y nunca se muestra material de otra comisión como propio.

Incluye las correcciones del TP4 que aceptó el equipo: ayuda y error junto al campo de correo, confirmación y resultado de descarga junto a la acción, detalle que se abre sólo al elegir un material, comisión única como dato fijo, cursada conservada al cambiar de pestaña, y tipo y tamaño del archivo en el detalle. El detalle está en `docs/tp5-informe.md`, punto 2.

### Flujos complementarios

- **Subir material** en cuatro pasos (cursada, qué es, contexto y advertencias, archivo o enlace), con la opción de arrastrar y soltar el archivo. Quien lo subió puede eliminarlo.
- **Consultas de mi comisión:** publicar, responder y marcar «Me sirvió» (sólo quien preguntó). Se puede filtrar por todas, sin responder o mías. La lista se actualiza sola.
- **Mis cursadas y perfil:** cambiar comisiones y nombre.

## Qué se simula

- **Regularidad e inscripción.** Sólo se controla que el correo termine en `unlam.edu.ar` (variable `EMAIL_DOMINIO`). No se consulta ningún sistema de la UNLaM.
- **Cursadas.** Si el correo figura en `seed/datos.json` → `inscripciones_precargadas`, las materias aparecen solas. Si no, el estudiante elige su comisión en cada materia.
- **Material inicial y canales.** El equipo los carga a mano en `seed/datos.json` y `seed/archivos/`. Lo que hay ahora son **ejemplos**: hay que reemplazarlos por material real y por las comisiones de los participantes antes de la sesión.

Fuera del MVP, como define el brief: reseñas, notificaciones, búsqueda de grupo, app nativa y uso sin conexión.

## Cómo correrlo

Requiere Node.js 22.13 o superior (usa `node:sqlite`, sin dependencias de npm).

```bash
cd src
npm run reset        # crea la base y carga seed/datos.json (borra datos previos)
ADMIN_KEY=una-clave npm start
```

- App: http://localhost:3000
- Panel del equipo: http://localhost:3000/admin.html?clave=una-clave. Tiene un resumen por participante y el CSV de eventos.

Si no se define `ADMIN_KEY`, el servidor genera una clave y la muestra en la consola. `PORT` y `DATA_DIR` también se pueden configurar.

`npm run seed` agrega lo nuevo de `datos.json` sin borrar nada.

Para la sesión, el MVP tiene que estar en una URL pública para que los participantes entren desde su computadora. Sirve cualquier hosting de Node con disco persistente; si no, una máquina del equipo con un túnel.

## Registro de uso

La app guarda eventos (`materia_abierta`, `filtro_cambiado`, `detalle_abierto`, `sin_resultados`, `recurso_visualizado`, `recurso_descargado`, `otra_cursada_confirmada`, `busqueda`, `consulta_publicada`, `respuesta_publicada`, `respuesta_util`, `material_subido`, etc.) con hora UTC. El panel calcula, por participante:

- minutos entre abrir una materia y abrir o descargar por primera vez un material **de su cursada**;
- accesos a material de otra cursada y búsquedas sin resultados;
- consultas con respuesta de otro estudiante y con respuesta marcada «Me sirvió»;
- materiales subidos (y cuántos con advertencia).

Estos datos complementan la observación, no la reemplazan. La herramienta no sabe si alguien pidió ayuda ni si abrió WhatsApp.

## Estructura

```
src/
  server.js      API JSON + archivos estáticos (http nativo)
  db.js          esquema SQLite
  seed.js        carga manual de datos de prueba
  seed/          datos.json y archivos de ejemplo
  public/        cliente (HTML + CSS + JS sin framework) y panel del equipo
  data/          base y archivos subidos (no se versiona)
```
