'use client'

import { signin } from '@/app/actions/signin'
import Link from 'next/link'
import { useActionState } from 'react'

export default function SigninForm() {
  const [state, action, pending] = useActionState(signin, undefined)

  return (
    <form action={action} className="space-y-4 max-w-md">
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

      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-4 py-2">
        {pending ? 'Submitting...' : 'Sign In'}
      </button>

      <p className="mt-4 text-sm">
        New here?{' '}
        <Link href="/signup" className="text-blue-600 underline">
          Go to register!
        </Link>
      </p>
      {state?.message && <p className="text-red-500">{state.message}</p>}
    </form>
  )
}
