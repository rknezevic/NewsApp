'use client';

export async function fetchNews() {
    const res = await fetch('/api/front-page-news') 

  const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch news');
    }
    return data;
}

