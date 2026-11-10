# Brief de Producto — Versión 5

**Cambios respecto de la versión 4.** El brief incorpora la arquitectura del producto (TP6). Describe la arquitectura real del MVP: un único proceso Node.js con SQLite y los archivos en el mismo disco, con la identidad y las cursadas simuladas. También ubica ese MVP dentro de la arquitectura de la visión del TP1. El salto principal es pasar de una identidad simulada a un acceso verificado contra la UNLaM. Se suman las restricciones técnicas del contexto: interfaces institucionales que todavía no se confirmaron, mantenimiento a cargo de un equipo de estudiantes y uso desde computadoras de escritorio. Como riesgo técnico se registran la subida y el almacenamiento de archivos, que es el componente del que depende el piloto de la v4. Además se corrige un dato de la v4: al revisar la grabación de U1 en T4 se vio que el archivo rechazado no fue un Excel sino un `.sf2`, y que el Excel nunca llegó a enviarse. El segmento, el usuario primario, la hipótesis v4 y la decisión de perseverar no cambian. El detalle está en `docs/arquitectura/tp6-arquitectura.md`.

**Cambios de la versión 4 respecto de la versión 3.** El 3/11/2026 se probó el MVP con tres estudiantes de la comisión 2300 (simulada). Contra el criterio de éxito escrito antes de la prueba, la hipótesis se sostiene: M1 dio 3 de 3 contra un umbral de 2, nadie salió a otra plataforma y una consulta recibió una respuesta útil de un par de la misma comisión al que no conocía. La decisión es perseverar. Lo que quedó probado, igual, es más chico que la hipótesis: el producto cumple cuando hay material de la cursada cargado y alguien de la comisión responde, y esas dos condiciones las garantizó el equipo. Por eso la versión 4 pone en el centro el supuesto que quedó sin probar, que el material lo suban los propios estudiantes; incorpora las correcciones de interfaz que surgieron en la sesión; vuelve a evaluar las notificaciones, y agrega al plan de prueba los datos que faltaron. Se mantienen el segmento, el usuario primario, el contexto de uso y los atributos de usabilidad de la versión 3.

## Segmento elegido

Estudiantes regulares y activos de **Ingeniería en Informática de la UNLaM**.

El relevamiento confirmó dificultades para buscar y organizar información académica. La pertenencia del equipo a esta comunidad facilita el acceso a usuarios reales para validar el producto.

Como estimación inicial, se considera una población de entre 1.500 y 2.500 estudiantes activos. Esta cifra no proviene de una fuente oficial y permanece pendiente de validación.

## Producto

**UNLaMigos** es un espacio para estudiantes de Ingeniería en Informática de la UNLaM que permite encontrar y compartir materiales organizados por materia, comisión y cuatrimestre, y realizar consultas a compañeros de la misma cursada.

Su valor consiste en recuperar información con menos esfuerzo que en los canales actuales y reducir la dependencia de conocer a la persona correcta o pertenecer previamente a un grupo. Cada recurso incluye información de su cursada y puede incorporar aclaraciones sobre su procedencia, alcance o posibles errores.

El producto contempla acceso verificado como objetivo. En el MVP, la condición de alumno regular y los datos de inscripción se simulan, sin integración institucional.

## Perfil del usuario real

El usuario relevado cursa varias materias simultáneamente y tiene una ocupación fuera de la Universidad. Organiza el estudio en períodos acotados entre el trabajo y la cursada.

Los tres entrevistados se encuentran en etapas intermedias o avanzadas y buscan materiales principalmente desde una computadora en su casa. Utilizan WhatsApp, MIeL y Discord según la necesidad, sin un recorrido único.

Consumen principalmente apuntes y modelos de parciales. Los estudiantes menos avanzados comparten poco o con personas conocidas, mientras que el usuario avanzado genera y comparte recursos con mayor frecuencia.

La dificultad para encontrar información depende tanto de su organización como del acceso a contactos y del conocimiento de los canales disponibles.

## Usuario primario

El usuario primario es el **estudiante que busca información**, especialmente quien cursa sin grupos ni contactos que le faciliten el acceso al material.

Dos de los tres entrevistados manifestaron dificultades frecuentes para encontrarlo. El tercero conoce los canales disponibles, pero también valora una mejor organización.

