# TP5 · Punto 3 — Preparación de la sesión

> **BORRADOR PARA DECISIÓN DEL EQUIPO.** Según la consigna, el diseño de las tareas **no se delega en la IA**. Estas tareas se armaron a partir de lo que contaron U1, U2 y U3 en el TP2. El equipo las tiene que revisar, reescribir con las materias y temas reales de cada participante y aprobar antes de la sesión. Lo que está entre [corchetes] se completa por participante.

## Antes de la sesión (checklist del equipo)

- [ ] Las comisiones reales de U1, U2 y U3 están cargadas en `src/seed/datos.json`, con sus correos en `inscripciones_precargadas`.
- [ ] Hay material real de esas comisiones, con al menos un recurso de **otra** comisión o de un cuatrimestre anterior (para la tarea 3).
- [ ] El MVP está publicado en una URL y se probó desde una computadora que no es del equipo.
- [x] `metricas.md` está aprobado (26/10/2026).
- [ ] `metricas.md` está commiteado antes que `src/`.
- [ ] Hay permiso para grabar la pantalla y el audio.
- [ ] Hay un observador y un moderador, con roles separados. El moderador sólo lee las tareas.

## Consigna de apertura (se lee igual para todos)

> «Gracias por darnos un rato. Vamos a mostrarte algo que estamos armando y queremos ver cómo lo usás. No te estamos evaluando a vos: si algo no se entiende, el problema es nuestro. Te vamos a contar unas situaciones y vos hacé lo que harías en tu casa. Si te trabás, contanos qué estás pensando, pero no te vamos a poder ayudar: justamente eso es lo que queremos ver. Si en algún momento usarías otra cosa (WhatsApp, Discord, MIeL), decilo o hacelo.»

Se le pasa la URL y se le pide que entre con su correo institucional. **No se explica la app.**

## Tareas (situaciones, no instrucciones)

| # | Situación que se lee | Qué mide | Se completa cuando… |
|---|---|---|---|
| T1 | «Tenés el [primer parcial] de [materia] en una semana y querés ver cómo vino un parcial **en tu comisión** este cuatrimestre. Conseguilo como lo harías un día después del trabajo.» | M1 · criterios 1, 4 y 5 · eficiencia | Abre o descarga un parcial de su comisión y cuatrimestre. |
| T2 | «Estás estudiando [tema] y te quedó una duda que no te animás a preguntar en clase. Querés que te ayude alguien que cursa con vos.» | M2 · criterio 2 | Publica la consulta (la respuesta se mide en las 48 h siguientes). |
| T3 | «Un conocido de otra comisión te dice que en su parcial de [materia] tomaron [tema]. Querés saber si eso te sirve para el tuyo.» | Baja tasa de errores · criterio 4 | Distingue (o no) que el material es de otra cursada. |
| T4 | «Tenés unos minutos libres antes de cursar. Usá la página como quieras, como si fuera tuya.» Se deja libre unos 5 minutos. | Criterio 3 (aporte espontáneo) · interés real | Termina el tiempo. **No** se menciona la opción de subir material. |

Al día siguiente (sin el equipo presente): se le pide que entre a ver si respondieron su consulta y, si tiene ganas, que responda la de otro. Se registra qué hizo según el panel del equipo.

## Qué se observa

- **Dónde duda:** pausas de más de 5 s, cursor que recorre sin hacer clic, relectura de la consigna.
- **Dónde se equivoca:** filtros que cambia sin querer, material de otra comisión abierto como si fuera propio, vuelta atrás.
- **Dónde pide ayuda:** cualquier pregunta al moderador, aunque no se le responda. Se anota la frase textual y el momento.
- **Qué hace distinto de lo esperado:** caminos que no usan los filtros, abrir WhatsApp, buscar con el navegador, salir de la app.
- **Dice ≠ hace:** cuando lo que comenta no coincide con lo que hace, se anotan las dos cosas. Vale lo que hace.

## Cómo se registra

- **Grabación de pantalla y audio** (con permiso), con nombre `U[n]-sesion.mp4`. Si es pesada, no se versiona: se deja un enlace en `U[n].md`.
- **Hoja de observación** por participante: [`plantilla-observacion.md`](plantilla-observacion.md) → `U1.md`, `U2.md`, `U3.md`.
- **Tiempos:** cronómetro del observador (inicio = fin de la lectura de la tarea) y registro del MVP (`/admin.html`). Si no coinciden, se anotan los dos.
- **Exportación** del CSV de eventos al terminar la ventana de 48 h: `eventos.csv`.

## Preguntas de cierre (sin inducir)

1. «Contame cómo fue buscar el parcial, de principio a fin.»
2. «¿Hubo algún momento en que no supiste qué hacer? ¿Qué pensaste ahí?»
3. «La última vez que buscaste algo así, en el TP2 nos contaste que [lo que dijo]. ¿Cómo se compara con lo de hoy?» *(sólo con U1–U3 del TP2)*
4. «¿Conocías a la persona que te respondió?» *(después de las 48 h, para M2)*
5. «Si mañana necesitás otro material, ¿por dónde empezarías?»
6. «¿Hay algo que hayas querido hacer y no pudiste?»

Se evitan preguntas del tipo «¿te gustó?», «¿la usarías?» o «¿te pareció fácil?»: invitan a responder lo que el equipo quiere escuchar. La adopción se mide con lo que hace (T4 y el día siguiente), no con lo que declara.
