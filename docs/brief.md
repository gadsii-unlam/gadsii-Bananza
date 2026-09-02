# Brief de Producto

## Versión 2 — TP2

Esta versión incorpora los resultados del relevamiento con tres usuarios reales (U1, U2 y U3) realizado mediante entrevistas semiestructuradas en la semana del 25/08. Respecto de la versión 1 cambia lo siguiente:

- **El perfil de usuario hipotético se reemplaza por el perfil real** construido a partir de las entrevistas.
- **Se incorporan las necesidades, los problemas y el contexto de uso relevados**, que en la versión 1 no existían.
- **Se agrega la hipótesis de valor**, que va a determinar qué se construye en el TP3.
- **Cada supuesto de la versión 1 pasa a tener un estado**: cinco se confirmaron (tres de ellos con el motivo o el alcance corregidos), uno se refutó y dos quedaron sin evidencia por estar fuera del alcance de la técnica.
- **Se amplía el alcance del usuario primario**: en la versión 1 se daba a entender que el problema pesaba más en las primeras etapas de la carrera; la evidencia muestra que abarca toda la carrera.
- **Se corrige la lectura sobre la socialización**: la frustración al buscar compañeros de cursada no se confirmó, por lo que ese grupo de usuarios deja de ser una prioridad del producto.

El segmento, el producto, las funcionalidades core y las integraciones previstas se mantienen porque el relevamiento no aportó evidencia en contra. Las secciones que no cambiaron se conservan tal como estaban en la versión 1.

## Segmento elegido

El segmento elegido es el de **estudiantes regulares y activos de Ingeniería en Informática de la UNLaM**.

Se eligió este segmento porque el equipo forma parte de él, conoce de primera mano sus dinámicas y detectó necesidades propias y de compañeros que actualmente no están cubiertas. Esta cercanía también facilita el acceso a usuarios reales para realizar el relevamiento y las pruebas posteriores.

No existe una cifra oficial disponible sobre el tamaño del segmento. Como estimación inicial, se considera una población de entre 1.500 y 2.500 estudiantes activos en distintas etapas de la carrera. Se distinguen por su afinidad con la tecnología y por utilizar plataformas como Discord y WhatsApp para comunicarse, compartir materiales y buscar recomendaciones sobre materias y comisiones.

## Producto

**Nombre:** UNLaMigos.

UNLaMigos es una aplicación social para estudiantes de Ingeniería en Informática de la UNLaM. Busca resolver la **dispersión de la información y de los puntos de contacto entre estudiantes**.

Actualmente, los materiales, enlaces, opiniones y conversaciones se reparten entre grupos y canales de plataformas como Discord y WhatsApp. El relevamiento del TP2 confirmó que esto hace que el acceso a la información dependa de a quién se conoce y de estar en el grupo correcto, y que aun cuando esa red existe el material se pierde en el desorden de un chat. El producto centraliza y organiza esos recursos e interacciones para los estudiantes activos de la carrera, segmentándolos por materia, comisión y cuatrimestre.

## Funcionalidades core

1. Ofrecer canales de contacto entre estudiantes de las mismas materias y comisiones.
2. Permitir compartir y consultar archivos, apuntes, enlaces y otros recursos útiles de las materias, con el contexto declarado de cada aporte (cursada, año, docente, tema y unidad dudosa).
3. Permitir reseñar y recomendar comisiones de las materias.

Estas funcionalidades son las mínimas sin las cuales el producto no cumpliría su propósito de centralizar la información y facilitar la colaboración entre estudiantes. El relevamiento agregó dos condiciones que atraviesan a las tres: la segmentación por comisión y cuatrimestre (N4) y las notificaciones (N5), que U2 señaló como el motivo por el que descarta MIeL y el correo.

## Integraciones previstas

Se prevé una integración con el sistema institucional de la UNLaM para:

- comprobar que una persona sea estudiante regular;
- verificar las materias y comisiones en las que está inscripta;
- habilitar el acceso a espacios relacionados con su cursada.

La factibilidad técnica y la autorización institucional de esta integración todavía deben validarse. El relevamiento del TP2 no aportó evidencia sobre este punto (supuestos 7 y 8), por lo que sigue pendiente la consulta institucional. U1 agregó un problema previo a considerar: un alumno verificado podría ser cualquier persona de la facultad, incluso de otra carrera.

## Perfil del usuario real

El usuario relevado es un estudiante activo de Ingeniería en Informática que cursa entre cinco y seis materias a la vez. Dos de los tres trabajan, y su tiempo de estudio es lo que queda entre el trabajo y la cursada.