Los estudiantes que aportan recursos constituyen un grupo complementario necesario para sostener el contenido del producto.

## Necesidades y problemas

Las necesidades principales son:

* Encontrar material sin depender de contactos o grupos previos.
* Recuperar contenidos organizados por materia, comisión y cuatrimestre.
* Distinguir apuntes, parciales, finales y bibliografía.
* Reconocer el contexto, la vigencia y las posibles limitaciones de cada aporte.
* Consultar a estudiantes de la misma cursada en un espacio separado de los docentes.
* Compartir recursos con aclaraciones sobre su procedencia y posibles errores.

El principal problema es el tiempo y el esfuerzo necesarios para recuperar información dispersa o acumulada sin orden. Incluso cuando los recursos están centralizados en Discord, pueden mezclarse materiales y comentarios de distintas comisiones.

También se detectó interés por recibir notificaciones y participar en un espacio exclusivo de la carrera. Estas necesidades se mantienen en la visión del producto, aunque no se implementan por completo en el MVP.

La búsqueda de compañeros de grupo deja de ser una necesidad principal: dos de los tres entrevistados la resuelven sin dificultad y las fricciones observadas se relacionan más con la coordinación posterior.

## Contexto de uso

Las búsquedas se realizan principalmente desde una **computadora**, en el hogar, con conectividad y de forma individual, antes o después de cursar y alrededor de los horarios de trabajo.

Por ello, el MVP prioriza una experiencia web de escritorio que pueda utilizarse junto con otras herramientas de estudio. El relevamiento no aporta evidencia suficiente para priorizar una aplicación móvil ni el uso sin conexión.

## Resultado de la prueba del MVP (TP5)

Sesiones del 3/11/2026 con U1, U2 y U3, comisión 2300 simulada. Evidencia en `docs/evidencia/tp5/`; análisis completo en `docs/tp5-informe.md`, puntos 5 y 6.

### Estado de la hipótesis de la versión 3

| Criterio de la v3 | Resultado | Estado |
|---|---|---|
| 1. Encuentra solo un recurso de su comisión en menos de 5 minutos | Los tres en T1, entre 0:43 y 1:52, sin pedir ayuda | Cumplido en la sesión. Falta cruzarlo con el registro del MVP (`eventos.csv` todavía no está exportado) |
| 2. Respuesta útil de un par de la comisión sin contacto previo | U3 respondió la consulta de U2 a los 10 minutos y U2 la marcó «Me sirvió». De las consultas de U1 y U3 no quedó registro del intercambio | Cumplido en el mínimo (1 consulta). La respuesta la pedía la consigna de T6 |
| 3. Un usuario sube material propio sin que se lo pidan | Las fichas marcan aporte en U1 y U3. Lo que subió U1 fue un archivo de prueba: título «AAAA…» y su propia advertencia, «No tiene mucho que ver con la materia» (`t4.mkv`). La ficha de U3 no dice qué subió | Señal débil, no confirmada |
| 4. Identifica comisión y cuatrimestre sin abrir el material | Los tres en T5 | Cumplido |
| 5. Nadie recurre a WhatsApp | Según el observador, nadie salió de la plataforma | Cumplido en la sesión |

**Lectura:** la hipótesis se sostiene dentro de la sesión, pero no se sabe si se sostiene en uso real. El material lo cargó el equipo, la respuesta entre pares salió de una consigna y las fichas no registran si los participantes cursan sin grupos ni contactos, que es el perfil del usuario primario.

### Usabilidad

Los tres completaron las seis tareas. Se cumplieron la eficiencia y la facilidad de aprendizaje: tiempos cortos y ningún pedido de ayuda. Los problemas anticipados en el TP4 que la sesión llegó a probar no volvieron a aparecer. Aparecieron cuatro hallazgos nuevos y ninguno impidió terminar una tarea:

