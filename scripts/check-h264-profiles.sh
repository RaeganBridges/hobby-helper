#!/usr/bin/env bash
# Print H.264 codec profile / level for each MP4 under public/ (excludes *.original.mp4).
# Expect Baseline or Main for mobile-friendly assets (not High / High 10).
#
# Requires: ffprobe (from ffmpeg: brew install ffmpeg)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VID="${ROOT}/public"

if ! command -v ffprobe >/dev/null 2>&1; then
  echo "ffprobe not found. Install ffmpeg (e.g. brew install ffmpeg)." >&2
  exit 1
fi

shopt -s nullglob
found=0
for f in "${VID}"/*.mp4; do
  [[ -f "$f" ]] || continue
  base="$(basename "$f" .mp4)"
  [[ "$base" == *.original ]] && continue
  found=1
  echo "=== ${f#$ROOT/} ==="
  # profile: 66=Baseline, 77=Main, 100=High (avoid High for broad mobile)
  ffprobe -v error -select_streams v:0 \
    -show_entries stream=codec_name,profile,level \
    -of default=noprint_wrappers=1 "$f" || true
  echo
done

if [[ "$found" -eq 0 ]]; then
  echo "No MP4 files in ${VID}" >&2
  exit 1
fi
