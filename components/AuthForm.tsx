'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'



interface Props {
  type: 'login' | 'register'
}

export default function AuthForm({ type }: Props) {
  const router = useRouter()
  const { login } = useAuth()


   const { token } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordLengthError, setPasswordLengthError] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState('')
  const [emailExistsError, setEmailExistsError] = useState('')

  // ✅ Run validation only in register mode
  useEffect(() => {
    if (type === 'register') {
      setPasswordLengthError(
        password.length > 0 && password.length < 6
          ? 'Password must be at least 6 characters'
          : ''
      )

      setPasswordMatchError(
        confirmPassword.length > 0 && password !== confirmPassword
          ? 'Passwords do not match'
          : ''
      )
    } else {
      setPasswordLengthError('')
      setPasswordMatchError('')
    }
  }, [password, confirmPassword, type])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users') || '[]')

    if (type === 'register') {
      const emailExists = users.find((u: any) => u.email === email)
      if (emailExists) {
        setEmailExistsError('Email already exists')
        toast.error('Email already exists!')
        return
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters!')
        return
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match!')
        return
      }

      const newUser = { id: Date.now(), email, password, name: 'User' }
      localStorage.setItem('users', JSON.stringify([...users, newUser]))

      toast.success('Registered successfully! Redirecting...')
      setTimeout(() => router.push('/login'), 1500)
    }

    if (type === 'login') {
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      )

      if (!user) {
        toast.error('Invalid email or password!')
        return
      }

      const token = 'mock-jwt-token'
      login(user, token)
      toast.success('Login successful! Redirecting...')
      router.push('/dashboard')
    }
  }

    useEffect(() => {
    if (token) {
      router.push('/dashboard')
    }
  }, [token, router])


  const isRegisterDisabled =
    type === 'register' &&
    (!!passwordLengthError ||
      !!passwordMatchError ||
      email.trim() === '' ||
      password.trim() === '')

      if(token){
            return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    )
      }

  return (

    
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-6 border rounded-lg shadow-sm mt-10"
    >
      <h2 className="text-2xl font-semibold text-center capitalize">{type} Form</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setEmailExistsError('')
        }}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {type === 'register' && passwordLengthError && (
        <p className="text-red-500 text-xs">{passwordLengthError}</p>
      )}

      {type === 'register' && (
        <>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {passwordMatchError && (
            <p className="text-red-500 text-xs">{passwordMatchError}</p>
          )}
        </>
      )}

    <button
  type="submit"
  disabled={isRegisterDisabled}
  className={`w-full p-2 font-semibold rounded transition ${
    isRegisterDisabled
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-blue-600 text-white hover:bg-blue-700'
  }`}
>
  {type === 'login' ? 'Login' : 'Register'}
</button>

{type === 'login' && (
  <div className="text-center mt-4">
    <p className="text-sm text-gray-600 ">
      Don&apos;t have an account?{' '}
      <button
        type="button"
        onClick={() => router.push('/register')}
        className="text-blue-600 hover:underline font-medium cursor-pointer"
      >
        Register
      </button>
    </p>
  </div>
)}

    </form>
  )
}
