import { useLocation } from 'wouter'
import { useAuth } from '../../hooks/use-auth'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { GitHubIcon, GoogleIcon } from '../icons/Icons'

export default function Register() {
  const { register } = useAuth()
  const [, setLocation] = useLocation()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    console.log({ email, password, name })

    if (!email || !password || !name) {
      console.log('Missing fields')
      return
    }

    try {
      await register({
        email,
        password,
        name,
      })
      setLocation('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="absolute -z-10 h-1/2 w-full bg-purple-100"></div>
      <div className="fixed left-1/2 min-h-screen w-full max-w-[1440px] translate-x-[-50%] px-32 py-48 lg:grid lg:grid-cols-[1fr_400px]">
        <div className="col-start-1 hidden h-full w-full lg:flex">
          <div className="h-1/3 w-full">
            <div className="flex h-full w-full items-start gap-14">
              <div className="text-cs-black flex w-[466px] flex-col justify-center gap-3">
                <h1 className="text-4xl font-bold">From prompt to complete corporate branding</h1>
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
          className="border-border col-start-2 flex h-fit w-96 flex-col gap-9 place-self-center rounded-3xl border bg-white p-6"
        >
          <h2 className="text-center text-xl font-bold">Create an Account</h2>
          <div className="flex w-full flex-col gap-4">
            <Input type="email" name="email" placeholder="user@example.com" label="Email" />
            <Input type="text" name="name" placeholder="Your Name" label="Name" />
            <Input type="password" name="password" placeholder="Your password" label="Password" />
            <Button type="submit" variant="primary" label="Sign Up" />
          </div>
          <p className="text-center">Or</p>
          <div className="flex w-full flex-col gap-3">
            <Button icon={<GoogleIcon />} variant="secondary" label="Register with Google" />
            <Button icon={<GitHubIcon />} variant="secondary" label="Register with GitHub" />
          </div>
          <p className="text-cs-black text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="font-bold text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </>
  )
}
