'use server'
import { cookies } from "next/headers"
import { SigninActionState, SigninFormSchema } from "../../../lib/definitions/signinSchema"
import { createSession } from "../../../lib/session"

export async function signin(_initialState: SigninActionState, formData: FormData) {

    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        if (!res.ok) {
            const errorData = await res.json()
            return {
                message: errorData.message || 'Login failed',
            }
        }

        const data = await res.json()
        const token = data.token

        await createSession(token);
        const cookieStore = await cookies()

        console.log(cookieStore.get('session'));

        return {
            success: true,
            message: 'Login successful',
        }
    } catch (err) {
        return {
            success: false,
            message: 'An unexpected error occurred.',
        }
    }
}
