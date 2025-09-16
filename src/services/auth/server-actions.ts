"use server"

import { cookies } from 'next/headers'
import { AuthLoginResponse, AuthRegisterResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string
const TOKEN_COOKIE_NAME = 'access_token'

export async function loginAction(email: string, password: string): Promise<AuthLoginResponse> {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const message = await safeReadError(res)
    throw new Error(message || 'Login failed')
  }

  const data = (await res.json()) as AuthLoginResponse

  const token = data?.data?.token
  if (token) {
    (await cookies()).set(TOKEN_COOKIE_NAME, token, {
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return data
}

async function safeReadError(res: Response): Promise<string | undefined> {
  try {
    const json = (await res.json()) as Partial<AuthLoginResponse> & { message?: string }
    return json?.message
  } catch {
    return undefined
  }
}


export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");

    return { success: true };
  } catch {
    return { error: "Logout failed" };
  }
}

export async function registerAction(name: string, email: string, password: string): Promise<AuthRegisterResponse> {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const message = await safeReadError(res)
    throw new Error(message || 'Registration failed')
  }

  const data = (await res.json()) as AuthRegisterResponse

  const token = data?.data?.access_token
  if (token) {
    (await cookies()).set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return data
}