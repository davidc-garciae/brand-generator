import { API_URL } from '../helpers/contants'

export interface User {
  id: string
  email: string
  name?: string
}

interface RegisterPayload {
  email: string
  password: string
  name?: string
}

interface LoginPayload {
  email: string
  password: string
}

export default class AuthService {
  static async register(payload: RegisterPayload): Promise<User> {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed due to an unknown error.')
    }

    return data.user as User
  }

  static async login(payload: LoginPayload): Promise<void> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Login failed' }))
      throw new Error(errorData.message || 'Login failed due to an unknown error.')
    }
  }

  static async me(): Promise<User> {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('User not authenticated.')
      }
      const errorData = await res.json().catch(() => ({ message: 'Failed to fetch user' }))
      throw new Error(errorData.message || 'Failed to fetch user due to an unknown error.')
    }

    const data = await res.json()
    if (!data || typeof data.id !== 'string' || typeof data.email !== 'string') {
      throw new Error('Received invalid user data from /auth/me.')
    }
    return data as User
  }

  static async logout(): Promise<void> {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Logout failed' }))
      throw new Error(errorData.message || 'Logout failed due to an unknown error.')
    }
  }
}
