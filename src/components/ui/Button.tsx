interface ButtonProps {
  variant: 'primary' | 'secondary'
  label: string
  icon?: React.ReactNode
}

export const Button = ({ variant, label, icon }: ButtonProps) => {
  const base = 'rounded-xl px-4 py-2 flex items-center justify-center gap-2 cursor-pointer'
  const variants = {
    primary: 'bg-dark font-bold hover:bg-white hover:text-cs-black text-white transition-colors duration-200',
    secondary: 'bg-white text-cs-black hover:bg-gray-100 border border-gray-300 transition-colors duration-200',
  }
  return (
    <button className={`${base} ${variants[variant]}`}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}
