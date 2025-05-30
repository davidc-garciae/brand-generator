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
  return (
    <section className="min-h-screen w-full">
      <header className="mt-6 flex w-full items-center justify-center">
        <img src="/imgs/Avatar.png" alt="User Avatar" width={36} height={36} />
      </header>
      <article className="flex h-[calc(100vh-68px)] w-full flex-col items-center justify-center">
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
    </section>
  )
}
