import { useLocation } from 'wouter'
import { useAuth } from '../../hooks/use-auth'

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
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <input type="text" placeholder="Name" name="name" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
