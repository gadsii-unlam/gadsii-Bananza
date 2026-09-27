# **EVALUACIÓN HEURÍSTICA DE USABILIDAD (IA)**

*Evaluación generada con IA (Claude) sobre el wireframe del equipo Sumate.*

## **Información general del informe**

| Fecha (DD/MM/AAAA) | 22/09/2026 |
| :---- | :---- |
| Producto estudiado | ¿Dónde queda? (MVP del TP3, equipo Sumate) |
| Grupo que evalúa | Bananza (evaluación de la IA) |

## **Checklist**

Escala de puntuación: 5 cumple sin observaciones, 4 tiene algo cosmético, 3 tiene un hallazgo menor, 2 tiene un hallazgo mayor, 1 tiene varios mayores, 0 tiene algo catastrófico.

| ID | Heurística | Total | Parcial | Nulo | N/A | Cantidad de hallazgos | Puntuación (0 a 5\) | Observaciones |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| H1 | Visibilidad del estado del sistema |  | X |  |  | 2 | 3 | Los cierres y el tramo al aire libre se ven bien en el mapa. Falta mostrar cuándo la app está calculando y avisar en la lista qué destinos no tienen acceso. |
| H2 | Correspondencia entre el sistema y el mundo real |  | X |  |  | 1 | 2 | El mensaje de P6 está escrito en términos del campus, lo que está bien. La ruta no refleja los pisos. "Dirección de Alumnos" no explica para qué sirve y "Finalizar viaje" suena a app de autos. Las dos cosas son menores. |
| H3 | Libertad y control del usuario |  | X |  |  | 1 | 3 | Volver no borra lo cargado y la ruta techada se puede cambiar por la corta con un toque. Falla el caso de cambiar el origen sin tener destino. |
| H4 | Prevención de errores |  | X |  |  | 1 | 2 | Como no hay botón de calcular, no se puede pedir una ruta con datos incompletos, y los cierres se excluyen solos. El riesgo está en el origen cargado automáticamente. |
| H5 | Coherencia y estándares |  | X |  |  | 1 | 4 | Origen y destino usan el mismo componente y P3 y P4 se comportan igual. Solo hay inconsistencias de nombres. |
| H6 | Reconocimiento en vez de recordar |  | X |  |  | 1 | 2 | El destino se puede elegir de una lista sin escribir. El origen, en cambio, exige saber cómo se llama el lugar donde uno está. |
| H7 | Flexibilidad y eficiencia de uso | X |  |  |  | 0 | 5 | Con dos toques ya se ve la ruta, sin pantallas intermedias. No hacen falta atajos avanzados para alguien que entra pocas veces. |
| H8 | Diseño estético y minimalista | X |  |  |  | 0 | 5 | El resultado muestra solo el tiempo, la distancia y la hora de llegada. El mapa no compite con otra información. |
| H9 | Reconocimiento, diagnóstico y recuperación ante errores |  | X |  |  | 1 | 2 | P6 está bien resuelta, porque explica el motivo y siempre ofrece una acción siguiente. Falta el error de conexión. |
| H10 | Ayuda y documentación |  | X |  |  | 1 | 3 | La interfaz se explica bastante sola. El problema es que el primer uso no está diseñado. |

## 

## **Matriz de hallazgos**

