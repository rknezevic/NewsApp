'use client';

export async function fetchNewsPostDetails(postId: string) {
    const res = await fetch('/api/news-post-details?postId=' + postId);
    const data = await res.json();
    if (!data) {
        throw new Error('Failed to fetch news post details');
    }
    return data;
}