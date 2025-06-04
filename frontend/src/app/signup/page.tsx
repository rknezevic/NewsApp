// app/login/page.tsx
'use client'

import SignupForm from "../../../components/forms/signupForm"

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <SignupForm />
    </div>
  )
}
