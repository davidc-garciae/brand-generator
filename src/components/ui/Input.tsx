import { cn } from '@/helpers/cn'

type Props = {
  type: 'text' | 'email' | 'password' | 'number'
  name: string
  placeholder: string
  value?: string
  label: string
  required?: boolean
  resend?: boolean
  classNameLabel?: string
  inputStyle?: React.CSSProperties
  styleLabel?: React.CSSProperties
}

export const Input = ({
  type,
  name,
  placeholder,
  value,
  label,
  resend = false,
  classNameLabel,
  inputStyle,
  styleLabel,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="" className={cn('text-cs-black text-sm', classNameLabel)} style={styleLabel}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className="border-border placeholder:text-placeholder w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        style={inputStyle}
      />
      {resend && (
        <button className="cursor-pointer place-self-end text-sm text-blue-500 hover:underline">
          Forgot Password?
        </button>
      )}
    </div>
  )
}
