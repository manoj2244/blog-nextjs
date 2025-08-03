// components/ProtectedRoute.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  const toastShownRef = useRef(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (!storedToken) {
      if (!toastShownRef.current) {
        toast.error('Unauthorized! Please login.')
        toastShownRef.current = true
      }
      router.push('/login')
    } else {
      setCheckingAuth(false)
    }
  }, [router])

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    )
  }

  return <>{children}</>
}
