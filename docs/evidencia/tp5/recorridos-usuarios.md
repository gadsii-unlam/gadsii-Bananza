# TP5 — Análisis de recorridos de usuarios

Los recorridos desarrollan las tareas T1–T4 a partir de los perfiles del TP2 y las funciones del MVP. Las acciones se plantean como escenarios de uso; las métricas M1 y M2 conservan las definiciones de `docs/metricas.md`.

## U1 — Buscar material y comprobar su contexto

**Base del perfil:** estudiante entre segundo y tercer año, recursa Sistemas Operativos, usa la computadora y consulta primero los recursos de la cátedra y después Discord. Fuente: [entrevista U1](../tp2/entrevista_U1.md).

| Tarea | Desarrollo del recorrido | Fricción que permite analizar |
|---|---|---|
| T1 | Ingresa a Sistemas Operativos, comprueba la comisión y el cuatrimestre precargados, elige Parciales, abre un material y revisa su contenido antes de descargarlo. | Encontrar un archivo no alcanza: necesita reconocer que corresponde a su cursada y que su contenido sirve para preparar el examen. |
| T2 | Publica una consulta sobre sincronización en el canal de la comisión, incluyendo el punto del ejercicio que no logra resolver. | El contexto de la comisión facilita ubicar la pregunta, pero la utilidad depende de recibir una respuesta pertinente. |
| T3 | Cambia la comisión para consultar otro parcial, compara su contenido y vuelve a la propia mediante «Restablecer mi cursada». | Puede interpretar un parcial de otra comisión como equivalente; el contexto y la confirmación de descarga deben ayudar a advertir la diferencia. |
| T4 | Explora apuntes de sincronización y alterna entre Materiales y Consultas. | La conservación de filtros evita repetir la búsqueda, aunque puede dejar visible una comisión distinta de la propia. |

**Aprendizaje posible:** priorizar la identificación de la cursada y el acceso al contenido. La comparación con Discord debe considerar la disponibilidad y calidad del material, además de la cantidad de pasos.

## U2 — Conseguir un parcial sin depender de un contacto

**Base del perfil:** estudiante de segundo y tercer año, usa principalmente computadora y recurre a WhatsApp, MIeL y Discord. Identifica dificultades para saber dónde buscar o a quién pedirle; guarda sus resúmenes en local. Fuente: [entrevista U2](../tp2/entrevista_U2.md).

| Tarea | Desarrollo del recorrido | Fricción que permite analizar |
|---|---|---|
| T1 | Entra a una materia de su cursada, selecciona Parciales y usa la búsqueda por texto para ubicar el tema. Abre el detalle y descarga el archivo después de comprobar el contexto. | Una búsqueda demasiado específica puede dejar la tabla vacía aunque existan materiales pertinentes con otro título. |
| T2 | Publica una duda sobre un ejercicio y vuelve a Materiales para continuar estudiando. | La ausencia de notificaciones puede dificultar que recuerde volver al canal; en el TP2 ya señaló ese problema en otros medios. |
| T3 | Consulta un recurso de otra comisión y revisa el aviso antes de decidir si descargarlo. | Confirmar una descarga no demuestra por sí solo que haya comprendido la diferencia entre cursadas. |
| T4 | Recorre otras materias y consulta contenido disponible, sin que la tarea le solicite subir archivos. | La facilidad para consumir materiales no implica disposición a aportar los resúmenes que conserva en su computadora. |

**Aprendizaje posible:** distinguir acceso autónomo de participación. La centralización puede reducir la dependencia de contactos, pero el canal necesita respuestas y motivos para regresar.

## U3 — Consultar entre pares y compartir un aporte

**Base del perfil:** estudiante en la etapa final, usa computadora, busca información en WhatsApp y ya comparte resúmenes para ayudar a otros. Prefiere que algunas dudas no queden expuestas a los profesores. Fuente: [entrevista U3](../tp2/entrevista_U3.md).

| Tarea | Desarrollo del recorrido | Fricción que permite analizar |
|---|---|---|
| T1 | Abre una materia con material disponible, filtra por tipo y revisa la comisión antes de abrir el recurso. | Para un perfil avanzado, la cobertura del catálogo es decisiva: completar el flujo en una materia no asegura utilidad para las restantes. |
| T2 | Formula una pregunta concreta en Consultas y revisa los hilos existentes para evitar repetirla. | Debe comprender quién puede leer y responder; la verificación institucional por sí sola no explica la composición del canal. |
| T3 | Compara un recurso de otra cursada con el contexto de la propia y decide qué partes le resultan aplicables. | El aviso de contexto ayuda a decidir, pero no garantiza equivalencia de programas o criterios de evaluación. |
| T4 | Explora «Subir material», selecciona un resumen propio y completa materia, comisión, cuatrimestre y tipo antes de publicarlo. | La carga de contexto puede resultar más trabajosa que enviar un archivo por WhatsApp; su beneficio debe ser reconocible. |

**Aprendizaje posible:** facilitar el aporte de quienes ya comparten materiales, conservando contexto suficiente para que otros evalúen su pertinencia. U3 no representa por sí sola el comportamiento de todos los estudiantes.

## Interacción en Consultas

Un hilo de Sistemas Operativos puede desarrollarse de la siguiente manera:

1. Una persona publica una duda sobre si un semáforo debe inicializarse en cero o en uno e incluye el fragmento del ejercicio.
2. Otra persona de la misma comisión explica que el valor depende de si se representa exclusión mutua o espera de una señal, y relaciona la explicación con el ejercicio.
3. Quien preguntó contrasta la explicación con su resolución y utiliza «Me sirvió» si le permite avanzar.
4. Una tercera persona agrega una variante del ejercicio o una referencia al apunte de sincronización.

La secuencia permite revisar el flujo de consulta, respuesta y valoración. Para computar M2 hacen falta, además, el plazo efectivo de respuesta y la comprobación de que las personas no tenían contacto previo. El ejemplo no aporta esas mediciones.

## Lectura para el informe

| Dimensión | Qué permite analizar este desarrollo | Qué queda sin medir |
|---|---|---|
| Usabilidad | Pasos del flujo, conservación de filtros, contexto de cursada y confirmaciones. | Tiempos, errores efectivos y pedidos de ayuda. |
| Valor de materiales | Correspondencia entre las necesidades del TP2 y el acceso organizado por cursada. | Disponibilidad suficiente y preferencia efectiva frente a los canales actuales. |
| Valor de consultas | Publicación, respuesta y marca de utilidad como secuencia de interacción. | Participación efectiva, ausencia de contacto previo y respuesta dentro de 48 h. |
| Participación | Diferencias entre un perfil que consume y otro que ya comparte materiales. | Retorno, aportes espontáneos y continuidad del uso. |

**Decisión de desarrollo propuesta:** conservar el foco en materiales por cursada y mantener Consultas como función a evaluar. Los recorridos permiten priorizar revisiones de interfaz; el resultado de M1 y M2 y la validación de la hipótesis permanecen pendientes de medición.
