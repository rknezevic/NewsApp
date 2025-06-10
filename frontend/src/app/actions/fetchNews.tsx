
export async function fetchNews() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}news-post/front-page/display`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log('fetchNews res', res.json());
    if (!res.ok) {
        const errorData = await res.json();
        
        throw new Error(errorData.message || 'Failed to fetch news');
    }
    return await res.json();
}
