import type { FaqEntry } from '../types/landing.types'

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: 'What is PhaseType?',
    answer:
      'PhaseType is an AI writing assistant for macOS. Select text in any app, press a hotkey, and fix or rewrite it with AI. Then paste the result straight back over your selection, or copy it. Select files in Finder instead and you can ask about them.'
  },
  {
    question: 'Which apps does it work with?',
    answer:
      'Any app where you can select text: Mail, Slack, Notes, Messages, Notion, your browser, your code editor and more. PhaseType reads and replaces your selection directly through macOS Accessibility, and falls back to copy and paste in apps that don’t support it, so apps need no special support.'
  },
  {
    question: 'Can it read files, recordings and videos?',
    answer:
      'Yes. Select up to five files in Finder and press the panel hotkey. PhaseType reads PDFs, Word and other documents, images, text and code. Audio is transcribed, and for video it transcribes the sound and looks at frames from the picture. Recordings can be up to two hours long.'
  },
  {
    question: 'What are presets?',
    answer:
      'Saved writing styles, like “Slack reply” or “Email reply”. Each one holds instructions for tone and structure, plus optional facts about you, such as your name and role. Press ⌘P in the panel to apply one. Create, edit or turn them off in Settings.'
  },
  {
    question: 'Do I need an OpenAI API key?',
    answer:
      'Yes. PhaseType uses your own OpenAI API key, and usage is billed to your OpenAI account. It lists the chat models your key can use and picks a fast default, which you can change in Settings.'
  },
  {
    question: 'How much does it cost to use?',
    answer:
      'You pay OpenAI their usual prices for what you use. Settings › Usage shows the tokens and an estimated cost for every request, with totals by model, so there are no surprises. Your OpenAI dashboard has the exact bill.'
  },
  {
    question: 'Where does my text go?',
    answer:
      'Only to OpenAI, directly from your Mac, along with any files you attach. There are no PhaseType servers in between and no account to sign up for. Your API key is stored encrypted with the macOS Keychain, and your request history stays in a file on your Mac that you can clear any time.'
  },
  {
    question: 'Why does PhaseType need Accessibility access?',
    answer:
      'macOS requires Accessibility permission before one app can read or change text in another. PhaseType uses it only to read your selection and put the result back, directly or with copy and paste keystrokes.'
  },
  {
    question: 'What is the difference between the panel and quick fix?',
    answer:
      'The panel (⌘⇧Space by default) lets you type any instruction, attach files, apply a preset and keep refining before you paste. Quick fix (⌥⇧Space by default) fixes spelling, grammar and punctuation and pastes it back immediately, without opening anything.'
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
