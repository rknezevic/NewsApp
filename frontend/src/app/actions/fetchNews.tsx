'use client';

export async function fetchNews() {
    const res = await fetch('/api/front-page-news') // Now calls your own server API

  const data = await res.json()
    console.log('fetchNews res', data);
    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch news');
    }
    return data;
}

