'use server'
import { success } from 'zod/v4'
import { SignupFormSchema, SignupActionState} from '../../../lib/definitions/signupSchema'

export async function signup(_initialState: SignupActionState, formData: FormData) {

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    alias: formData.get('alias') as string,
    role: formData.get('role') as string,
  }) 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password, alias, role } = validatedFields.data
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        alias,
        role,
      }),
    })

    console.log('Response status:', res.status)

    if (!res.ok) {
      const errorData = await res.json()
      return {
        message: errorData.message || 'Registration failed',
      }
    }

    const user = await res.json()

    return {
      success: true,
      message: 'Registration successful'
    } 
  } catch (err) {
    return {
      success: false,
      message: 'An unexpected error occurred.',
    }
  }
}
