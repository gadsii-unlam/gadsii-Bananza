#!/bin/bash
# uso: docs/tpi/armar-pdf.sh <archivo.md> <salida.pdf> "<título>"
set -e
S=$(mktemp -d); MD="$(realpath "$1")"; OUT="$2"; TIT="$3"; REPO=$(cd "$(dirname "$0")/../.." && pwd)
BODY=$(cd "$S" && npx --yes marked@15 --gfm -i "$MD")
BODY=${BODY//..\/arquitectura\//file:\/\/$REPO\/docs\/arquitectura\/}
HTML="${OUT%.pdf}.html"
cat > "$HTML" <<HT
<!doctype html><html lang="es-AR"><head><meta charset="utf-8"><title>$TIT</title><style>
@page{size:A4;margin:16mm 15mm 16mm 15mm}
body{font-family:"Inter","Noto Sans","DejaVu Sans",sans-serif;font-size:9.6pt;line-height:1.42;color:#1d2433}
h1{font-size:20pt;margin:0 0 4mm;color:#14213d}
h2{font-size:14pt;color:#14213d;border-bottom:2px solid #f2c14e;padding-bottom:1mm;margin-top:7mm;break-before:page}
h3{font-size:12pt;color:#14213d;margin:6mm 0 2mm}
h4{font-size:10.2pt;margin:4mm 0 1.5mm;color:#2b3a67}
table{border-collapse:collapse;width:100%;margin:2mm 0 3mm;font-size:8.6pt;break-inside:auto}
th,td{border:1px solid #c9cfdb;padding:1.4mm 1.8mm;vertical-align:top;text-align:left}
th{background:#eef1f7}
tr{break-inside:avoid}
code{font-family:"JetBrains Mono","DejaVu Sans Mono",monospace;font-size:8.3pt;background:#f2f4f8;padding:0 .6mm;border-radius:2px}
img{max-width:100%;border:1px solid #dde2ea;margin-top:2mm}
p,li{orphans:3;widows:3}
blockquote{border-left:3px solid #f2c14e;margin:2mm 0;padding:1mm 3mm;background:#fffaf0}
.portada{break-after:page}
.portada h1{font-size:26pt;margin-top:10mm}
.pendiente{color:#b00020;font-weight:600}
</style></head><body>$BODY</body></html>
HT
google-chrome-stable --headless=new --disable-gpu --no-pdf-header-footer --allow-file-access-from-files --print-to-pdf="$OUT" "file://$HTML" 2>/dev/null
rm -f "$HTML"
