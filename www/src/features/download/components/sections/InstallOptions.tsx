import { HardDriveDownload, Terminal } from 'lucide-react'
import { INSTALL_COMMAND, INSTALL_SCRIPT_URL } from '@/constants/download.constants'
import { CopyCommand } from '../CopyCommand'
import { DmgDownload } from '../DmgDownload'
import { InstallCard } from '../ui/InstallCard'

const linkClass = 'font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink'

/** The two ways to install: one Terminal command, or the .dmg. */
export function InstallOptions() {
  return (
    <div className="grid animate-rise gap-5 [animation-delay:150ms] lg:grid-cols-2">
      <InstallCard
        icon={Terminal}
        title="Install with Terminal"
        tag="Easiest"
        description="Open Terminal, paste this and press Return. It downloads the latest version, puts it in Applications and opens it. No security prompts."
        footnote={
          <>
            Run it again any time to update.{' '}
            <a href={INSTALL_SCRIPT_URL} className={linkClass}>
              Read the script
            </a>{' '}
            before running it if you like.
          </>
        }
      >
        <CopyCommand command={INSTALL_COMMAND} />
      </InstallCard>

      <InstallCard
        icon={HardDriveDownload}
        title="Download the .dmg"
        description="The usual Mac way: open it and drag PhaseType into Applications. macOS asks you to approve it the first time you open it."
        footnote={
          <>
            <a href="#open-anyway" className={linkClass}>
              How to approve it
            </a>
            . You only do this once per download.
          </>
        }
      >
        <DmgDownload />
      </InstallCard>
    </div>
  )
}