Los tres estudian desde la PC, en su casa. Ninguno mencionó el celular como dispositivo principal. Para conseguir material usan WhatsApp, MIeL, Discord y lo que sube la cátedra, en un orden que varía según el usuario: U2 y U3 van primero a WhatsApp; U1 va primero a la cátedra y después al Discord de la carrera, que usa como repositorio.

Frente al contenido, dos de tres generan además de consumir: U1 comparte apuntes solo con conocidos por miedo a difundir errores; U3, en años finales, sube resúmenes a grupos abiertos y deja reseñas. U2 no comparte resúmenes.

| | U1 | U2 | U3 |
|---|---|---|---|
| Etapa | 2.º a 3.er año | 2.º a 3.er año | 4.º y 5.º año |
| Cursada | Presencial | Virtual | No relevado |
| Dispositivo y lugar | PC, casa | PC, casa | PC, casa |
| Primer recurso | Cátedra, después Discord | WhatsApp, MIeL, Discord | WhatsApp |
| Aporta material | Solo a conocidos | No | Sí |
| Percibe el problema | No | Sí | Sí |

Dos de los tres perciben el problema. La excepción (U1) no se explica por la etapa ni por la integración social, sino por usar el Discord como repositorio, un recurso que los otros dos conocen pero no consideran suficiente.

## Necesidades relevadas

1. Llegar al material sin depender de estar en el grupo correcto ni de saber a quién pedirle (U2, U3).
2. Material ordenado y recuperable, no acumulado en un chat (U2, U3).
3. Poder declarar el contexto y las limitaciones de lo que uno aporta (U1).
4. Información atribuible a la comisión y el cuatrimestre propios (U1, U3).
5. Notificaciones (U2).
6. Contenidos y bibliografía que las cátedras no publican a tiempo (U1, U3).
7. Un espacio sin ruido externo a la carrera (U2, U3).
8. Poder preguntar sin que lo vea un docente (U3).

## Problemas y frustraciones relevados

- Recuperar el material cuesta más que el material: "a veces pasás más tiempo buscándolo que leyéndolo" (U3).
- El acceso depende de estar en el lugar correcto: no saber dónde preguntar, no estar en los grupos, no tener un lugar centralizado (U3); tener que "saber bien cómo buscar y a quién pedirle" (U2).
- No siempre hay grupos por comisión, y en los grupos generales participa gente de otras comisiones que responde con fechas o docentes que no aplican (U1, U3).
- Ruido externo: cuentas ajenas a la carrera que envían spam y enlaces raros (U2; U3 conoce casos).
- Algunas consultas se evitan en los espacios donde leen los docentes (U3).
- El miedo a difundir errores frena el aporte de apuntes en espacios abiertos (U1).
- La coordinación de grupos de TP genera fricción menor, pero encontrarlos no (U1, U3).

## Contexto de uso

Los tres usan la PC y buscan desde la casa, con conectividad. Los momentos son ventanas cortas alrededor de la jornada laboral y la cursada: U1 entre las 16 y las 19 y después de clase; U2 a la tarde, después de trabajar y antes de cursar; U3 antes de cursar si hay contenidos subidos, y si no, durante o después de la clase.

Con tres de tres coincidiendo en dispositivo y lugar, el relevamiento no da razones para priorizar una app móvil ni el uso offline: sostiene una interfaz de escritorio pensada para convivir con otras ventanas. Si buscan solos o acompañados y con qué urgencia no fue relevado y queda como punto a verificar.

## Grupos de usuarios

- **Estudiantes que buscan información:** quieren encontrar rápidamente materiales, referencias, canales y contactos de las materias y comisiones que cursan.
- **Estudiantes que comparten recursos:** aportan apuntes, resúmenes, enlaces y otros materiales útiles para la comunidad. El relevamiento muestra que este grupo se superpone con el anterior y se concentra en años avanzados (U3 pertenece a ambos).
- **Estudiantes que buscan compañeros de grupo:** en la versión 1 se planteaba como un grupo con una frustración propia. El relevamiento no la confirmó (supuesto 3 refutado), por lo que deja de ser una prioridad del producto.

### Usuario primario

El usuario primario sigue siendo el de **estudiantes que buscan información**. Dos de los tres relevados manifiestan el problema y la evidencia más fuerte vino de la usuaria más avanzada, así que se corrige el alcance: el usuario primario abarca toda la carrera, no solo sus primeras etapas.

Los estudiantes que comparten recursos no reemplazan al usuario primario, pero el relevamiento indica que son a quienes hay que convocar primero para sembrar la plataforma y reducir el riesgo de arranque en frío.

