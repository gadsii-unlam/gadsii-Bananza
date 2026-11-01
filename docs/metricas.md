# TP5 · Punto 1 — Métricas y criterio de éxito

> Ratificado por el equipo el 26/10/2026, antes de la sesión con usuarios. Ordena lo que el equipo definió en el brief v3 («Sabremos que estamos en lo correcto cuando…», criterios 1 a 5).

**Hipótesis (brief v3):** un estudiante de Ingeniería en Informática de la UNLaM que cursa sin grupos ni contactos tiene dificultades para conseguir materiales y resolver consultas, porque la información está dispersa y el acceso depende de conocer los canales o las personas adecuadas. UNLaMigos lo vincula con materiales y estudiantes por materia, comisión y cuatrimestre.

## Métricas accionables

### M1 — Búsqueda autónoma exitosa

**Definición:** proporción de participantes que, ante la tarea de búsqueda, abren o descargan un material **de su propia comisión y cuatrimestre** en menos de 5 minutos desde que entran a la materia, **sin pedir ayuda y sin salir a WhatsApp, Discord u otra plataforma**.

**Cómo se mide:** el tiempo y la cursada del material salen del registro del MVP (panel del equipo, «Min. hasta abrir material de su cursada»). Si pidió ayuda o salió de la app, lo anota el observador. Las dos fuentes tienen que coincidir para contar como éxito.

**Por qué es accionable:** mide de forma directa la primera mitad de la hipótesis (criterios 1, 4 y 5 del brief). Si baja, la observación dice qué hacer:

- se trabaron en la interfaz (filtros, tabla, detalle) → corregir la usabilidad y repetir;
- encontraron el material pero dicen que igual lo pedirían por WhatsApp, o que el material no les sirve → el problema es de valor, no de interfaz. Se evalúa un pivote.

### M2 — Consultas resueltas entre pares

**Definición:** proporción de consultas publicadas en T2 que, antes de que termine el bloque de prueba, reciben una respuesta en T6 de otro participante de la misma comisión con quien quien preguntó no tenía contacto previo, y que quien preguntó marca como «Me sirvió».

**Cómo se mide:** se organiza un bloque compartido entre al menos dos participantes de la misma comisión: uno publica una consulta en T2 y otro responde esa misma consulta en T6. La respuesta y la marca «Me sirvió» se verifican en el registro del MVP («Con respuesta marcada útil»); al autor de la consulta se le pregunta si conocía previamente a quien respondió. La medición termina al cerrar el bloque.

**Por qué es accionable:** mide la segunda mitad de la hipótesis (criterio 2 del brief): que el producto reduzca la dependencia de conocer a la persona correcta. Según el resultado:

- si las consultas no reciben respuesta → el canal no genera valor por sí solo. Se decide si sostenerlo (motor de participación) o dejarlo afuera (zoom-in a materiales);
- si reciben respuesta pero nadie la marca útil → revisar la calidad o la pertinencia del canal.

> **Condición para medir M2:** al menos dos participantes deben compartir una comisión real o simulada y participar del mismo bloque de prueba. T6 debe responder una consulta publicada por otra persona en T2; esa respuesta no se guiona, ambas personas no deben tener contacto previo y quien preguntó debe poder marcar «Me sirvió» antes de cerrar el bloque.

### Observaciones complementarias (no son métricas de decisión)

- **Aporte espontáneo** (criterio 3 del brief): ¿algún participante sube material propio con contexto **sin que se lo pidan**?
- **Errores de cursada** (atributo «baja tasa de errores» del TP3): descargas de material de otra comisión sin advertirlo y confirmaciones de «Sí, descargar igual».

## Métrica vanidosa

**Cantidad de materiales disponibles y descargas totales.**

Parece medir que «la plataforma funciona», pero:

- los materiales iniciales los carga el equipo (la simulación del TP3), así que el número lo controla el equipo y no los estudiantes;
- en la sesión cada tarea lleva al participante a descargar algo, así que las descargas suben por diseño de la prueba, no por valor;
- no distingue si lo descargado era de su cursada, si le sirvió ni si lo habría conseguido igual por WhatsApp.

Podría duplicarse sin que la hipótesis esté más cerca de confirmarse. Lo mismo pasa con «usuarios registrados»: en la prueba se registran todos porque se les pide.

## Criterio de éxito (escrito antes de la prueba)

| Resultado | Condición |
|---|---|
| **La hipótesis se sostiene** | M1: al menos **2 de 3** participantes la cumplen, **y** ninguno recurre a WhatsApp u otra plataforma para completar la búsqueda, **y** M2: al menos **1** consulta recibe, antes de terminar la sesión, una respuesta útil de otro estudiante de la misma comisión con quien quien preguntó no tenía contacto previo. |
| **La hipótesis no se sostiene** | M1: **1 o ningún** participante la cumple, por motivos que no se resuelven con un ajuste de interfaz (lo encontró, pero dice que no le sirve o que lo seguiría pidiendo por WhatsApp), **o** M2: **ninguna** consulta recibe durante la sesión una respuesta útil que cumpla las condiciones de la métrica. |
| **Resultado no concluyente** | M1 falla por fricciones de interfaz observadas (no encontró un filtro, no entendió la tabla), pero los participantes dicen y demuestran que el material les sirve. Se corrige la usabilidad y se repite la prueba **antes** de decidir pivotar. |

Cualquier conclusión del informe se contrasta contra esta tabla. Si algo de lo observado no entra en ninguna fila, se informa como hallazgo y no se ajusta el criterio después de ver los resultados.
