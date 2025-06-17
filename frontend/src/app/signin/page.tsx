// app/login/page.tsx
'use client'

import SigninForm from "../../../components/forms/signinForm"

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <SigninForm />
    </div>
  )
}
