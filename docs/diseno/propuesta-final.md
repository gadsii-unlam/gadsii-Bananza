# Propuesta Final de Diseño - Interacción del MVP

Este documento consolida la elección de la alternativa de diseño seleccionada para el flujo principal del MVP, su respectiva fundamentación y las anotaciones de diseño correspondientes a la solución adoptada.

---

## 1. Comparativa de alternativas de diseño exploradas

### Alternativa A: Acceso directo con filtros y tabla
* **Atributo que privilegia:** Eficiencia.
* **Qué gana:** Permite identificar rápido el tipo de material, abrir recursos y consultar su detalle dentro de la misma pantalla. Evita repeticiones y cambios continuos de ventana.
* **Qué resigna:** Brinda menos acompañamiento explícito durante el primer uso. Además, la descarga directa desde el listado puede provocar que el alumno pase por alto las advertencias del archivo.
* **Hallazgo del TP2 que la sustenta:** U3 afirmó que *"a veces pasás más tiempo buscándolo que leyéndolo"*. Mantener todo en una sola pantalla busca reducir el esfuerzo y asegurar que el usuario encuentre lo necesario dentro del límite de 5 minutos establecido en el Criterio 1.

### Alternativa B: Búsqueda guiada paso a paso
* **Atributo que privilegia:** Facilidad de aprendizaje.
* **Qué gana:** Presenta una secuencia visible y estructurada en pasos claros (tipo de material -> recurso -> detalle). Cada pantalla concentra una sola decisión puntual.
* **Qué resigna:** Exige avanzar y retroceder continuamente entre múltiples pantallas, lo que vuelve tediosas las búsquedas habituales o repetitivas.
* **Hallazgo del TP2 que la descarta:** La acotada disponibilidad de tiempo de los estudiantes no hace recomendable sumar pasos de más. U2 explicó que estudia *"cuando tengo un tiempo libre. Puede ser a la tarde, después de trabajar, y antes de cursar también"*.

### Alternativa C: Revisión de contexto previa
* **Atributo que privilegia:** Prevención de errores.
* **Qué gana:** Exhibe los recursos junto a todas sus advertencias y obliga a abrir el detalle de forma obligatoria antes de habilitar la descarga.
* **Qué resigna:** Al imponer una revisión forzosa para cada archivo, penaliza la velocidad y retrasa sensiblemente las consultas rutinarias.
* **Hallazgo del TP2 que la descarta:** Forzar la apertura del detalle en cada recurso consume tiempo valioso aun cuando el archivo coincide con la cursada del alumno y no tiene advertencias. Como señaló U3, resulta *"frustrante tardar tanto en encontrar algún apunte o algo corto"*.---

## 2. Alternativa seleccionada y fundamentación

### Alternativa elegida: **Alternativa A (Eficiencia, con ajustes para reducir errores de contexto)**

#### Justificación
Se seleccionó la **Alternativa A** porque es la que mejor responde al contexto de uso relevado en el TP2: estudiantes que disponen de ventanas de tiempo muy acotadas (entre el trabajo y la cursada) y que sufren una fuerte fricción al buscar materiales dispersos. La interfaz compacta y directa permite:
1. Reducir drásticamente la cantidad de pasos en una tarea recurrente.
2. Cumplir con la métrica de éxito fijada en el **Criterio 1** (encontrar el material de la cursada en menos de 5 minutos).
3. Mantener precargada y editable la información de cursada del perfil (comisión y cuatrimestre), evitando selecciones repetitivas.

#### Costo de la decisión (Qué se resigna y cómo se mitiga)
Toda decisión de diseño implica un compromiso:
* **Se resigna:** El acompañamiento paso a paso guiado de la Alternativa B y la barrera estricta de validación previa de la Alternativa C.
* **Mecanismos de compensación incorporados:**
  * Se incluyen etiquetas claras y una ayuda breve junto a los selectores de filtros.
  * Se introduce una alerta visual destacado cuando el material listado pertenezca a otra cursada/comisión o cuente con advertencias críticas informadas por el autor.
  * Se mantiene la opción de abrir el panel lateral para revisar el detalle completo antes de iniciar la descarga.

---
## 3. Anotaciones del diseño

Las siguientes decisiones estructurales se reflejan en el wireframe navegable (`docs/diseno/wireframe/index.html`):

* **P1 (Inicio / Mis materias):** Permite elegir una materia de la cursada activa del alumno.
* **P2 (Materiales de una materia con filtros y resultados):**
  * **Precarga de contexto:** Comisión, año y cuatrimestre se cargan automáticamente desde el perfil del usuario para ahorrar pasos, pero se mantienen editables en todo momento. Se incluye la acción "Mi cursada" para restablecer los valores por defecto rápidamente.
  * **Filtros flexibles:** El filtro por tipo de material no bloquea la búsqueda general.
  * **Visualización de resultados:** Cada resultado muestra título, tipo, comisión y período. Si un recurso posee una advertencia breve del autor, esta se muestra visible antes de presionar descargar.
  * **Detalle lateral no disruptivo:** Al seleccionar un recurso se abre un panel lateral con información ampliada (docente, tema, observaciones informadas) conservando los filtros activos y la posición en la lista. Si falta algún dato se indica como "no informado".
  * **Manejo de discrepancias y errores:** Si el material seleccionado no coincide con la cursada del perfil, el detalle destaca la diferencia y exige una confirmación antes de la descarga. Ante una búsqueda sin resultados, se mantiene el contexto seleccionado sin ampliar la búsqueda de manera silenciosa a otras comisiones. Si ocurre un fallo de carga, se ofrece el botón "Reintentar".
* **P3 (Visualizador del recurso):** Permite previsualizar el documento seleccionado antes o después de la descarga, manteniendo un botón directo para regresar a la lista de materiales.
* **Adaptabilidad (Responsive):** La interfaz está pensada para navegador de escritorio y móvil. En pantallas angostas, la tabla pasa automáticamente a formato de tarjetas y el panel de detalle ocupa el ancho completo disponible. Los filtros y avisos tienen etiquetas textuales.
