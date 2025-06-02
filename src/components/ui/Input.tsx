type Props = {
  type: 'text' | 'email' | 'password' | 'number'
  name: string
  placeholder: string
  value?: string
  label: string
  required?: boolean
  resend?: boolean
}

export const Input = ({ type, name, placeholder, value, label, resend = false }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="" className="text-cs-black text-sm">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {resend && (
        <button className="cursor-pointer place-self-end text-sm text-blue-500 hover:underline">
          Forgot Password?
        </button>
      )}
    </div>
  )
}