1. La tarjeta de la materia no responde al clic; sólo funcionan los botones «Materiales» y «Consultas» (U3).
2. Al entrar a otra materia, el participante creyó que se había equivocado de comisión: la materia actual no se distingue bien de la comisión (U1, T1).
3. Las etiquetas de «Subir material» son de texto libre y el participante pidió elegirlas de una lista (U1, T4).
4. U1 contó en el cierre que no pudo subir un Excel. La grabación (`U1-sesion/t4.mkv`, ~1:10) muestra otra cosa: el servidor rechazó un `.sf2`, que no es un formato admitido; después eligió un `.xls`, lo cambió por un `.txt` antes de publicar y publicó sin problemas. El rechazo fue correcto, pero el participante salió con la idea de que la plataforma no lo dejaba. *(Corregido en la v5: la v4 lo registraba como un rechazo del Excel sin causa identificada.)*

### Decisión: perseverar

El resultado cae en la fila «Se sostiene» del criterio de éxito. No es «No concluyente», porque M1 no falló, y los hallazgos nuevos son de interfaz.

## Hipótesis de valor — versión 4

**Creemos que** un estudiante de Ingeniería en Informática de la UNLaM que cursa sin grupos ni contactos tiene dificultades para conseguir materiales y resolver consultas porque la información está dispersa y su acceso depende de conocer los canales o las personas adecuadas.

**Nuestra solución es** UNLaMigos, un espacio donde **los mismos estudiantes suben el material con su contexto**, organizado por materia, comisión y cuatrimestre, y donde pueden consultar a sus pares, de modo que cualquiera de la comisión lo consiga sin depender de nadie.

**Sabremos que estamos en lo correcto cuando, en un piloto de varias semanas con una comisión real y sin material precargado:**

1. Estudiantes de la comisión suban material propio con su contexto, sin que el equipo lo cargue.
2. Las búsquedas encuentren material que subió otro estudiante.
3. Las consultas reciban respuesta útil de un par sin que ninguna consigna lo pida.
4. Los participantes digan que lo usarían en lugar de WhatsApp, MIeL o Discord.

La métrica vanidosa (cantidad de materiales y descargas totales) no sirve para medir esto.

**Qué nos haría pivotar:** si en el piloto las consultas no reciben respuesta cuando nadie lo pide, corresponde un zoom-in a materiales y el canal de consultas queda fuera.

### Criterios de la versión 3 (referencia)

1. Un estudiante que no participa de los grupos de una materia encuentre por sí solo un recurso de una comisión determinada en menos de cinco minutos.
2. Un estudiante obtenga una respuesta útil de otro estudiante de su comisión con quien no tenía contacto previo.
3. Al menos un usuario avanzado suba material propio junto con su contexto, sin que el equipo le solicite ese aporte concreto.
4. Los usuarios identifiquen la comisión y el cuatrimestre de cada material sin abrirlo.
5. Ningún usuario de prueba necesite recurrir a WhatsApp para completar la búsqueda.

## Alcance del MVP

El MVP incluye únicamente lo necesario para poner a prueba la hipótesis de valor.

### Cambios de alcance en la versión 4

| Cambio | Origen |
|---|---|
| Corregir la carga: que el mensaje de formato no admitido diga qué formatos sí se aceptan y se vea junto al archivo, y pasar las etiquetas a una lista cerrada | U1 en T4 y en la pregunta de cierre 4 |
| Hacer que la tarjeta de la materia lleve a sus contenidos | U3 en la pregunta de cierre 2 |
| Distinguir mejor la materia actual de la comisión | U1 en T1 |
| Piloto de varias semanas con una comisión real, sin material precargado | Es el supuesto que quedó sin probar |
| Notificaciones de consultas y respuestas: pasan a evaluarse en la iteración siguiente al piloto | M2 dependió de que U2 y U3 estuvieran en el mismo bloque de prueba |

### Alcance vigente

| Incluido                                                                                            | Propósito                                                              |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Registro con correo institucional y asociación a materias y comisiones de prueba                    | Ubicar al estudiante dentro de sus cursadas.                           |
| Filtrado por comisión y cuatrimestre, aplicado inicialmente según la cursada seleccionada           | Reducir el esfuerzo de búsqueda y evitar confusiones entre recursos.   |
| Apartados y etiquetas por tipo de material                                                          | Distinguir parciales, finales, apuntes, bibliografía y otros recursos. |
| Listado y detalle de materiales, con visualización o acceso y opción de descarga cuando corresponda | Permitir que el estudiante encuentre y utilice un recurso.             |
| Carga de materiales con datos de cursada y contexto                                                 | Comprobar si los estudiantes aportan contenido útil para otros.        |
| Canal de consultas por comisión, con publicación y respuesta de mensajes                            | Facilitar respuestas entre estudiantes sin contacto previo.            |

