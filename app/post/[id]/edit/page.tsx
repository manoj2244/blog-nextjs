'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { usePosts } from '@/hooks/usePosts'
import PostForm from '@/components/postForm'

export default function EditPostPage() {
  const { id } = useParams()
  const { posts, fetchPosts } = usePosts()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    const loadPost = async () => {
      const postId = Number(id)

      if (!posts.length) {
        const res = await fetchPosts(0, 100) // ✅ fetch enough posts
        const found = res.find((p) => p.id === postId)
        setPost(found)
      } else {
        const found = posts.find((p) => p.id === postId)
        setPost(found)
      }

      setLoading(false)
    }

    loadPost()
  }, [id, posts])

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading post...</div>
  }

  if (!post) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Post not found or may have been deleted.
        <div>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 text-teal-600 underline text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return        <PostForm  type="edit" initialData={post}/>

   

  
}
