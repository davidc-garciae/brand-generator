type Props = {
  img: string
  alt: string
  title: string
  description: string
}

export const IntroductionCard = ({ img, alt, title, description }: Props) => {
  return (
    <div className="border-border group flex w-[226px] cursor-pointer flex-col justify-between gap-4 rounded-lg border-1 p-4">
      <div className="w-[200px] overflow-hidden rounded-lg">
        <img
          src={img}
          width={200}
          alt={alt}
          className="transition-transform group-hover:scale-125 group-hover:rotate-6"
        />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <h3 className="text-cs-black text-md font-bold">{title}</h3>
        <p className="text-description text-sm">{description}</p>
      </div>
    </div>
  )
}
