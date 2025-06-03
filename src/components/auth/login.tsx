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
    <>
      <div className="absolute -z-10 h-1/2 w-full bg-purple-100"></div>
      <div className="col-span-2 m-auto grid min-h-screen w-full max-w-[1440px] grid-cols-[1fr_400px] px-32 py-48">
        <div className="col-start-1 flex h-full w-full">
          <div className="h-1/3 w-full">
            <div className="flex h-full w-full items-start gap-14">
              <div className="text-cs-black flex w-[466px] flex-col justify-center gap-3">
                <h1 className="text-2xl font-bold">From prompt to complete corporate branding</h1>
                <p>
                  Colors, typography, and brand personality made simple. Perfect for entrepreneurs, freelancers, and
                  creatives. Just answer a few questions, and we’ll make magic!
                </p>
              </div>
              <div className="relative">
                <img src="/imgs/Hambot.webp" alt="hambot image" className="h-[127px] w-[127px]" />
                <img src="/imgs/changeme-1.webp" alt="color illustration" className="absolute top-[-86px] -left-12" />
                <img src="/imgs/changeme-2.webp" alt="color illustration" className="absolute -bottom-26 left-6" />
                <img src="/imgs/changeme-3.webp" alt="color illustration" className="absolute top-[-86px] left-32" />
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <form
          onSubmit={onSubmit}
          className="col-start-2 flex h-fit w-96 translate-y-10 flex-col gap-9 place-self-center rounded-3xl bg-white p-6 shadow-md"
        >
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
            <a href="/register" className="font-bold text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </>
  )
}
