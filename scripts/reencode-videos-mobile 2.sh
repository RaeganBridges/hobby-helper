#!/usr/bin/env bash
# Re-encode hobby MP4s for broad mobile + in-browser playback (iOS Safari, Android Chrome).
#
# HandBrake (GUI) — close equivalent:
#   - Preset: "Android" / "Web" / "General" → pick a 720p or 1080p H.264 preset, or
#   - Summary tab: Format MP4, Web optimized ON, Align A/V start ON
#   - Video: H.264 (x264), Main or Baseline profile, Level 4.0 (or 3.1 for older devices)
#   - Audio: AAC
#
# Codec policy: H.264 only, Baseline or Main profile (never High). yuv420p for pixel format.
#
# CLI (this repo): requires ffmpeg (e.g. macOS: brew install ffmpeg)
#
# Usage:
#   ./scripts/reencode-videos-mobile.sh            # Main profile, level 4.0 (default)
#   ./scripts/reencode-videos-mobile.sh --main     # same as default (explicit)
#   ./scripts/reencode-videos-mobile.sh --baseline # Baseline profile, level 3.1
#   ./scripts/reencode-videos-mobile.sh --dry-run  # print ffmpeg commands only
#
# Input/output: public/videos/*.mp4

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VID="${ROOT}/public/videos"
DRY=0
PROFILE="main"
LEVEL="4.0"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY=1 ;;
    --main)
      PROFILE="main"
      LEVEL="4.0"
      ;;
    --baseline)
      PROFILE="baseline"
      LEVEL="3.1"
      ;;
    -h|--help)
      sed -n '1,30p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
  shift || true
done

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install it (e.g. macOS: brew install ffmpeg) or use HandBrake with an Android/web H.264 preset." >&2
  exit 1
fi

shopt -s nullglob
FILES=()
for cand in "${VID}"/*.mp4; do
  [[ -f "$cand" ]] || continue
  base="$(basename "$cand" .mp4)"
  [[ "$base" == *.original ]] && continue
  [[ "$base" == *.reencoded.tmp ]] && continue
  FILES+=("$cand")
done

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No MP4 files in ${VID}" >&2
  exit 1
fi

for infile in "${FILES[@]}"; do
  base="$(basename "$infile" .mp4)"
  tmp="${VID}/${base}.reencoded.tmp.mp4"
  bak="${VID}/${base}.original.mp4"

  if [[ -f "$bak" ]]; then
    echo "Skip ${base}.mp4 (backup exists: ${base}.original.mp4). Remove backup to re-run." >&2
    continue
  fi

  # libx264 honors -profile:v main|baseline (not high). -pix_fmt yuv420p matches Baseline/Main tier-1.
  cmd=(
    ffmpeg -hide_banner -y
    -i "$infile"
    -map_metadata -1
    -c:v libx264
    -profile:v "$PROFILE"
    -level:v "$LEVEL"
    -pix_fmt yuv420p
    -crf 23
    -preset medium
    -movflags +faststart
    -c:a aac
    -b:a 128k
    -ar 48000
    -ac 2
    "$tmp"
  )

  if [[ "$DRY" -eq 1 ]]; then
    printf '%q ' "${cmd[@]}"
    echo
    continue
  fi

  echo "Encoding: $infile → (tmp) → ${base}.mp4 [profile=${PROFILE} level=${LEVEL}]"
  "${cmd[@]}"
  mv "$infile" "$bak"
  mv "$tmp" "$infile"
  echo "  backup: $bak"
done

echo "Done."
