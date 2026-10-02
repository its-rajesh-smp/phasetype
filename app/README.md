# PhaseType

Select text in any Mac app, press a hotkey, and fix or rewrite it with AI. Then copy the result or paste it straight back over your selection.

Built with Electron, React 19, TypeScript and Tailwind CSS v4 (via electron-vite).

## Getting started

```bash
yarn
yarn dev            # run with hot reload
yarn typecheck      # type-check main + renderer
yarn dist:mac       # build a .dmg into dist/
```

On first launch PhaseType opens a three-step setup:

1. **OpenAI API key.** Checked against OpenAI, then saved encrypted with the macOS Keychain (`safeStorage`).
2. **Hotkeys.** The panel hotkey defaults to `⌃⌥Space` and the quick fix hotkey to `⌃⌥F`. PhaseType checks that no other app already uses them.
3. **Accessibility access.** macOS requires this before PhaseType can copy your selection and paste the result.

After that, PhaseType lives in the menu bar. Everything (key, model, hotkeys, system prompt, open at login) can be changed in **Settings**, which you open from the menu bar icon or the gear in the panel.

### Using it

| Action | How |
| --- | --- |
| Open the panel | Select text, press your hotkey (press again to close) |
| Quick fix in place | Select text, press your quick fix hotkey (press again to cancel) |
| Ask for anything | Type a prompt, press `↵` |
| Fix grammar & spelling | **Fix the sentence** |
| Refine the result | Type another prompt (it now applies to the result) |
| Paste over the selection | **Paste** or `⌘↵` |
| Copy the result | **Copy** or `⇧⌘C` |
| Stop / close | `esc` |

If nothing is selected, the panel writes new text and pastes it at your cursor.

The quick fix hotkey runs **Fix the sentence** without opening the panel: it reads the selection, fixes it and pastes it back over the selection. A small pill near the bottom of the screen shows progress, then "Fixed" or what went wrong. It never takes focus, so you stay in the app you were typing in.

## Building for Mac

```bash
yarn dist:mac
```

This type-checks, builds, and writes two installers to `dist/` (about a minute):

- `PhaseType-<version>-arm64.dmg` for Apple Silicon Macs (M1 and later)
- `PhaseType-<version>-x64.dmg` for Intel Macs

Open the `.dmg` and drag PhaseType into Applications.

Note: `dist/mac-arm64/` holds the Apple Silicon app and `dist/mac/` the Intel one. On an Apple Silicon Mac, use the `arm64` build.

**Signing.** The app is *ad-hoc* signed (`identity: "-"` in `electron-builder.yml`). That is free and needs no Apple account, and is fine for your own Mac. Two side effects:

- On **another** Mac, the first launch shows "Apple could not verify PhaseType". Right-click the app → **Open** → **Open** (or allow it under System Settings → Privacy & Security).
- macOS ties the Accessibility permission to the signature, which changes with every build. After installing a new build, turn PhaseType off and on again under Privacy & Security → Accessibility.

To distribute it publicly without warnings, join the Apple Developer Program ($99/year), then:

1. Replace `identity: "-"` with your "Developer ID Application" certificate.
2. Set `notarize: true`.

## How it works

- **Reading the selection:** when you press the hotkey, the main process remembers which app is in front, sends it `⌘C` through AppleScript (`osascript`), reads the clipboard, then puts your original clipboard back. No native modules are needed.
- **Paste:** the panel hides, PhaseType switches back to that app and sends `⌘V`, then restores your clipboard.
- The AppleScript waits until you release the hotkey's modifier keys, so the `⌘C` isn't merged with keys you're still holding (e.g. sent as `⌘⌥C`).
- **The API key** never reaches the UI. Only the main process decrypts it, and the renderer only sees a hint like `sk-proj…abcd`.
- Responses **stream** from OpenAI's Chat Completions API over IPC. PhaseType lists the chat models available to your key and picks a fast default (`gpt-4.1-mini` → `gpt-4o-mini` → …).

### Accessibility in development

macOS grants Accessibility to the app that launched the process. With `yarn dev`, that's usually your terminal or editor (or `Electron.app`), not "PhaseType". Grant access to whichever one System Settings lists. The packaged app asks for itself.

