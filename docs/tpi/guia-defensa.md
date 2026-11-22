# Guía de defensa · TPI Bananza (UNLaMigos)

No son las diapositivas: son las preguntas probables de los cinco tipos de la consigna, con la respuesta y la cita exacta para cada una. Todo integrante tiene que poder contestar cualquiera, aunque no haya escrito esa parte. Los archivos son rutas del repositorio.

## Quién hizo qué (según `git log`)

Las preguntas «las responde quien decidió». Esta tabla sale de los autores de los commits; corríjanla si alguien trabajó sin commitear.

| Parte | Commits | Autor en git |
|---|---|---|
| Brief v1, v2 y v3, guía de preguntas, wireframe y alternativas del TP3 | `4b2373f`, `5a0e3df`, `a3f0269`, `25f1890`, `7fef41d` | Antonio Solis |
| Brief v2 alternativo, nunca mergeado (rama `actualizar-brief-tp2`) | `d97f853` | Leonardo Barbaro |
| Entrevistas a U1 y U3 | `a5d385c`, `831bd8e` | Franco Kowalski |
| Entrevista a U2, fichas y videos del TP5 | `565b291`, `67d748b`, `b950c9b`, `b946285` | Antonio Solis |
| Propuesta final del TP3, merges y borrado de `docs/arquitectura/` | `93ae148`, `18dd4ad` | Iara Rodriguez |
| Métricas, MVP, brief v4 y v5, arquitectura del TP6 | `8662d38`, `b205fd3`, `9cf7fa1`, `b2d1fd8` | Maximiliano Caseres |
| Observación de las sesiones del TP5 | fichas | U1 y U3: Maxi · U2: Antonio |

## 1. Anclaje: «¿de qué dato del relevamiento sale esta decisión? Con la cita.»

| Decisión | Cita | Archivo |
|---|---|---|
| Organizar por materia, comisión y cuatrimestre | U1: «se meten en el grupo de WhatsApp de otra comisión para sacar info y a veces marean, tiran comentarios, fechas o temas de otra comisión» | `docs/evidencia/tp2/entrevista_U1.md`, sección 4 |
| Contexto y advertencias en cada aporte | U1: «siempre que se pueda poner una advertencia tipo "ojo con esto": una breve descripción que diga de qué cursada y año es, con qué docente…» | `entrevista_U1.md`, sección 4 |
| Sacar la búsqueda de compañeros | U1: «Dificultad para encontrarlo no; la dificultad es que después el grupo funcione» | `entrevista_U1.md`, sección 4 |
| Eficiencia como primer atributo | U3: «a veces pasás más tiempo buscándolo que leyéndolo» | `entrevista_U3.md`, sección 3 |
| Usuario primario: quien busca sin contactos | U3: «no sabés bien dónde preguntar, no estás en los grupos y no hay un lugar centralizado»; U2: «tenés que saber bien cómo buscar, […] a quién pedirle también» | `entrevista_U3.md` §3; `entrevista_U2.md` (~00:01:36) |
| Consultas separadas de los docentes | U3: «Hay preguntas que capaz no querés que vea el profesor» | `entrevista_U3.md`, sección 4 |
| Verificación contra spam, no contra suplantación | U3: «que no pase eso: que entre gente que no es de la facultad y empiece a enviar spam»; U2: «mandan eh links raros y promociones raras» | `entrevista_U3.md` §6; `entrevista_U2.md` |
| Escritorio y no móvil | Los tres buscan desde la PC. U1: «puedo tener varias cosas en paralelo»; U3: «puedo tener varias cosas abiertas al mismo tiempo» | `entrevista_U1.md` §2; `entrevista_U3.md` §2 |
| Notificaciones como necesidad (diferidas) | U2 no usa MIeL «porque me parece que es más lento porque no tiene notificaciones» | `entrevista_U2.md` (~00:02:42) |
| Aporte sostenido como riesgo principal | U3 en el cierre del TP5: «todo depende de la cantidad de contenido de la plataforma» | `docs/evidencia/tp5/U3-sesion/observaciones.md` |
| Desestimar el hallazgo 5 de SPOTTER (TP4B) | La misma cita de U1 sobre otras comisiones | PDF del TP4B entregado (fuera del repositorio) |

