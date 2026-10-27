# TP5 — Construcción del MVP, prueba y aprendizaje · Bananza

- **Repositorio:** [completar URL del repo]
- **MVP:** [completar URL pública del MVP]
- **Integrantes:** Carlos Antonio Solis Rocha, Franco Kowalski, Iara Sol Rodriguez, Leonardo Barbaro, Maximiliano Caseres

> **Estado del documento.** Las Partes 1 a 3 apuntan a material ya preparado. Las Partes 4 y 5 son un **esqueleto**: se completan sólo con lo que pase en las sesiones con U1, U2 y U3. Ninguna conclusión de este informe puede escribirse sin una observación de `docs/evidencia/tp5/` que la sostenga. La IA no participó de las sesiones, así que esas secciones no tienen contenido generado. Las guías entre corchetes se borran al completar.

## Parte 1 — Antes de construir

### 1. Métricas y criterio de éxito

Ver [`docs/metricas.md`](metricas.md) (commit `8662d38`, anterior al primer commit de `src/`).

Ratificado por el equipo el 26/10/2026.

- **M1 — Búsqueda autónoma exitosa:** proporción de participantes que abren o descargan un material de su propia comisión y cuatrimestre en menos de 5 minutos desde que entran a la materia, sin pedir ayuda y sin salir a WhatsApp, Discord u otra plataforma.
- **M2 — Consultas resueltas entre pares:** proporción de consultas que reciben, dentro de las 48 h, una respuesta de otro estudiante sin contacto previo con quien preguntó, y que quien preguntó marca como «Me sirvió».
- **Métrica vanidosa:** cantidad de materiales disponibles y descargas totales. La carga inicial la controla el equipo, las tareas de la sesión hacen subir las descargas y no distinguen si lo descargado era de su cursada ni si le sirvió.

| Resultado | Condición |
|---|---|
| **Se sostiene** | M1 en al menos 2 de 3 participantes, ninguno recurre a otra plataforma para completar la búsqueda, y al menos 1 consulta con respuesta útil de otro estudiante sin contacto previo en 48 h. |
| **No se sostiene** | M1 en 1 participante o en ninguno, por motivos que no son de interfaz, o ninguna consulta con respuesta de otro estudiante en 48 h. |
| **No concluyente** | M1 falla por fricciones de interfaz observadas, pero los participantes muestran que el material les sirve. Se corrige y se repite la prueba antes de decidir. |

## Parte 2 — Construir

### 2. MVP

Código en [`src/`](../src), instrucciones en [`src/README.md`](../src/README.md).

- **Construido:** registro con correo institucional; mis materias; materiales con filtros precargados por comisión y cuatrimestre, tabla, detalle lateral, visor y descarga; carga de material con contexto y advertencias; canal de consultas por comisión con respuestas y «Me sirvió».
- **Simulado:** regularidad e inscripción (correos y comisiones precargados a mano), material inicial cargado por el equipo, canales creados a mano.
- **Fuera de alcance (brief v3):** reseñas, notificaciones, búsqueda de grupo, app móvil, uso sin conexión, integración con la UNLaM.
- **Correcciones del TP4 incorporadas** (las que el equipo aceptó en la respuesta del TP4B):
  - **1, registro:** se mantiene el rótulo «Correo institucional», se agrega una ayuda visible con el formato `@unlam.edu.ar` y el error de dominio aparece junto al campo.
  - **2, descarga:** la confirmación aparece junto al botón que se tocó (en la lista, el detalle o el visor) y el resultado («Descarga iniciada») se muestra en el mismo lugar y se anuncia a lectores de pantalla.
  - **3 y 4, Materiales:** la barra de filtros es más compacta, el listado usa todo el ancho y el detalle lateral se abre sólo al elegir un material. La descarga directa sigue disponible para los materiales de la propia cursada sin advertencias.
  - **6, comisión única:** si una materia tiene una sola comisión o un solo cuatrimestre, se muestra como dato fijo, también en «Subir material». Los tipos de material sin contenido siguen visibles y, al elegirlos, se aclara que no hay material de ese tipo.
  - **7, cambio de pestaña:** la comisión y el cuatrimestre elegidos en cada materia se conservan al pasar a Consultas, al volver y al recargar. En Consultas se avisa qué cursada se sigue viendo en Materiales. El botón se llama «Restablecer mi cursada», como se defendió en el hallazgo 11.
  - **9, parcial:** el tipo de archivo y el tamaño aparecen en el detalle, no en el listado. No se muestra la fecha de carga.
  - Los hallazgos 5, 8, 10 y 11 se desestimaron y no generaron cambios.
