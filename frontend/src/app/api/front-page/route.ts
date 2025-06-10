import { verify } from "crypto";
import { verifySession } from "../../../../lib/dal";

export const dynamic = 'force-dynamic';

export async function GET() {
    verifySession();

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

    return new Response(JSON.stringify(await res.json()), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
