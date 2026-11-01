#!/bin/sh
# Builds the native helpers as universal binaries in native/bin, skipping any that are up to date:
#   native/ax-helper    -> phasetype-ax     (reads and replaces selected text through Accessibility)
#   native/media-helper -> phasetype-media  (turns audio and video into clips and frames for the AI)
set -e
cd "$(dirname "$0")/.."

# Electron 44 needs macOS 12 or later.
MIN_MACOS=12.0

build() {
  SRC=native/$1/main.swift
  OUT=native/bin/$2
  if [ -f "$OUT" ] && [ "$OUT" -nt "$SRC" ]; then return; fi

  mkdir -p native/bin
  TMP=$(mktemp -d)
  for ARCH in arm64 x86_64; do
    swiftc -O -target "$ARCH-apple-macos$MIN_MACOS" "$SRC" -o "$TMP/$ARCH"
  done
  lipo -create "$TMP/arm64" "$TMP/x86_64" -output "$OUT"
  rm -rf "$TMP"
  echo "Built $OUT"
}

build ax-helper phasetype-ax
build media-helper phasetype-media
