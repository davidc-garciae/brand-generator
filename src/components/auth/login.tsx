import { useLocation } from 'wouter'
import { useAuth } from '../../hooks/use-auth'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { GitHubIcon, GoogleIcon } from '../icons/Icons'

export default function Login() {
  const { login } = useAuth()
  const [, setLocation] = useLocation()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log({ email, password })

    if (!email || !password) {
      console.log('Missing fields')
      return
    }

    try {
      await login({ email, password })
      setLocation('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex w-96 flex-col gap-9 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center font-bold">Login</h2>
        <div className="flex w-full flex-col gap-4">
          <Input type="email" name="email" placeholder="user@example.com" label="Email" />
          <Input type="password" name="password" placeholder="Your password" label="Password" resend={true} />
          <Button type="submit" variant="primary" label="Login" />
        </div>
        <p className="text-center">Or</p>
        <div className="flex w-full flex-col gap-3">
          <Button icon={<GoogleIcon />} variant="secondary" label="Continue with Google" />
          <Button icon={<GitHubIcon />} variant="secondary" label="Continue with GitHub" />
        </div>
        <p className="text-cs-black text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-cs-black font-bold hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  )
}
