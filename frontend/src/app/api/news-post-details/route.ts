import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  if (!postId) {
    return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}news-post/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    return NextResponse.json({ message: errorData.message || 'Failed to fetch post details' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 200 });
}