### Fuera del MVP

| Excluido                                      | Motivo                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| Integración real con los sistemas de la UNLaM | No es necesaria para esta prueba, ya que no se prueba la integración.    |
| Reseñas de materias y comisiones              | Ningún criterio de validación de esta primera prueba las mide.           |
| Búsqueda de compañeros de grupo               | El relevamiento no la sostuvo como problema prioritario.                 |
| Notificaciones                                | Las tareas centrales se validaron; se evalúan después del piloto (ver cambios de alcance). |
| Aplicación móvil                              | La evidencia disponible sostiene la prioridad de escritorio.             |
| Uso sin conexión                              | No es necesario para el contexto relevado ni para probar la hipótesis.   |

## Qué se construye y qué se simula

| Elemento                            | Se construye                                                                                                    | Se simula o resuelve manualmente                                                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registro y datos de cursada         | Registro con correo institucional y presentación de materias y comisiones asociadas.                            | La condición de alumno regular y la inscripción a materias y comisiones se representan con datos de prueba. No se consulta el sistema de la UNLaM. |
| Filtros por comisión y cuatrimestre | Filtrado funcional de los recursos según la cursada seleccionada.                                               | No se simula su funcionamiento.                                                                                                                    |
| Tipos de material                   | Clasificación, etiquetas y navegación por tipo de recurso.                                                      | No se simula su funcionamiento.                                                                                                                    |
| Consulta de recursos                | Listado con contexto visible, detalle y acceso al material.                                                     | El equipo prepara previamente los recursos iniciales.                                                                                              |
| Carga de material                   | Formulario funcional con materia, comisión, cuatrimestre, tipo de material, etiquetas de una lista cerrada y campos de contexto o advertencias. | En la prueba del TP5 el equipo cargó el material inicial. En el piloto de la v4 no hay carga inicial: el material lo suben los estudiantes. |
| Canal de consultas                  | Publicación y respuesta de mensajes entre usuarios.                                                             | Los canales por comisión se crean manualmente. Las respuestas que validan la hipótesis deben provenir de otro estudiante de la comisión.           |

El registro con correo institucional no se considera evidencia suficiente de regularidad ni de inscripción. La prueba evalúa la experiencia con cursadas simuladas, no la eficacia de la verificación institucional.

## Flujo principal del MVP

**Objetivo:** encontrar y acceder a un recurso de la propia comisión sin recurrir a otra persona ni a otra plataforma.

**Actor:** estudiante de Ingeniería en Informática que busca material.

**Precondición:** existe material previamente cargado para una de las materias y comisiones asociadas al estudiante.

1. El estudiante entra a UNLaMigos y se registra con su correo institucional.
2. Visualiza las materias que cursa y la comisión y el cuatrimestre asociados a cada una, utilizando los datos preparados para la prueba.
3. Selecciona una materia. El sistema aplica el contexto de su comisión y cuatrimestre y muestra los tipos de material disponibles.
4. Selecciona un tipo de material, como parciales, finales, apuntes o bibliografía.
5. Revisa el listado de recursos. Cada elemento muestra materia, comisión, cuatrimestre y el contexto disponible, sin necesidad de abrir el archivo.
6. Selecciona un recurso y consulta su detalle, incluidas las aclaraciones o advertencias de quien lo publicó.
7. Visualiza o accede al material y, cuando corresponde, lo descarga.

**Postcondición:** el estudiante encuentra y accede a un recurso correspondiente a su cursada sin asistencia ni búsqueda externa.

Si no hay resultados para la selección, la interfaz debe indicarlo y permitir revisar los filtros. No debe mostrar material de otra comisión como si correspondiera a la propia.

Los flujos complementarios del MVP son publicar una consulta, responder a otro estudiante y cargar material con su contexto.

## Atributos de usabilidad priorizados

### 1. Eficiencia

El estudiante debe encontrar material en pocos pasos y aprovechar el tiempo disponible entre el trabajo y la cursada.

**Evidencia:** U3 señaló que “a veces pasás más tiempo buscándolo que leyéndolo”. U2 estudia después de trabajar y antes de cursar.

