# Brief de Producto

## Versión 1 — TP1

Esta es la primera versión del brief, por lo que no existen cambios respecto de una versión anterior. Se crea para consolidar las decisiones iniciales del TP1 sobre el segmento, el problema, el producto, sus funcionalidades, integraciones, usuarios y supuestos. Estas definiciones se actualizarán a partir de la evidencia obtenida en los próximos trabajos prácticos.

## Segmento elegido

El segmento elegido es el de **estudiantes regulares y activos de Ingeniería en Informática de la UNLaM**.

Se eligió este segmento porque el equipo forma parte de él, conoce de primera mano sus dinámicas y detectó necesidades propias y de compañeros que actualmente no están cubiertas. Esta cercanía también facilita el acceso a usuarios reales para realizar el relevamiento y las pruebas posteriores.

No existe una cifra oficial disponible sobre el tamaño del segmento. Como estimación inicial, se considera una población de entre 1.500 y 2.500 estudiantes activos en distintas etapas de la carrera. Se distinguen por su afinidad con la tecnología y por utilizar plataformas como Discord y WhatsApp para comunicarse, compartir materiales y buscar recomendaciones sobre materias y comisiones.

## Producto

**Nombre:** UNLaMigos.

UNLaMigos es una aplicación social para estudiantes de Ingeniería en Informática de la UNLaM. Busca resolver la **dispersión de la información y de los puntos de contacto entre estudiantes**.

Actualmente, los materiales, enlaces, opiniones y conversaciones se reparten entre grupos y canales de plataformas como Discord y WhatsApp. Esto dificulta encontrar información sobre una materia o comisión, reduce la confiabilidad de algunas reseñas y no permite comprobar fácilmente que quienes participan sean estudiantes regulares. El producto centraliza y organiza esos recursos e interacciones para los estudiantes activos de la carrera.

## Funcionalidades core

1. Ofrecer canales de contacto entre estudiantes de las mismas materias y comisiones.
2. Permitir compartir y consultar archivos, apuntes, enlaces y otros recursos útiles de las materias.
3. Permitir reseñar y recomendar comisiones de las materias.

Estas funcionalidades son las mínimas sin las cuales el producto no cumpliría su propósito de centralizar la información y facilitar la colaboración entre estudiantes.

## Integraciones previstas

Se prevé una integración con el sistema institucional de la UNLaM para:

- comprobar que una persona sea estudiante regular;
- verificar las materias y comisiones en las que está inscripta;
- habilitar el acceso a espacios relacionados con su cursada.

La factibilidad técnica y la autorización institucional de esta integración todavía deben validarse. En particular, se debe confirmar si la Universidad dispone de servicios de autenticación o interfaces accesibles para aplicaciones externas.

## Grupos de usuarios

- **Estudiantes que buscan información:** quieren encontrar rápidamente materiales, referencias, canales y contactos de las materias y comisiones que cursan.
- **Estudiantes que comparten recursos:** aportan apuntes, resúmenes, enlaces y otros materiales útiles para la comunidad.
- **Estudiantes que buscan compañeros de grupo:** quieren encontrar personas afines con quienes cursar, estudiar o realizar trabajos y reducir las barreras de socialización.

### Usuario primario

El grupo elegido como usuario primario es el de **estudiantes que buscan información**, porque el problema principal identificado es la dispersión y la dificultad para encontrar materiales, contactos y referencias de cursada.

Esta elección **todavía es hipotética** y deberá validarse mediante el relevamiento con usuarios del TP2. Los tres usuarios accesibles identificados por el equipo —estudiantes de segundo, tercer y quinto año— pertenecen inicialmente a este grupo y tienen disponibilidad confirmada para el relevamiento del TP2 y la prueba del MVP del TP5.

## Supuestos

1. **Supuesto crítico:** a los estudiantes les resulta molesta la dispersión de información y comunicaciones entre medios como Discord y WhatsApp, y esto les dificulta encontrar lo que buscan. Si los estudiantes no perciben este problema ni desean una plataforma unificada, el producto pierde su razón de ser.
2. Los estudiantes valoran que se verifique la condición de alumno regular para evitar suplantaciones.
3. Existe un volumen considerable de estudiantes que siente frustración al intentar encontrar compañeros de cursada.
4. Los estudiantes evitan usar plataformas oficiales de la Universidad para socializar por temor a quedar expuestos al equivocarse o hacer consultas básicas.
5. Los estudiantes avanzados o que ya cursaron una materia están dispuestos a dedicar tiempo a subir materiales y escribir reseñas sin recibir una compensación.
6. Los estudiantes prefieren adoptar una aplicación centralizada e independiente antes que continuar interactuando únicamente en las plataformas que ya usan, como Discord y WhatsApp.
7. La Universidad permite que los estudiantes se conecten mediante aplicaciones externas públicamente relacionadas con la UNLaM.
8. La Universidad dispone de medios técnicos o interfaces que permitan a una aplicación externa verificar la condición de alumno regular y las materias cursadas.

Todos estos supuestos deberán validarse con evidencia en los próximos trabajos prácticos. Los supuestos vinculados con las necesidades y conductas de los estudiantes se contrastarán principalmente en el relevamiento del TP2; los relacionados con permisos e integración se verificarán mediante una consulta institucional, la revisión de normativa y el análisis de los servicios técnicos disponibles.
