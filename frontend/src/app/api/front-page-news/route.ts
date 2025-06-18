import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}news-post/front-page/display`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()
  if (!res.ok) {
    return NextResponse.json({ message: data.message || 'Failed to fetch' }, { status: res.status })
  }

  return NextResponse.json(data)
}
