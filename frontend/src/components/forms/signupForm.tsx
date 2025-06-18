'use client'

import { registerUser } from '@/features/actions/signup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SignupFormData } from '../../lib/definitions/signupSchema'
import { useMutation } from '@tanstack/react-query'
import styles from './signupForm.module.css'
import { PublisherType } from '@/enums/PublisherType'

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
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Register</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutation.mutate(form)
        }}
        className={styles.form}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
          className={styles.inputField}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          required
          className={styles.inputField}
        />

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
          className={styles.inputField}
        />

        <label htmlFor="alias">Alias</label>
        <input
          id="alias"
          type="text"
          name="alias"
          value={form.alias}
          onChange={(e) => setForm({ ...form, alias: e.target.value })}
          placeholder="Alias"
          required
          className={styles.inputField}
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          className={styles.selectField}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value as PublisherType.Editor | PublisherType.Guest })}
        >
          <option value="editor">{PublisherType.Editor}</option>
          <option value="guest">{PublisherType.Guest }</option>
        </select>


        <button
          type="submit"
          disabled={mutation.isPending}
          className={styles.submitButton}>
          {mutation.isPending ? 'Registering...' : 'Register'}
        </button>

        {mutation.error && <p className={styles.error}>{mutation.error.message}</p>}

        <Link href="/signin" className={styles.link}>
          Already have an account? Sign in
        </Link>
      </form>
    </div>
  )
}