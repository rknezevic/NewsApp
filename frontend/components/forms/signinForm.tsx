'use client'

import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../src/app/actions/signin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SigninFormData } from '../../lib/definitions/signinSchema'
import Link from 'next/link'

export default function SigninForm() {
  const router = useRouter()
  const [form, setForm] = useState<SigninFormData>({
  email: '',
  password: '',
})

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push('/front-page') 
    },
    onError: (err: any) => {
      alert(err.message)
    }
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      mutation.mutate(form)
    }}>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Signing in...' : 'Login'}
      </button>
      {mutation.error && <p className="text-red-500">{mutation.error.message}</p>}
      <Link href="/signup" className="text-blue-500 hover:underline">
        Dont have an accout? Register here!
      </Link>
    </form>
    
  )
}
