import type { FaqEntry } from '../types/landing.types'

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: 'What is PhaseType?',
    answer:
      'PhaseType is an AI writing assistant for macOS. Select text in any app, press a hotkey, and fix or rewrite it with AI. Then paste the result straight back over your selection, or copy it.'
  },
  {
    question: 'Which apps does it work with?',
    answer:
      'Any app where you can select text and paste: Mail, Slack, Notes, Messages, Notion, your browser, your code editor and more. PhaseType copies your selection with ⌘C and pastes with ⌘V, so apps need no special support.'
  },
  {
    question: 'Do I need an OpenAI API key?',
    answer:
      'Yes. PhaseType uses your own OpenAI API key, and usage is billed to your OpenAI account. It lists the chat models your key can use and picks a fast default, which you can change in Settings.'
  },
  {
    question: 'Where does my text go?',
    answer:
      'Only to OpenAI, directly from your Mac. There are no PhaseType servers in between and no account to sign up for. Your API key is stored encrypted with the macOS Keychain.'
  },
  {
    question: 'Why does PhaseType need Accessibility access?',
    answer:
      'macOS requires Accessibility permission before one app can send copy and paste keystrokes to another. PhaseType uses it only to copy your selection and paste the result.'
  },
  {
    question: 'What is the difference between the panel and quick fix?',
    answer:
      'The panel (⌃⌥Space by default) lets you type any instruction and refine the result before pasting. Quick fix (⌃⌥F by default) fixes spelling, grammar and punctuation and pastes it back immediately, without opening anything.'
  },
  {
    question: 'Can I change the hotkeys?',
    answer:
      'Yes. Record any shortcut during setup or later in Settings. PhaseType checks that no other app already uses it.'
  },
  {
    question: 'Which Macs are supported?',
    answer:
      'Both Apple Silicon (M1 and later) and Intel Macs. Each has its own download, so pick the one that matches your Mac.'
  },
  {
    question: 'macOS says it “could not verify PhaseType”. Is that normal?',
    answer:
      'For now, yes. Early builds are not notarized by Apple yet. Right-click PhaseType in Applications, choose Open, then Open again. You only need to do this once.'
  }
]
