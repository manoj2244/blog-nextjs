'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { usePosts } from '@/hooks/usePosts'
import ProtectedRoute from './ProtectedRoute'

interface PostFormProps {
  type: 'create' | 'edit'
  initialData?: {
    id: number
    title: string
    body: string
  }
}

export default function PostForm({ type, initialData }: PostFormProps) {
  const router = useRouter()
  const { addPost, updatePost } = usePosts()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [titleTouched, setTitleTouched] = useState(false)
  const [bodyTouched, setBodyTouched] = useState(false)

  const [titleError, setTitleError] = useState('')
  const [bodyError, setBodyError] = useState('')

  useEffect(() => {
    if (type === 'edit' && initialData) {
      setTitle(initialData.title)
      setBody(initialData.body)
    }
  }, [type, initialData])

  // Live validation on change
  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!titleTouched) setTitleTouched(true)

    if (value.trim().length === 0) {
      setTitleError('Title is required.')
    } else if (value.trim().length < 5) {
      setTitleError('Title must be at least 5 characters.')
    } else {
      setTitleError('')
    }
  }

  const handleBodyChange = (value: string) => {
    setBody(value)
    if (!bodyTouched) setBodyTouched(true)

    if (value.trim().length === 0) {
      setBodyError('Body is required.')
    } else if (value.trim().length < 10) {
      setBodyError('Body must be at least 10 characters.')
    } else {
      setBodyError('')
    }
  }

  // ✅ Final form validation (works for both create & edit)
  const isFormValid =
    title.trim().length >= 5 &&
    body.trim().length >= 10 &&
    !titleError &&
    !bodyError

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) {
      toast.error('Please fill out the form correctly.')
      return
    }

    if (type === 'create') {
      const newPost = { id: Date.now(), title, body }
      addPost(newPost)
      toast.success('Post created!')
    }

    if (type === 'edit' && initialData) {
      updatePost(initialData.id, { ...initialData, title, body })
      toast.success('Post updated!')
    }

    router.push('/dashboard')
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-md shadow-lg border border-gray-300"
        noValidate
      >
        <h2 className="text-3xl font-bold mb-8 text-black tracking-wide">
          {type === 'create' ? 'Create New Post' : 'Edit Post'}
        </h2>

        <div className="mb-6">
          <label htmlFor="title" className="block text-black font-semibold mb-2 text-lg">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter title"
            className={`w-full border rounded-md px-4 py-3 text-black placeholder:text-gray-400 shadow-sm focus:outline-none transition ${
              titleError ? 'border-red-500 focus:ring-2 focus:ring-red-400' : 'border-gray-400 focus:ring-2 focus:ring-teal-400'
            }`}
          />
          {titleTouched && titleError && (
            <p className="mt-1 text-sm text-red-600 font-medium">{titleError}</p>
          )}
        </div>

        <div className="mb-8">
          <label htmlFor="body" className="block text-black font-semibold mb-2 text-lg">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => handleBodyChange(e.target.value)}
            placeholder="Enter body content"
            className={`w-full border rounded-md px-4 py-3 min-h-[140px] resize-y text-black placeholder:text-gray-400 shadow-sm focus:outline-none transition ${
              bodyError ? 'border-red-500 focus:ring-2 focus:ring-red-400' : 'border-gray-400 focus:ring-2 focus:ring-teal-400'
            }`}
          />
          {bodyTouched && bodyError && (
            <p className="mt-1 text-sm text-red-600 font-medium">{bodyError}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="text-teal-600 font-semibold hover:text-teal-800 transition text-base cursor-pointer"
          >
            ← Back to Dashboard
          </button>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-md font-semibold shadow-md transition cursor-pointer ${
              isFormValid
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {type === 'create' ? 'Create' : 'Update'} Post
          </button>
        </div>
      </form>
    </div>
    </ProtectedRoute>
  )
}