- **Decisiones estructurales tomadas por la herramienta:** ver `docs/prompts.md`, entrada del 25/10/2026.

## Parte 3 — Probar

### 3. Preparación de la sesión

Ver [`docs/evidencia/tp5/guion-sesion.md`](evidencia/tp5/guion-sesion.md).

### 4. Prueba con usuarios

| Participante | Fecha | Modalidad | Evidencia |
|---|---|---|---|
| U1 | | | [`U1.md`](evidencia/tp5/U1.md) |
| U2 | | | [`U2.md`](evidencia/tp5/U2.md) |
| U3 | | | [`U3.md`](evidencia/tp5/U3.md) |

Exportación del registro del MVP: [`eventos.csv`](evidencia/tp5/eventos.csv).

## Parte 4 — Aprender

### 5. Las dos capas

#### Capa de usabilidad — ¿el MVP funciona bien?

| Pregunta | Resultado | Observación que lo sostiene (quién, qué tarea, minuto) |
|---|---|---|
| ¿Completaron el flujo principal (T1)? ¿Con cuánta fricción? | | |
| ¿Aparecieron los problemas que anticipó el TP4? | | |
| ¿Aparecieron otros? | | |

#### Capa de negocio — ¿la hipótesis se sostiene?

| Pregunta | Resultado | Observación que lo sostiene |
|---|---|---|
| ¿Genera el valor que prometía la hipótesis? | | |
| ¿Hay evidencia de que resuelve el problema real que contaron en el TP2? | | |
| M1 contra el criterio de éxito | __ de 3 | |
| M2 contra el criterio de éxito | __ consultas con respuesta útil de otro en 48 h | |
| Fila del criterio de éxito en la que cae el resultado | Se sostiene / No se sostiene / No concluyente | |

[No mezclar las capas: un problema de interfaz no refuta la hipótesis y una interfaz cómoda no la confirma.]

### 6. Pivotar o perseverar

**Decisión:** [Perseverar / Pivotar, tipo de pivote]

**Fundamento:** [cada argumento remite a una fila del punto 5]

- Si se persevera: ¿qué es lo próximo a construir y por qué?
- Si se pivota: ¿de qué tipo es el pivote (zoom-in, zoom-out, segmento de consumidor, necesidad del consumidor, plataforma, motor de crecimiento, canal, tecnología) y cuál es la nueva hipótesis?

### 7. Brief de producto — versión 4

`docs/brief.md` → versión 4, que abre con el párrafo de cambios respecto de la v3. Incorpora lo aprendido, el estado de la hipótesis y la decisión con su fundamento. [Se actualiza una vez cerrado el punto 6.]

## Parte 5 — Fundamentación

### 8. Anclaje

[Revisar que cada conclusión del punto 5 tenga en la columna «Observación» quién, qué hizo, en qué momento y con qué resultado. Sacar las que no la tengan.]

### 9. El resultado que no esperaban

[Qué pasó, con qué usuario, en qué momento (minuto de la grabación) y **qué hizo el equipo con eso**.]

### 10. La métrica que podría estar mintiendo

[Cuál de M1 o M2 podría dar una lectura tranquilizadora sin que la hipótesis sea cierta, y por qué. Ejemplo de razonamiento a contrastar con lo observado: M1 se cumple por diseño de la sesión (la tarea lleva directo a un material que el equipo cargó, en una base chica), lo que no prueba que en uso real haya material de su comisión; o M2 se cumple porque quien responde es otro participante invitado por el equipo, no un compañero espontáneo.]

### 11. Sobre el uso de IA

Registro completo en [`docs/prompts.md`](prompts.md).

- **Delegado:** construcción del MVP (Claude Code); redacción inicial de borradores de `metricas.md` y `guion-sesion.md`, revisados y aprobados por el equipo [confirmar].
- **No delegado:** las métricas y su umbral, el diseño final de las tareas, la observación, la interpretación y la decisión del punto 6.
