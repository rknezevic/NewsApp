'use server'
import { SignupFormData } from '../../lib/definitions/signupSchema'

export async function registerUser(formData: SignupFormData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Registration failed')
    }
    return {
      success: true,
      message: 'Registration successful',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }

}
