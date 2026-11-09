#!/bin/sh
# PhaseType installer — https://phasetype.vercel.app/install.sh
#
#   curl -fsSL https://phasetype.vercel.app/install.sh | sh                 # latest version
#   curl -fsSL https://phasetype.vercel.app/install.sh | sh -s -- 0.2.0     # a specific version
#
# Downloads PhaseType from GitHub Releases, installs it to /Applications and opens it.
# Run it again to update: your settings and API key are stored outside the app and are kept.
#
# Files downloaded with curl aren't marked as "from the internet", so macOS opens the app
# without the "can't be verified" prompt that a browser download gets.

set -eu

REPO="its-rajesh-smp/phasetype"
APP_NAME="PhaseType"
INSTALL_DIR="/Applications"

say() { printf '%s\n' "$*"; }
fail() { printf 'Error: %s\n' "$*" >&2; exit 1; }

# arm64 or x64. An Apple Silicon Mac running this shell under Rosetta reports x86_64, so ask the kernel.
detect_arch() {
  case "$(uname -m)" in
    arm64) echo arm64 ;;
    x86_64)
      if [ "$(sysctl -n sysctl.proc_translated 2>/dev/null || echo 0)" = "1" ]; then echo arm64; else echo x64; fi
      ;;
    *) fail "Unsupported processor: $(uname -m)" ;;
  esac
}

# Asks the running app to quit, waits up to 10 seconds, then forces it.
quit_running_app() {
  pgrep -x "$APP_NAME" >/dev/null 2>&1 || return 0
  say "Quitting the running $APP_NAME..."
  pkill -x "$APP_NAME" 2>/dev/null || true
  i=0
  while pgrep -x "$APP_NAME" >/dev/null 2>&1 && [ "$i" -lt 20 ]; do
    sleep 0.5
    i=$((i + 1))
  done
  pkill -9 -x "$APP_NAME" 2>/dev/null || true
}

main() {
  [ "$(uname -s)" = "Darwin" ] || fail "PhaseType only runs on macOS."

  version="${1:-latest}"
  version="${version#v}"
  arch="$(detect_arch)"
  file="$APP_NAME-$arch.zip"
  if [ "$version" = "latest" ]; then
    url="https://github.com/$REPO/releases/latest/download/$file"
  else
    url="https://github.com/$REPO/releases/download/v$version/$file"
  fi

  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT INT TERM

  say "Downloading $APP_NAME ($version, $arch)..."
  curl -fL --progress-bar -o "$tmp/$file" "$url" || fail "Download failed: $url"

  ditto -x -k "$tmp/$file" "$tmp/unpacked" || fail "Could not unpack the download."
  [ -d "$tmp/unpacked/$APP_NAME.app" ] || fail "The download did not contain $APP_NAME.app."

  quit_running_app

  target="$INSTALL_DIR/$APP_NAME.app"
  sudo_cmd=""
  if [ ! -w "$INSTALL_DIR" ] || { [ -e "$target" ] && [ ! -w "$target" ]; }; then
    say "Your Mac password is needed to write to $INSTALL_DIR."
    sudo_cmd="sudo"
  fi

  say "Installing to $target..."
  $sudo_cmd rm -rf "$target"
  $sudo_cmd ditto "$tmp/unpacked/$APP_NAME.app" "$target"
  $sudo_cmd xattr -dr com.apple.quarantine "$target" 2>/dev/null || true

  say "Opening $APP_NAME..."
  open "$target"
  say "Done. $APP_NAME is in your menu bar. Run this command again any time to update."
}

# Everything runs from here, so a half-downloaded script does nothing.
main "$@"