> If `yarn dev` fails with `Cannot read properties of undefined (reading 'requestSingleInstanceLock')`, your shell has `ELECTRON_RUN_AS_NODE=1` set (some editor-integrated terminals set it). Run `unset ELECTRON_RUN_AS_NODE` first.

## Project structure

```
assets/                     # App icon and menu bar icon
src/
├── shared/                 # Code used by every process
│   ├── types/              # Settings, AI, panel, bridge (IPC) contracts
│   ├── constants/          # IPC channel names, defaults, quick actions, prompts
│   └── utils/              # Accelerator formatting, model selection
├── main/                   # Electron main process
│   ├── index.ts            # App lifecycle
│   ├── windows/            # Setup/settings window, floating panel, quick fix status pill
│   ├── controllers/        # Hotkey → capture → panel flow, quick fix flow, settings updates
│   ├── services/           # Settings store, AI (provider registry + OpenAI),
│   │                       # selection, clipboard, hotkey, permissions, tray
│   ├── ipc/                # One file of IPC handlers per domain
│   ├── helpers/            # AppleScript builders, prompt builder, key hint
│   ├── utils/              # osascript runner, polling, sleep, errors
│   ├── constants/  types/
├── preload/                # contextBridge → window.phasetype (typed by PhaseTypeBridge)
└── renderer/src/
    ├── App.tsx             # Picks the view: #/main (setup/settings), #/panel or #/status
    ├── styles/globals.css  # Design tokens (colors, fonts, marker, animations)
    ├── components/ui/      # Button, TextInput, Kbd, Toggle, Logo, … (one per file)
    ├── components/common/  # HotkeyRecorder, ApiKeyInput, AccessibilityStatus
    ├── hooks/              # useSettings, useConnectApiKey, useHotkeyRecorder, …
    ├── providers/ context/ # Settings context
    ├── services/           # bridge.service.ts: the only access to window.phasetype
    ├── utils/ constants/ types/
    ├── views/              # MainWindow (onboarding vs settings)
    └── modules/
        ├── onboarding/     # Step-by-step setup
        ├── settings/       # All settings on one page
        ├── panel/          # The hotkey panel
        └── status/         # The quick fix status pill
```

Each module has its own `components/`, `hooks/`, `constants/` and `types/` folders, and every component lives in its own file.

### Theming

All colors, fonts and effects are defined once in `src/renderer/src/styles/globals.css` under `@theme` and used as Tailwind classes (`bg-canvas`, `text-ink`, `bg-lime`, `text-ember`, `font-display`, `marker`, …). The palette follows alvio.io: warm paper, near-black ink, lime and ember accents, with *Instrument Serif* for headings and *Inter* for text. Fonts are bundled, so the app works offline.

### Adding an AI provider

Implement `AiProvider` (`src/main/types/provider.types.ts`) in `src/main/services/ai/providers/`, register it in `provider.registry.ts`, and add its id to `AiProviderId`.

### Icons

The icons are vector SVGs in `assets/`; the other files are exported from them.

| File | Used for |
| --- | --- |
| `assets/icon/icon.svg` | **Source of truth** for the app icon, also used as the in-app logo |
| `assets/icon/icon.icns` | Packaged app icon (Dock, Finder, .dmg). Contains every size from 16 to 1024px |
| `assets/icon/icon.png` | 1024px export, used as the Dock icon in development (Electron can't load SVG or `.icns` there) |
| `assets/tray/tray.svg` → `trayTemplate.png`, `@2x` | Menu bar icon at 18px and 36px (black "template" image that macOS tints for light/dark menu bars) |

To change the icon, edit the SVG (e.g. in Figma), re-export `icon.png`, then rebuild the `.icns`. Export each size **from the SVG**; don't scale one PNG down to make the others:

```bash
mkdir icon.iconset
# Export the SVG into icon.iconset/ as:
#   icon_16x16.png (16)     icon_16x16@2x.png (32)
#   icon_32x32.png (32)     icon_32x32@2x.png (64)
#   icon_128x128.png (128)  icon_128x128@2x.png (256)
#   icon_256x256.png (256)  icon_256x256@2x.png (512)
#   icon_512x512.png (512)  icon_512x512@2x.png (1024)
iconutil -c icns icon.iconset -o assets/icon/icon.icns && rm -r icon.iconset
```