| \# | Heurística involucrada | Detalle | Severidad (1 a 4\) | Mejora sugerida |
| :---- | :---- | :---- | :---- | :---- |
| 1 | H6 Reconocimiento en vez de recordar | En P5, para cambiar el origen hay que elegir un nombre de una lista que solo trae accesos y lugares recientes. Un ingresante que está perdido no sabe cómo se llama el lugar donde está parado, y tampoco puede tocar el mapa para decir "estoy acá". | 3 | Permitir elegir el origen tocando el mapa y sumar referencias visibles (comedor, biblioteca, playón) como puntos de partida. |
| 2 | H4 Prevención de errores | En P1 el origen viene cargado con "el último origen usado". Un alumno que va de un aula a otra casi nunca está donde estuvo la última vez, así que la ruta sale de un lugar equivocado y nada le avisa. | 3 | No cargar el origen solo o, si se carga, preguntar "¿Seguís en Entrada principal?" antes de calcular. |
| 3 | H2 Correspondencia entre el sistema y el mundo real | En P3 y P4 la ruta termina en el marcador del Edificio B. No dice en qué piso está el Aula 4, por qué escalera se sube ni por qué entrada del edificio conviene entrar. El ingresante llega al edificio pero no al aula, y ahí tiene que preguntar. | 3 | Agregar al pie de la ruta el piso, la escalera o el ascensor y la entrada que hay que usar. |
| 4 | H9 Reconocimiento, diagnóstico y recuperación ante errores | No hay ninguna pantalla para cuando se corta la señal o el servicio de clima no responde al pedir la ruta. Los cinco usuarios del TP2 tienen señal irregular, así que esto no es un caso raro. | 3 | Diseñar un estado "Sin conexión" con un botón para reintentar y mostrar el mapa del campus sin ruta, que ya sirve para orientarse. |
| 5 | H1 Visibilidad del estado del sistema | Entre que se elige el destino en P2 y aparece la ruta en P3 o P4 no hay ningún indicador de que la app está calculando. Con la señal lenta, el usuario no sabe si tocó bien y vuelve a tocar. | 2 | Mostrar un estado "Buscando el camino..." sobre el mapa mientras se calcula. |
| 6 | H1 Visibilidad del estado del sistema | En P2 el "Comedor universitario" muestra "-" donde los demás destinos muestran los minutos. El usuario recién se entera de que no hay camino cuando lo toca y cae en P6. | 2 | Reemplazar el "-" por "Sin acceso ahora" en la misma fila de la lista. |
| 7 | H10 Ayuda y documentación | Según las notas del equipo, la lista de "Últimos destinos" de P1 reemplaza a la bienvenida y sirve como ejemplo. En el primer uso, que es el caso del usuario primario, esa lista está vacía y ese estado no está diseñado. | 2 | Diseñar el P1 de primer uso con destinos de ejemplo o una línea que explique qué hacer: "Elegí a dónde vas y te marcamos el camino". |
| 8 | H3 Libertad y control del usuario | Si en P1 se toca el origen antes de elegir un destino, al volver o al elegir un origen se abre una ruta al Aula 4, que el usuario nunca pidió. Además, mientras se está en P5 el panel deja de mostrar el destino ya elegido. La tabla de navegación dice "vuelve al estado anterior", pero el flujo no hace eso. | 2 | Definir que, sin destino elegido, P5 vuelve a P1, y mantener el destino visible en el panel mientras se cambia el origen. |
| 9 | H5 Coherencia y estándares | La lista dice "Biblioteca, Edificio C", pero en el mapa la Biblioteca y el Edificio C son dos bloques distintos. Además se mezclan "ruta" y "camino" y "techado" y "más corto" entre el aviso de clima y el selector. | 1 | Unificar los nombres de los lugares entre la lista y el mapa, y usar siempre el mismo término. |
| 10 |  |  |  |  |

## 

## **Conclusiones / Recomendaciones generales**

**Atributos priorizados por el equipo evaluado.**

> * **Eficiencia:** se cumple bien. Con dos toques se ve la ruta y no hay pantallas de más.  
> * **Tasa de errores:** se cumple a medias. Los cierres se evitan, pero el origen cargado solo y la falta de señal pueden hacer que el usuario salga mal o se quede sin ruta.  
> * **Facilidad de aprendizaje:** es el atributo más flojo. El primer uso no está diseñado y elegir el origen exige conocer el campus, que es justo lo que al ingresante le falta.

**Hallazgos que traban la hipótesis** (llegar en menos de 5 minutos sin preguntar): los hallazgos 1, 2, 3 y 4\. Con cualquiera de ellos, el usuario sale desde el lugar equivocado, llega al edificio pero no al aula, o se queda sin ruta por la señal.  
**Falsos positivos descartados y por qué.**

> * **No hay GPS ni navegación paso a paso:** el brief dice explícitamente que no se usa GPS.  
> * **No hay panel de administración ni API real de clima:** quedaron fuera del alcance en el brief v3.  
> * **No hay favoritos ni atajos:** el usuario entra pocas veces y va a destinos distintos, y los recientes ya alcanzan.  
> * **No se pide confirmación al cambiar de ruta:** el cambio se deshace con un toque, así que confirmar solo agregaría un paso.  
> * **No hay botón "Calcular" aunque el brief lo menciona:** sacarlo mejora la eficiencia y no permite pedir una ruta con datos incompletos.  
> * **El control de "Clima simulado" de arriba:** es del prototipo, no de la interfaz.