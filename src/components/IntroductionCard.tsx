type Props = {
  img: string
  alt: string
  title: string
  description: string
}

export const IntroductionCard = ({ img, alt, title, description }: Props) => {
  return (
    <div className="flex w-[226px] flex-col gap-4 rounded-lg border-1 border-[#EDEDED] p-4">
      <img src={img} width={200} alt={alt} />
      <div className="flex flex-col gap-2 text-center">
        <h3 className="text-cs-black text-md font-bold">{title}</h3>
        <p className="text-description text-sm">{description}</p>
      </div>
    </div>
  )
}