**Decisiones de diseño:** acceso desde las propias materias, filtrado inicial por cursada, clasificación por tipo de material y contexto visible en el listado.

**Evaluación:** observar si encuentra un recurso de la comisión indicada en menos de cinco minutos, sin recurrir a WhatsApp.

### 2. Facilidad de aprendizaje

El estudiante debe comprender el recorrido durante el primer uso, sin explicaciones del moderador ni un tutorial obligatorio.

**Evidencia:** U3 describió dificultades para saber dónde preguntar cuando no pertenece a los grupos. Esto respalda la necesidad de un acceso comprensible sin contactos previos, aunque la facilidad de uso de la interfaz todavía debe comprobarse.

**Decisiones de diseño:** vocabulario habitual de la cursada, filtros visibles y acciones claramente identificadas para consultar, descargar, publicar y responder.

**Evaluación:** observar si completa el flujo principal sin asistencia y registrar dudas, retrocesos y pedidos de ayuda.

### 3. Baja tasa de errores

El estudiante debe poder distinguir materiales de diferentes comisiones y cuatrimestres y comprender sus posibles limitaciones.

**Evidencia:** el relevamiento mostró mezcla de materiales y comentarios de distintas comisiones, junto con dificultades para reconocer su vigencia y contexto.

**Decisiones de diseño:** mostrar comisión y cuatrimestre antes de abrir el recurso, mantener visible el contexto seleccionado y validar los datos de cursada en la carga. La prevención de errores es la estrategia principal para este atributo.

**Evaluación:** registrar selecciones de recursos de una cursada equivocada, errores de clasificación y dificultades para identificar comisión y cuatrimestre.

### Indicador complementario: satisfacción

Se relevará si la experiencia resulta más cómoda y organizada que los canales actuales. Los tres entrevistados declararon interés por una solución centralizada, pero esa intención todavía debe contrastarse con el uso.

La satisfacción se consultará al finalizar las tareas y no reemplazará la observación del desempeño.

## Estado de los supuestos del TP1

| N.º | Supuesto                                                                             | Estado según el TP2                                                                                                       |
| --: | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
|   1 | La dispersión de información molesta y dificulta encontrar lo necesario.             | Confirmado en 2 de 3 entrevistas. Se mantiene como supuesto crítico que el MVP debe contrastar mediante tareas.           |
|   2 | Los estudiantes valoran la verificación para evitar suplantaciones.                  | Los 3 valoraron la verificación, pero por reducir spam, intervenciones externas y desinformación. Se reformula el motivo. |
|   3 | Existe frustración al buscar compañeros de cursada.                                  | Refutado en 2 de 3 entrevistas. Se excluye del MVP.                                                                       |
|   4 | Los estudiantes evitan plataformas oficiales por miedo a la exposición.              | Confirmado con matices en 2 de 3 entrevistas; la exposición se relaciona con los docentes.                                |
|   5 | Los estudiantes avanzados aportan materiales y reseñas sin compensación.             | Confirmado en el único perfil avanzado entrevistado. El MVP evaluará aportes de material; las reseñas quedan fuera.       |
|   6 | Los estudiantes adoptarían una aplicación centralizada.                              | Confirmado declarativamente en 3 de 3 entrevistas. En el TP5 los tres completaron las tareas, pero nadie dijo que lo usaría en lugar de sus canales (no se preguntó). Sigue pendiente. |
|   7 | La Universidad permite aplicaciones externas públicamente relacionadas con la UNLaM. | Sin evidencia. Requiere consulta institucional.                                                                           |
|   8 | La Universidad dispone de interfaces para verificar alumnos y materias.              | Sin evidencia. Requiere consulta técnica.                                                                                 |

## Supuestos pendientes y límites de validación

