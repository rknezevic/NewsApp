import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
  alias: z
    .string()
    .min(2, { message: 'Alias must be at least 2 characters long.' })
    .trim(),
  role: z.enum(['user', 'editor'], {
    message: 'Role can be either "user" or "editor".',
  }),
})

export type SignupFormData = z.infer<typeof SignupFormSchema>

 
export type SignupActionState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        alias?: string[]
        role?: string[]
      }
      message?: string
    }
  | undefined
