#!/usr/bin/env bash
# Video de portada: caravana real de buggies (IMG_2723), en bucle sin corte.
# Genera una versión horizontal (laptop) y una vertical (celular) con su póster.
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=/mnt/user-data/uploads/IMG_2723.MOV
OUT=public/video
mkdir -p "$OUT"
START=24.0   # segundo de inicio
L=7.0        # duración del bucle
F=0.8        # fundido entre el final y el inicio
GRADE="eq=contrast=1.07:saturation=1.16:gamma=0.98,colorbalance=rs=-0.02:bs=0.03:rh=0.03:bh=-0.03"

loop() { # $1 = filtro de recorte/escala, $2 = archivo, $3 = crf
  ffmpeg -y -loglevel error -ss "$START" -t "$(echo "$L + $F + 0.2" | bc)" -i "$SRC" -an -filter_complex "
    [0:v]fps=30,$1,$GRADE,split[a][b];
    [a]trim=0:$L,setpts=PTS-STARTPTS[main];
    [b]trim=$L:$(echo "$L + $F" | bc),setpts=PTS-STARTPTS,format=yuva420p,fade=t=out:st=0:d=$F:alpha=1[tail];
    [main][tail]overlay=0:0:eof_action=pass,format=yuv420p[v]" \
    -map "[v]" -c:v libx264 -preset slow -crf "$3" -profile:v high -pix_fmt yuv420p -movflags +faststart "$2"
}

loop "crop=1080:608:0:190,scale=1280:720:flags=lanczos" "$OUT/portada-h.mp4" 29
loop "scale=720:1280:flags=lanczos" "$OUT/portada-v.mp4" 30

for v in h v; do
  ffmpeg -y -loglevel error -i "$OUT/portada-$v.mp4" -frames:v 1 -c:v libwebp -quality 72 "$OUT/portada-$v.webp"
done
ls -la "$OUT"
