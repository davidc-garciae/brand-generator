import { cn } from '@/helpers/cn'
import { useAuth } from '@/hooks/use-auth'
import { useChatbot } from '@/hooks/use-chatbot'
import type { FontItem, Palette } from '@/types'
import { BugIcon } from 'lucide-react'
import AvatarDropdown from './auth/avatar-dropdown'
import PalettePreview from './chatbot/preview/palette-preview'
import TypographyPreview from './chatbot/preview/typography-preview'
import { GitHubIcon } from './icons/Icons'
import { IntroductionCard } from './IntroductionCard'

const optionCards = [
  {
    id: 'palette',
    img: '/imgs/Card-Palette.png',
    alt: 'Card Palette Decoration',
    title: 'Create Palette',
    description: 'Describe your brand and get the perfect colors for it',
    inputMessage: 'Make me a palette for my brand',
  },
  {
    id: 'typography',
    img: '/imgs/Card-Typography.png',
    alt: 'Card Typography Decoration',
    title: 'Choose Typography',
    description: 'Get the best typography for your branding',
  },
  {
    id: 'slogan',
    img: '/imgs/Card-Copy.png',
    alt: 'Card Create Slogans Decoration',
    title: 'Create slogans',
    description: 'Find your voice, and adapt the message for your brand',
  },
]

export const Preview = () => {
  const { user, logout } = useAuth()
  const { messages } = useChatbot()

  function handleLogout() {
    logout()
  }

  const reversedMessages = [...messages].reverse()
  const lastPalette = reversedMessages.find((message) => message.type === 'palette')
  const lastTypography = reversedMessages.find((message) => message.type === 'fonts')

  return (
    <section className={cn('grid min-h-screen w-full grid-rows-[auto_1fr] pb-6', lastPalette && 'bg-[#F0E8FB]')}>
      <header className="flex w-full items-center justify-between px-8 py-6">
        <div className="border-primary/20 me-4 flex items-center gap-4 rounded-md border px-2 py-1">
          <a
            href="https://github.com/afordigital/brand-generator/issues/new"
            className="text-primary mr-4 flex cursor-pointer items-center gap-1 text-sm hover:underline"
            title="Report an issue"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BugIcon className="size-4" />
            Issue
          </a>
          <a
            href="https://github.com/afordigital/brand-generator"
            className="text-primary flex cursor-pointer items-center gap-1 text-sm hover:underline"
            title="View on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="text-primary size-4" />
            Github
          </a>
        </div>
        {user ? (
          <AvatarDropdown user={user} onLogout={handleLogout} />
        ) : (
          <div className="flex items-center gap-4">
            <a href="/login" className="text-primary cursor-pointer text-sm hover:underline">
              Login
            </a>
            <a href="/register" className="text-primary cursor-pointer text-sm hover:underline">
              Register
            </a>
          </div>
        )}
      </header>
      {!lastPalette && !lastTypography ? (
        <article className="flex w-full flex-col items-center justify-center">
          <img src="/imgs/Hambot.webp" alt="Hambot Logo" width={120} />
          <h2 className="text-cs-black text-center text-4xl leading-11 font-bold">
            Welcome to <span className="text-primary">Hambot</span>
            , your
            <br /> AI-powered helper
          </h2>
          <p className="text-description">From prompt to complete corporate branding</p>
          <div className="mt-8 grid grid-cols-3 gap-9">
            {optionCards.map((card) => (
              <IntroductionCard key={card.id} {...card} />
            ))}
          </div>
        </article>
      ) : (
        <div className="flex flex-col gap-4">
          {lastPalette && <PalettePreview palette={lastPalette.content as Palette} editable={true} />}
          {lastTypography && (
            <TypographyPreview palette={lastPalette?.content as Palette} fonts={lastTypography.content as FontItem[]} />
          )}
        </div>
      )}
    </section>
  )
}