* **Prioridad de escritorio:** respaldada por los tres casos relevados; requiere una muestra mayor para generalizarla.
* **Aporte sostenido:** que los estudiantes suban material sin que el equipo lo cargue. Es el supuesto más riesgoso: U3 dijo que «todo depende de la cantidad de contenido de la plataforma». En el TP5, U1 y U3 subieron material en T4 sin que se les pidiera, aunque lo de U1 fue un archivo de prueba.
* **Respuesta sin consigna:** que alguien responda una consulta en una semana cualquiera, sin aviso y sin estar en una prueba.
* **Perfil de los participantes:** en la próxima prueba se registra si cada participante cursa con grupo o sin contactos, y se pregunta si usaría la plataforma en lugar de WhatsApp, MIeL o Discord.
* **Contexto y advertencias como incentivo para aportar:** se observará si los participantes publican materiales aprovechando estos campos.
* **Organización como diferencial:** el MVP debe demostrar que permite recuperar contenido con menos esfuerzo que los canales actuales.
* **Notificaciones y recurrencia:** en el TP5 la respuesta entre pares llegó porque los dos participantes estaban en el mismo bloque. Fuera de la sesión nada avisa a quien preguntó ni a quien podría responder; se evalúan después del piloto.
* **Acceso verificado:** la simulación permite probar las tareas, pero no demuestra que el producto pueda controlar el acceso de personas externas.
* **Adopción sostenida:** completar las tareas en una prueba inicial no demuestra que los estudiantes continúen utilizando la plataforma a lo largo del cuatrimestre.

## Arquitectura: del MVP a la visión

**Hoy (MVP).** Es una aplicación web de dos capas: un cliente HTML/JS sin framework y un único proceso Node.js. Ese proceso sirve la interfaz y una API JSON, y guarda todo en una base SQLite y en una carpeta de archivos del mismo disco. La regularidad, la inscripción, el material inicial y los canales los carga el equipo a mano (`seed/datos.json`). El diagrama y los componentes están en `docs/arquitectura/tp6-arquitectura.md`, punto 1.

**Visión.** El producto completo agrega:
* identidad verificada;
* sincronización de cursadas con el sistema académico;
* reseñas de comisiones;
* búsqueda de texto completo;
* moderación;
* notificaciones.

También mueve los datos a una base persistente con respaldo y los archivos a un almacenamiento de objetos. El MVP ya cubre cursadas, materiales, consultas por comisión y métricas de uso, aunque con datos precargados.

**Salto principal.** Pasar de una identidad y unas cursadas simuladas a un acceso verificado contra la UNLaM. El valor del producto depende de que «tu comisión» sea un dato cierto, y esta pieza no depende sólo del equipo.

**Primer paso.** El piloto de la v4 se puede hacer con la identidad todavía simulada, pero no con los aportes guardados en el disco de una sola máquina. Lo primero que cambia de la arquitectura es el almacenamiento de archivos.

**Tecnologías que agregaría la visión:**
* inicio de sesión federado contra el proveedor del correo institucional o, si no existe, verificación por enlace al correo;
* PostgreSQL administrado;
* almacenamiento de objetos compatible con S3.

Node.js se mantiene por familiaridad del equipo.

## Restricciones técnicas del contexto

* **Integración institucional sin confirmar.** No hay evidencia de que la UNLaM permita aplicaciones externas ni de que exponga interfaces para verificar alumnos y materias (supuestos 7 y 8). Hasta tenerla, la identidad se apoya en el correo institucional y la comisión la declara el estudiante.
* **Mantenimiento.** Lo sostiene un equipo de estudiantes que rota. Por eso se prefieren servicios administrados con respaldo automático antes que infraestructura propia o la máquina de un integrante.
* **Contexto de uso.** Se usa sobre todo desde una computadora, en casa y con conexión (TP2). Eso sostiene una aplicación web, sin uso sin conexión ni aplicación nativa.
* **Archivos de los estudiantes.** El material lo aportan los usuarios y no se puede reconstruir. Antes de abrir el acceso fuera de la prueba, el almacenamiento necesita copia de respaldo y control de contenido.

## Riesgo técnico principal

La subida y el almacenamiento de archivos. Es el componente del que depende el piloto: si subir falla o confunde, el contenido no crece. En la prueba del TP5 fue lo único que dio un error. El rechazo del `.sf2` de U1 era correcto, pero U1 salió convencido de que no podía subir un Excel. Además, lo único que subió U1 fue un archivo de prueba, y quedó publicado sin ningún control.

Hoy los archivos viajan en base64 dentro del pedido, se cargan enteros en la memoria del único proceso y se guardan sin copia en el disco del servidor. La justificación está en `docs/arquitectura/tp6-arquitectura.md`, punto 5.
