'use client'

import { verifySession } from '../../../lib/dal';
import { useQuery } from '@tanstack/react-query';

export async function fetchNews() {

    await verifySession();

    const newsQuery = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}news-post/front-page/display`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch news');
            }
            console.log('Response status:', res.json());
            return await res.json();
        }
    });
    if (newsQuery.isError) {
        console.error('Error fetching news:', newsQuery.error);
        throw newsQuery.error;
    }
    if (newsQuery.isLoading) {
        console.log('Loading news...');
        return { isLoading: true, news: [] };
    }
}