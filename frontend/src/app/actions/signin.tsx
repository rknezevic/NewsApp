'use server'
import {  SigninFormData } from "../../../lib/definitions/signinSchema"
import { createSession } from "../../../lib/session"

export async function loginUser(data: SigninFormData) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', //cookies
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Login failed');
  }

    const responseData = await res.json()
    const token = responseData.token

    await createSession(token);

  return {
            success: true,
            message: 'Login successful',
        }
}
