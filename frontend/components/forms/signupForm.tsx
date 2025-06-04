'use client'

import { signup } from '@/app/actions/signup'
import Link from 'next/link'
import { useActionState } from 'react'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
        {state?.errors?.name && <p className="text-red-500">{state.errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
        {state?.errors?.email && <p className="text-red-500">{state.errors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        {state?.errors?.password && (
          <ul className="text-red-500">
            {state.errors.password.map((err) => <li key={err}>- {err}</li>)}
          </ul>
        )}
      </div>

      <div>
        <label htmlFor="alias">Alias</label>
        <input id="alias" name="alias" placeholder="Alias" />
        {state?.errors?.alias && <p className="text-red-500">{state.errors.alias[0]}</p>}
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <input id="role" name="role" placeholder="Role (optional)" />
        {state?.errors?.role && <p className="text-red-500">{state.errors.role[0]}</p>}
      </div>

      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-4 py-2">
        {pending ? 'Submitting...' : 'Sign Up'}
      </button>

      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link href="/signin" className="text-blue-600 underline">
          Login here!
        </Link>
      </p>

      {state?.message && <p className="text-red-500">{state.message}</p>}
    </form>
  )
}
