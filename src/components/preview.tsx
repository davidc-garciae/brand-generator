import { cn } from '@/helpers/cn'
import { useAuth } from '@/hooks/use-auth'
import { useChatbot } from '@/hooks/use-chatbot'
import type { FontItem, Palette } from '@/types'
import PalettePreview from './chatbot/preview/palette-preview'
import TypographyPreview from './chatbot/preview/typography-preview'
import { IntroductionCard } from './IntroductionCard'
const optionCards = [
  {
    img: '/imgs/Card-Palette.png',
    alt: 'Card Palette Decoration',
    title: 'Create Palette',
    description: 'Describe your brand and get the perfect colors for it',
  },
  {
    img: '/imgs/Card-Typography.png',
    alt: 'Card Typography Decoration',
    title: 'Choose Typography',
    description: 'Get the best typography for your branding',
  },
  {
    img: '/imgs/Card-Copy.png',
    alt: 'Card Typography Decoration',
    title: 'Adapt Copy-writting',
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
    <section className={cn('grid min-h-screen w-full grid-rows-[auto_1fr]', lastPalette && 'bg-[#F0E8FB]')}>
      <header className="flex w-full items-center justify-center p-5">
        <div className="flex h-[50px] w-full items-center justify-end rounded-md bg-white px-[10px] py-[5px] shadow-sm">
          {user ? (
            <div className="flex items-center gap-2">
              <img src="/imgs/Avatar.png" alt="User Avatar" width={36} height={36} />
              <p className="text-cs-black text-sm">{user.email}</p>
              <button onClick={handleLogout} className="text-primary cursor-pointer text-sm hover:underline">
                Logout
              </button>
            </div>
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
        </div>
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
              <IntroductionCard key={card.title} {...card} />
            ))}
          </div>
        </article>
      ) : (
        <div className="flex flex-col gap-4">
          {lastPalette && <PalettePreview palette={lastPalette.content as Palette} />}
          {lastTypography && <TypographyPreview fonts={lastTypography.content as FontItem[]} />}
        </div>
      )}
    </section>
  )
}
