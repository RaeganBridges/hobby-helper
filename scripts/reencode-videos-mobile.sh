#!/usr/bin/env bash
# Re-encode MP4s under public/videos/ for iOS Safari / mobile hardware decoders.
#
# Your current files declare H.264 *level 6.0* in the avcC box while the frames
# are Phone-sized (~1290×2796). That mismatch often plays on desktop Chrome but
# fails on iPhone (black video / MEDIA_ERR_DECODE).
#
# Requires: ffmpeg (brew install ffmpeg)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VID="$ROOT/public/videos"
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Install ffmpeg first (e.g. brew install ffmpeg)" >&2
  exit 1
fi
shopt -s nullglob
for src in "$VID"/*.mp4; do
  base="$(basename "$src" .mp4)"
  case "$base" in *.original) continue ;; esac
  tmp="${src%.mp4}.tmp-reencode.mp4"
  echo "=== $base.mp4 → Main@L4.1, yuv420p, faststart ==="
  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -c:v libx264 -preset slow \
    -profile:v main -level 4.1 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    "$tmp"
  mv "$tmp" "$src"
done
echo "Done. Commit updated public/videos/*.mp4 and redeploy."