**Trampa probable:** «¿Por qué dicen que la dispersión molesta si U1 dijo lo contrario?» Respuesta: sí, U1 dijo «no siento que falte centralizar la información». Por eso el supuesto crítico quedó confirmado en 2 de 3, no en 3 de 3, y U1 aparece como la que ya conoce los canales. El brief lo dice así.

## 2. Descarte: «¿qué propuso la IA que rechazaron, y qué evidencia lo contradecía?»

1. **La alternativa A sin ajustes del TP3** (ChatGPT, 08/09): descarga directa aunque el material sea de otra comisión o tenga advertencias. La contradecía la cita de U1 sobre otras comisiones. La reemplazamos por el contexto visible y la confirmación en el detalle (TP3, punto 10.2). Es el descarte de mayor impacto: de ahí salen el aviso «Otra cursada» y la confirmación. **Límite que hay que decir:** el TP3 deja la atribución a la IA «pendiente de contrastar», porque no guardamos el texto de la propuesta.
2. **La alternativa B** (recorrido paso a paso obligatorio): contradice la eficiencia (U3: «más tiempo buscándolo que leyéndolo»).
3. **Seguir el wireframe al pie de la letra** (25/10): el equipo le pidió a Claude Code que no lo hiciera y que completara el flujo. Esto no es un rechazo de una propuesta de la IA, sino un pedido nuestro.
4. **TP6** (Codex, 17/11): el equipo redujo la tabla de decisiones heredadas a dos ya documentadas y pidió quitar la lista de fuentes.

**El rechazo que hoy revertiríamos** (es el mejor documentado): el borrador de Claude Code del 26/10 medía M2 con **48 h** para que llegara una respuesta (`git show 8662d38:docs/metricas.md`). El 1/11 lo cambiamos por una respuesta dentro de la sesión, pedida en T6, y sacamos el seguimiento de 48 h (`eb765e9`, Antonio). Ese cambio hizo que M2 se cumpliera por consigna.

**Lo que no rechazamos y deberíamos haber rechazado:** la «búsqueda por texto» que agregó la herramienta el 25/10, que es justo el hallazgo 10 de SPOTTER desestimado en el TP4B. Ojo: la vista para celular **no** es un agregado de la IA; la propuesta final del TP3 ya decía «pensada para navegador de escritorio y móvil».

## 3. Perturbación: «si cambia esta condición, ¿qué se cae y qué sobrevive?»

| Si… | Se cae | Sobrevive |
|---|---|---|
| La UNLaM no autoriza apps externas o no da forma de verificar (supuestos 7 y 8) | El acceso verificado y la promesa de «tu comisión» como dato cierto. Los filtros por cursada y la regla de que sólo los inscriptos escriben pasan a depender de lo que declara el estudiante. | Materiales organizados, contexto, advertencias y consultas, con la comisión declarada y verificación por enlace al correo como paso intermedio. |
| Nadie sube material sin que el equipo lo cargue | Todo: M1 no tiene qué encontrar. U3: «todo depende de la cantidad de contenido». | Nada del valor central. Sería pivote de motor de crecimiento (por ejemplo, sembrar desde el Discord o el disco de la carrera, con permiso). |
| Las consultas no reciben respuesta sin consigna | El canal de consultas. | Materiales. Es el pivote escrito en el brief v4: zoom-in a materiales. |
| El usuario pasa a ser ingresante o de primer año, desde el celular | La prioridad de escritorio y todo el perfil del TP2: los tres entrevistados son de etapas intermedias o avanzadas y buscan desde la PC. Habría que relevar de nuevo. | La organización por cursada. La interfaz adaptable a celular ya existe (prevista en la propuesta final del TP3). |
| Se pierde el disco del servidor | Todos los aportes y la base: no hay respaldo. | El código y el seed. Es decir, sólo el material que cargó el equipo. |
| Llegan 200 estudiantes subiendo a la vez | El único proceso: cada subida entra entera en memoria, en base64. | La lectura con pocos usuarios: SQLite aguanta textos cortos. |

