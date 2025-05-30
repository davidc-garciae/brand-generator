const optionCards = [
  {
    img: "/imgs/Card-Palette.png",
    alt: "Card Palette Decoration",
    children: (
      <>
        <h3>Palettes</h3>
        <p className="text-sm leading-4 text-center text-description">
          Explore the canvas to see what you could create!
        </p>
      </>
    ),
  },
  {
    img: "/imgs/Palettes-Chat.webp",
    alt: "Palettes Chat",
    children: (
      <p className="text-sm leading-4 text-center text-description">
        Explore the canvas to see what you could create!
      </p>
    ),
  },
  {
    img: "/imgs/Palettes-Chat.webp",
    alt: "Palettes Chat",
    children: (
      <p className="text-sm leading-4 text-center text-description">
        Explore the canvas to see what you could create!
      </p>
    ),
  },
];

export const Preview = () => {
  return (
    <section className="w-full min-h-screen">
      <header className="w-full flex mt-6 items-center justify-center">
        <img src="/imgs/Avatar.png" alt="User Avatar" width={36} height={36} />
      </header>
      <article className="w-full h-[calc(100vh-44px)] flex flex-col items-center justify-center">
        <img src="/imgs/Hambot.webp" alt="Hambot Logo" width={120} />
        <h2 className="text-center leading-11 text-4xl font-bold text-cs-black">
          Welcome to <span className="text-primary">Hambot</span>
          , your
          <br /> AI-powered helper
        </h2>
        <p className="text-description">
          From prompt to complete corporate branding
        </p>
        <div className="grid grid-cols-3 gap-4 mt-8"></div>
      </article>
    </section>
  );
};
