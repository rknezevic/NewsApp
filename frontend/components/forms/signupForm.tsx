'use client'

import { registerUser } from '@/app/actions/signup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {  useState } from 'react'
import { SignupFormData } from '../../lib/definitions/signupSchema'
import { useMutation } from '@tanstack/react-query'

export default function SignupForm() {
  const router = useRouter()
  const [form, setForm] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    alias: '',
    role: 'guest',
  })

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.success) {
        router.push('/signin') 
      } else {
        alert(data.message || 'Registration failed')
      }
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
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="text"
        value={form.alias}
        onChange={(e) => setForm({ ...form, alias: e.target.value })}
        placeholder="Alias"
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value as 'editor' | 'guest' })}
      >
        <option value="editor">Editor</option>
        <option value="guest">Guest</option>
      </select>
      
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Registration in process...' : 'Register'}
      </button>
      {mutation.error && <p className="text-red-500">{mutation.error.message}</p>}
      <Link href="/signin" className="text-blue-500 hover:underline">
        Already have an account? Sign in
      </Link>
    </form>
  )
}
/*'
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
    </form>
  )
}
 */