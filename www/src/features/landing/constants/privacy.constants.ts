import { KeyRound, Lock, ServerOff, Wallet } from 'lucide-react'
import type { PrivacyPoint } from '../types/landing.types'

export const PRIVACY_POINTS: PrivacyPoint[] = [
  {
    icon: Lock,
    title: 'Encrypted in your Keychain',
    description: 'Your OpenAI key is checked once, then stored encrypted with macOS Keychain.'
  },
  {
    icon: KeyRound,
    title: 'Never shown, never shared',
    description: 'Only the app’s background process decrypts the key. The interface only ever sees a hint like sk-proj…abcd.'
  },
  {
    icon: ServerOff,
    title: 'No servers in the middle',
    description: 'Text goes straight from your Mac to OpenAI. There is no PhaseType account and no PhaseType backend.'
  },
  {
    icon: Wallet,
    title: 'Pay for what you use',
    description: 'Usage is billed by OpenAI on your own account, at their rates.'
  }
]

export const KEY_HINT = 'sk-proj…abcd'