## 4. Detección: «acá hay un problema en el producto; encuéntrenlo y expliquen por qué lo es»

Problemas reales, comprobados en el código o la evidencia:

1. **Dominio mal validado.** `email.endsWith('unlam.edu.ar')` acepta `x@noesunlam.edu.ar` (`src/server.js`, `POST /api/registro`). Lo probamos y el servidor lo acepta. Va contra la verificación que pidieron los tres entrevistados.
2. **Cualquiera entra como otro.** Si el correo ya existe, el registro devuelve el token de esa persona, sin contraseña ni verificación. El token no rota.
3. **El token viaja en la URL** de los archivos (`?t=`) y la clave del panel también (`?clave=`). Queda en el historial y en los logs.
4. **Límites incoherentes.** El cliente corta en 10 MB, el servidor admite 15 MB de JSON en base64 y el error dice «máximo 10 MB».
5. **Contenido sin control.** El archivo de prueba de U1 («AAAA…», «No tiene mucho que ver con la materia») quedó publicado como parcial de Sistemas Operativos para toda la comisión.
6. **Mensaje de error que confunde.** U1 salió creyendo que no podía subir un Excel; lo rechazado fue un `.sf2` (`U1-sesion/t4.mkv`, ~1:10).
7. **La tarjeta de la materia no responde al clic** (U3, cierre 2). Está anotado en la v4 y no se corrigió.
8. **M2 se cumple por consigna.** T6 le pide al participante que responda, así que M2 mide el flujo, no el valor. La versión original de la métrica (48 h) no tenía ese problema; la cambiamos el 1/11 (`eb765e9`).
9. **M1 sin cruzar.** La métrica exigía que coincidieran el registro del MVP y el observador. `eventos.csv` nunca se exportó.
10. **Métricas «antes de construir» sólo en el commit.** `8662d38` (métricas) va 5 segundos antes que `b205fd3` (MVP), y el registro de IA fecha la construcción el 25/10. Además, `docs/metricas.md` se borró el 9/11 y se reescribió el 11/11, después de la prueba (mismos umbrales que el 1/11).
11. **El brief citaba un archivo borrado.** `docs/arquitectura/tp6-arquitectura.md` se borró en el merge del TP6 (`18dd4ad`); lo restauramos en `tpi-entrega`.
12. **Un usuario primario no observado.** Nadie verificó que algún participante cursara «sin grupos ni contactos».

## 5. Consecuencia: «¿qué se rompe si sale a producción, y quién lo sostiene?»

- **Qué se rompe primero:** la identidad (cualquiera entra como cualquiera), los aportes (sin respaldo) y la memoria del proceso ante subidas simultáneas. Después, la confianza en el contenido: no hay moderación.
- **Riesgo que se resuelve primero:** subida y almacenamiento (TP6). Es lo que el piloto necesita para que el contenido crezca.
- **Quién lo sostiene:** sin un dueño, nadie. Propuesta: una agrupación o el centro de estudiantes de Informática, con un acceso compartido (GitHub `gadsii-unlam`, hosting, `ADMIN_KEY`), el `README.md`, una guía de respaldo y restauración y un presupuesto mensual de hosting. La alternativa es un área de sistemas de la UNLaM, que es la única que puede dar la integración real.
- **Riesgo legal que no evaluamos:** publicar parciales y material de cátedra sin autorización, y guardar datos personales (correos) sin una política. Decirlo como límite, no inventar la respuesta.

## Frases que conviene tener listas

- «La prueba dio "se sostiene", pero probó la interfaz, no el valor: el material lo cargamos nosotros y la respuesta la pidió la consigna.»
- «El momento en que más cambió el rumbo fue el TP2: pasamos de una red social a un repositorio organizado por cursada, por lo que dijo U1 de las otras comisiones.»
- «La decisión que cambiaríamos es cómo diseñamos la prueba del TP5: hoy probaríamos primero el aporte, con una comisión real y sin material cargado.»
- «El resultado del TP5 cambió el brief, no el producto: el código no cambia desde el 26/10.»
