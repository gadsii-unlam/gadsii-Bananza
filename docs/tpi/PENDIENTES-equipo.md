# Pendientes antes de entregar el TPI (martes 24/11)

Lo que quedó hecho y lo que todavía tiene que hacer o confirmar el equipo.

## Qué hay en `docs/tpi/`

| Archivo | Qué es |
|---|---|
| `TPI-Bananza.pdf` | El documento integrador (Parte 1 y estado de la Parte 2), con el formato que pide la consigna. Su fuente está en el repo: `docs/tpi/TPI-Bananza.md`. |
| `guia-defensa.md` / `.pdf` | Banco de preguntas de los cinco tipos (anclaje, descarte, perturbación, detección y consecuencia), con respuestas y citas. No es la presentación. |
| `../arquitectura/diagrama-mvp.png`, `../arquitectura/diagrama-vision.png` | Los diagramas del TP6, para usar en la presentación. |
| `PENDIENTES-equipo.md` | Este archivo. |
| `armar-pdf.sh` | Arma el PDF a partir del Markdown. |

## Lo que se hizo en el repositorio

Todo está en la rama **`tpi`**, subida a GitHub (`origin/tpi`). Falta abrir el PR a `main`. Los tags siguen **sólo en local**.

- `README.md` reescrito: qué es, cómo se ejecuta, cómo se continúa, mapa del repositorio, líneas base y deuda conocida.
- `docs/arquitectura/tp6-arquitectura.md` restaurado desde `88af436`. Iara lo había borrado en el merge del TP6, pero el brief v5 lo cita tres veces. Se agregaron los dos diagramas.
- `docs/brief.md`: sigue siendo la **versión 5**. Sólo se quitó el párrafo «Cambios… respecto de la versión 3», que estaba duplicado.
- `docs/prompts.md`: entrada del TPI y huecos declarados (no hay entradas del TP2, TP4 ni TP7).
- `docs/tpi/`: el documento integrador (fuente y PDF), la guía de defensa y este archivo.
- Tags **locales**: `tp1-entrega`, `tp2-entrega`, `tp3-entrega`, `tp5-entrega`, `tp6-entrega` y `tpi-entrega`. `tp4-entrega` ya existía y no se tocó.

## Tiene que decidirlo o confirmarlo el equipo

1. **La URL pública del MVP** para la primera página del PDF. Hoy dice «[completar URL pública del MVP]» en rojo. Si no hay deploy, al menos una máquina con un túnel el día de la defensa.
2. **Los juicios del punto 3** («¿La sostenemos hoy?») y **cuál es la decisión que cambiarían.** El borrador propone la 4: probar con material precargado y con la respuesta pedida por consigna. La consigna dice que esto «no se delega»; si no están de acuerdo, cámbienlo.
3. **El punto 5 completo** (retrospectiva de IA), en especial el «descarte más importante». El borrador elige la alternativa A sin ajustes del TP3, con la salvedad de que la atribución a la IA nunca se verificó. Si alguien tiene el chat original de ChatGPT del 08/09, agréguenlo como evidencia. El borrador presenta además, como «el que hoy revertiríamos», el cambio de M2 del 1/11: pasar de 48 h a una respuesta dentro de la sesión (`eb765e9`). Antonio, que hizo ese commit, tiene que poder explicar por qué se cambió.
4. **El commit de cada línea base.** El criterio está en el `README.md`. Si en el TP7 se definieron otros nombres o commits, se corrigen antes de pushear.
5. **El TP7.** No encontré en el repositorio nada de esa entrega. Si existe en otro lado, súmenlo, o díganlo en la defensa como límite.
6. **Quién lo mantendría** (punto 4). El borrador propone una agrupación o el centro de estudiantes, sin haberlo consultado. Es una propuesta, no un hecho.
7. **Los autores de la tabla «Quién hizo qué»** de la guía de defensa, que salen de `git log`.

## Comandos para subir todo (cuando el equipo lo apruebe)

```bash
# desde la raíz del repositorio, en la rama tpi
# (la rama tpi ya está subida)
gh pr create --base main --head tpi --title "TPI: README, arquitectura restaurada y documento integrador"
# Después del merge, mover tpi-entrega al commit del merge en main y subir los tags:
git fetch origin && git tag -f -a tpi-entrega -m "Línea base del TPI" origin/main
git push origin tp1-entrega tp2-entrega tp3-entrega tp5-entrega tp6-entrega tpi-entrega
```

Para regenerar el PDF después de editar `docs/tpi/TPI-Bananza.md`, usar `docs/tpi/armar-pdf.sh <archivo.md> <salida.pdf> "<título>"`. Necesita Google Chrome y conexión la primera vez (descarga `marked` con npx).

## No se hizo (a propósito)

- **La presentación:** dijiste que la hacés después. Hay una carpeta `presentacion/` sin trackear en el clon principal (`~/Escritorio/git/gadsii-Bananza`, rama `tp6`) y no se tocó.
- **Ningún cambio en `src/`.** Los problemas que encontramos (el dominio con `endsWith`, la sesión sin contraseña, los límites) quedan declarados como deuda, no corregidos. Arreglarlos ahora cambiaría el producto que se defiende.
- **Nada en el clon principal:** sigue en la rama `tp6`, con sus archivos sin trackear y el stash intactos.
