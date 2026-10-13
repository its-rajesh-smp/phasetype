#!/bin/sh
# Builds the Accessibility helper (native/ax-helper) as a universal binary in native/bin. Skips it if it's up to date.
set -e
cd "$(dirname "$0")/.."

SRC=native/ax-helper/main.swift
OUT=native/bin/phasetype-ax
# Electron 44 needs macOS 12 or later.
MIN_MACOS=12.0

if [ -f "$OUT" ] && [ "$OUT" -nt "$SRC" ]; then exit 0; fi

mkdir -p native/bin
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
for ARCH in arm64 x86_64; do
  swiftc -O -target "$ARCH-apple-macos$MIN_MACOS" "$SRC" -o "$TMP/$ARCH"
done
lipo -create "$TMP/arm64" "$TMP/x86_64" -output "$OUT"
echo "Built $OUT"
