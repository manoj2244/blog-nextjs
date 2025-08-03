import { usePostStore } from '@/store/postStore'

export const usePosts = () => {
  const {
    posts,
    fetchPosts,
    addPost,
    updatePost,
    deletePost,
    loading,
    error,
  } = usePostStore()

  return {
    posts,
    fetchPosts,
    addPost,
    updatePost,
    deletePost,
    loading,
    error,
  }
}
