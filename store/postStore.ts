import { create } from 'zustand'

export interface Post {
  id: number
  title: string
  body: string
}

interface PostState {
  posts: Post[]
  loading: boolean
  error: string | null
  fetchPosts: (start: number, limit: number) => Promise<Post[]>
  addPost: (post: Post) => void
  updatePost: (id: number, updated: Post) => void
  deletePost: (id: number) => void
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async (start = 0, limit = 10) => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
      const data: Post[] = await res.json()

      set((state) => ({
        posts: [...state.posts, ...data],
        loading: false,
      }))

      return data
    } catch (error) {
      set({ error: 'Failed to fetch posts.', loading: false })
      return []
    }
  },

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),

  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === id ? updatedPost : p)),
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
}))