## Hipótesis de valor

**Creemos que** los estudiantes de Ingeniería en Informática de la UNLaM que buscan material y referencias de cursada, a lo largo de toda la carrera y no solo en sus etapas iniciales,

**tienen el problema de** que el acceso a la información depende de a quién conocen: encontrar un apunte, un modelo de parcial o una opinión sobre una comisión exige estar en los grupos correctos y saber a quién pedírselo, y aun cuando esa red existe el intercambio se pierde en el desorden de un chat, con un costo de búsqueda que llega a superar el valor de lo buscado.

**Nuestra solución es** UNLaMigos, un espacio de acceso verificado donde el material está segmentado por materia, comisión y cuatrimestre, cada aporte se publica con su contexto declarado, cada estudiante puede consultar y contactar a pares de su misma cursada sin conocerlos de antes, las consultas ocurren en un canal separado de los espacios donde leen los docentes y las novedades llegan por notificación.

**Sabremos que estamos en lo correcto cuando**, en la prueba del MVP:

1. Un estudiante que no participa de los grupos de la materia encuentre solo un modelo de parcial de una comisión determinada en menos de 5 minutos y sin preguntarle a nadie.
2. Un estudiante obtenga respuesta útil a una consulta de cursada de parte de otro estudiante de su misma comisión con quien no tenía contacto previo.
3. Al menos un usuario de perfil avanzado suba material propio con el formulario de contexto sin que se lo pidamos.
4. Los usuarios identifiquen a qué comisión y cuatrimestre corresponde cada material sin abrirlo.
5. Ningún usuario de prueba necesite recurrir a WhatsApp para completar la búsqueda.

## Estado de los supuestos

| # | Supuesto de la versión 1 | Estado | Observación |
|---|---|---|---|
| 1 | **Crítico:** les molesta la dispersión y les dificulta encontrar lo que buscan | Confirmado (2 de 3) | La evidencia más fuerte vino de la usuaria más avanzada |
| 2 | Valoran la verificación de alumno regular para evitar suplantaciones | Confirmado (3 de 3), motivo corregido | Nadie mencionó suplantación; el motivo es evitar spam y desinformación |
| 3 | Hay frustración considerable al buscar compañeros de cursada | Refutado | 2 de 3 lo resuelven sin fricción; la dificultad es que el grupo funcione, no encontrarlo |
| 4 | Evitan las plataformas oficiales por temor a quedar expuestos | Confirmado (2 de 3), mecanismo corregido | No temen a sus pares sino a que el docente vea una consulta sobre algo ya explicado |
| 5 | Los avanzados aportan material y reseñas sin compensación | Confirmado (1 de 1) | Motivación altruista y de preservar el propio esfuerzo |
| 6 | Prefieren una app centralizada a Discord y WhatsApp | Confirmado (3 de 3), en el plano declarativo | Las respuestas siguen a una pregunta que describe el producto |
| 7 | La Universidad no tiene reparos con aplicaciones externas | Sin evidencia | Fuera del alcance de la técnica; pendiente consulta institucional |
| 8 | La Universidad tiene medios técnicos para verificar alumno regular | Sin evidencia | Ídem. Se agrega el problema de que un verificado puede ser de otra carrera |

### Supuestos nuevos que surgieron del relevamiento

9. La antigüedad en la carrera no resuelve el problema de la desorganización.
10. No siempre existen grupos por comisión; es una carencia estructural del ecosistema actual.
11. Separar lo académico de lo personal es un beneficio para el usuario, no un costo de adopción.
12. Las notificaciones deciden la adopción frente a los canales oficiales.
13. La desconfianza sobre el contenido comunitario opera también desde quien aporta: se frena por miedo a ser la fuente del error.
14. Sobrestimamos el peso de Discord: dos de tres van primero a WhatsApp.

Los supuestos 9 a 14 se tomarán como insumo para el diseño del TP3 y se contrastarán en la prueba del MVP. Los supuestos 7 y 8 se verificarán mediante consulta institucional, revisión de normativa y análisis de los servicios técnicos disponibles.

---

## Versión 1 — TP1

Esta es la primera versión del brief, por lo que no existen cambios respecto de una versión anterior. Se crea para consolidar las decisiones iniciales del TP1 sobre el segmento, el problema, el producto, sus funcionalidades, integraciones, usuarios y supuestos. Estas definiciones se actualizarán a partir de la evidencia obtenida en los próximos trabajos prácticos.

*(El contenido íntegro de la versión 1 queda disponible en el historial de commits del repositorio.)*
