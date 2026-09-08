# Brief de Producto — Versión 3

Respecto de la versión 2, se delimitó el alcance del MVP para validar la búsqueda de materiales y el intercambio entre estudiantes de una misma cursada sin depender de contactos previos. Se definió qué funcionalidades se construyen y qué aspectos se simulan o resuelven manualmente, se estableció el flujo principal de búsqueda y se priorizaron eficiencia, facilidad de aprendizaje y baja tasa de errores. Las reseñas, las notificaciones y la integración real con los sistemas de la UNLaM quedan fuera de esta primera versión. Se mantienen el segmento, el usuario primario y los hallazgos del TP2 como fundamento de estas decisiones.

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

## Hipótesis de valor del MVP

**Creemos que** un estudiante de Ingeniería en Informática de la UNLaM que cursa sin grupos ni contactos tiene dificultades para conseguir materiales y resolver consultas porque la información está dispersa y su acceso depende de conocer los canales o las personas adecuadas.

**Nuestra solución es** UNLaMigos, un espacio que lo vincula con materiales y estudiantes por materia, comisión y cuatrimestre, permite reconocer el contexto de los recursos y ofrece un canal de consultas entre pares.

**Sabremos que estamos en lo correcto cuando, durante la prueba del MVP:**

1. Un estudiante que no participa de los grupos de una materia encuentre por sí solo un recurso de una comisión determinada en menos de cinco minutos.
2. Un estudiante obtenga una respuesta útil de otro estudiante de su comisión con quien no tenía contacto previo.
3. Al menos un usuario avanzado suba material propio junto con su contexto, sin que el equipo le solicite ese aporte concreto.
4. Los usuarios identifiquen la comisión y el cuatrimestre de cada material sin abrirlo.
5. Ningún usuario de prueba necesite recurrir a WhatsApp para completar la búsqueda.

## Alcance del MVP

El MVP incluye únicamente lo necesario para poner a prueba la hipótesis de valor.

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
| Notificaciones                                | Se posterga su evaluación hasta después de validar las tareas centrales. |
| Aplicación móvil                              | La evidencia disponible sostiene la prioridad de escritorio.             |
| Uso sin conexión                              | No es necesario para el contexto relevado ni para probar la hipótesis.   |

## Qué se construye y qué se simula

| Elemento                            | Se construye                                                                                                    | Se simula o resuelve manualmente                                                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registro y datos de cursada         | Registro con correo institucional y presentación de materias y comisiones asociadas.                            | La condición de alumno regular y la inscripción a materias y comisiones se representan con datos de prueba. No se consulta el sistema de la UNLaM. |
| Filtros por comisión y cuatrimestre | Filtrado funcional de los recursos según la cursada seleccionada.                                               | No se simula su funcionamiento.                                                                                                                    |
| Tipos de material                   | Clasificación, etiquetas y navegación por tipo de recurso.                                                      | No se simula su funcionamiento.                                                                                                                    |
| Consulta de recursos                | Listado con contexto visible, detalle y acceso al material.                                                     | El equipo prepara previamente los recursos iniciales.                                                                                              |
| Carga de material                   | Formulario funcional con materia, comisión, cuatrimestre, tipo de material y campos de contexto o advertencias. | El equipo realiza la carga inicial antes de la prueba. Los aportes de los participantes se registran por separado para evaluar el criterio 3.      |
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
|   6 | Los estudiantes adoptarían una aplicación centralizada.                              | Confirmado declarativamente en 3 de 3 entrevistas. Pendiente de validación mediante uso.                                  |
|   7 | La Universidad permite aplicaciones externas públicamente relacionadas con la UNLaM. | Sin evidencia. Requiere consulta institucional.                                                                           |
|   8 | La Universidad dispone de interfaces para verificar alumnos y materias.              | Sin evidencia. Requiere consulta técnica.                                                                                 |

## Supuestos pendientes y límites de validación

* **Prioridad de escritorio:** respaldada por los tres casos relevados; requiere una muestra mayor para generalizarla.
* **Contexto y advertencias como incentivo para aportar:** se observará si los participantes publican materiales aprovechando estos campos.
* **Organización como diferencial:** el MVP debe demostrar que permite recuperar contenido con menos esfuerzo que los canales actuales.
* **Notificaciones y recurrencia:** su impacto no se valida en esta versión porque las notificaciones quedan fuera del alcance.
* **Acceso verificado:** la simulación permite probar las tareas, pero no demuestra que el producto pueda controlar el acceso de personas externas.
* **Adopción sostenida:** completar las tareas en una prueba inicial no demuestra que los estudiantes continúen utilizando la plataforma a lo largo del cuatrimestre.
