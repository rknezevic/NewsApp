import 'server-only'
import { cookies } from 'next/headers'
//import { encrypt } from 'encrypt'

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000 ) // 2 hours in milliseconds
  const cookieStore = await cookies()
 
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}