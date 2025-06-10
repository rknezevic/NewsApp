import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
        redirect('/signin');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        if (!decoded) {
            redirect('/signin');
        }

        return { isAuth: true, user: decoded };

    } catch (err) {
        console.error('Session verification failed:', err);
        redirect('/signin');
    }
})