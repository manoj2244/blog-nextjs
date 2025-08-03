'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

export const useAuth = () => {
  const router = useRouter()
  const { user, token, login, logout } = useAuthStore()
  const isAuthenticated = !!token

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser && !token) {
      login(JSON.parse(storedUser), storedToken)
    }
  }, [])

  const redirectIfUnauthorized = () => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
  }

  const redirectIfAuthenticated = () => {
    if (localStorage.getItem('token')) {
      router.push('/dashboard')
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    redirectIfUnauthorized,
    redirectIfAuthenticated,
  }
}
