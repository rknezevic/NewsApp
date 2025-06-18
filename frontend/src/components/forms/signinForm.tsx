'use client'

import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../features/actions/signin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SigninFormData } from '../../lib/definitions/signinSchema'
import Link from 'next/link'
import styles from './signinForm.module.css';


export default function SigninForm() {
  const router = useRouter()
  const [form, setForm] = useState<SigninFormData>({
    email: '',
    password: '',
  })

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push('/')
    },
    onError: (err: any) => {
      alert(err.message)
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
      className={styles.formContainer}
    >
      <h2 className={styles.heading}>LOGIN</h2>

      <h3>Sign in so you could see the news!</h3>

      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        name='email'
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        className={styles.inputField}
      />

      <label htmlFor="login-password">Password</label>
      <input
        id="login-password"
        name='password'
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Password"
        className={styles.inputField}
      />

      <button
        type="submit"
        disabled={mutation.isPending}
        className={styles.submitButton}
      >
        {mutation.isPending ? 'Signing in...' : 'Login'}
      </button>

      {mutation.error && (
        <p className={styles.errorText}>{mutation.error.message}</p>
      )}

      <a href="/signup" className={styles.link}>
        Don’t have an account? Register here!
      </a>
    </form>

  )
}
/* */
