import privacyBanner from '@/assets/images/privacy-banner.webp'
import type { LegalDocument } from '../types/legal.types'

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy policy',
  summary: 'What PhaseType does with your text, files and API key. Short version: it stays on your Mac or goes straight to OpenAI.',
  updated: '5 November 2026',
  banner: privacyBanner,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      paragraphs: [
        'PhaseType is a macOS app that rewrites text and answers questions about files using your own OpenAI API key. There is no PhaseType account and there are no PhaseType servers. We do not collect, store or sell your data.'
      ]
    },
    {
      id: 'what-stays-on-your-mac',
      title: 'What stays on your Mac',
      paragraphs: ['PhaseType keeps the following only on your Mac:'],
      bullets: [
        'Your OpenAI API key, encrypted with the macOS Keychain.',
        'Your settings, hotkeys and presets.',
        'A request history with short previews of the text you sent and the replies, plus token counts and estimated cost. It keeps the most recent 2,000 requests and you can clear it at any time in Settings.'
      ]
    },
    {
      id: 'what-goes-to-openai',
      title: 'What goes to OpenAI',
      paragraphs: [
        'When you run a request, PhaseType sends the selected text, your instruction, any preset you applied and any files you attached directly from your Mac to OpenAI using your API key. Audio and video are sent for transcription, and frames from videos may be sent for analysis.',
        'OpenAI handles that data under its own terms and privacy policy, which apply to your account. PhaseType has no access to your OpenAI account or its data.'
      ]
    },
    {
      id: 'permissions',
      title: 'macOS permissions',
      paragraphs: [
        'PhaseType asks for Accessibility access because macOS requires it before one app can read or replace text in another. It is used only to read your selection when you press a hotkey and to put the result back.'
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics and tracking',
      paragraphs: [
        'The app contains no analytics, crash reporting or tracking. This website does not use cookies or third-party trackers.'
      ]
    },
    {
      id: 'your-choices',
      title: 'Your choices',
      paragraphs: [
        'You can clear your request history in Settings, remove your API key, or uninstall the app to delete everything it stored. You can revoke the API key at any time from your OpenAI dashboard.'
      ]
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      paragraphs: [
        'If how PhaseType handles data changes, we will update this page and the date at the top before the change ships.'
      ]
    }
  ]
}
