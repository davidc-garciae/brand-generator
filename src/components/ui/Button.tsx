interface ButtonProps {
  variant?: 'primary' | 'secondary'
  label: string
  icon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({ variant = 'primary', label, icon }: ButtonProps) => {
  const base = 'rounded-xl px-4 py-2 flex items-center justify-center gap-2 cursor-pointer border'
  const variants = {
    primary:
      'bg-dark font-bold hover:bg-white hover:text-cs-black text-white transition-colors duration-200 hover:border hover:border-gray-300',
    secondary: 'bg-white text-cs-black hover:bg-gray-100 border border-gray-300 transition-colors duration-200',
  }
  return (
    <button className={`${base} ${variants[variant]}`}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}
