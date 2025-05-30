type Props = {
  img: string;
  alt: string;
  children: React.ReactNode;
};

export const IntroductionCard = ({ img, alt, children }: Props) => {
  return (
    <div className="flex flex-col border boder-border rounded-lg gap-4 p-4">
      <img src={img} alt={alt} className="w-full" />
      {children}
    </div>
  );
};
