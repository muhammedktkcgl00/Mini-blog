import { createContext, useContext, useEffect, useState } from "react"

const PostContext = createContext(null)
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // SAFE LOAD (loading bug fix)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem("mini_blog_posts")
        if (saved) setPosts(JSON.parse(saved))
        else setPosts(DEFAULT_POSTS)
      } catch {
        localStorage.removeItem("mini_blog_posts")
        setPosts(DEFAULT_POSTS)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // SAVE
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("mini_blog_posts", JSON.stringify(posts))
    }
  }, [posts, loading])

  function addPost(data) {
    const newPost = {
      id: Date.now().toString(),
      ...data,
    }
    setPosts((prev) => [newPost, ...prev])
  }

  function deletePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  function updatePost(id, patch) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    )
  }

  function getPostById(id) {
    return posts.find((p) => p.id === id)
  }

  return (
    <PostContext.Provider
      value={{ posts, loading, addPost, deletePost, updatePost, getPostById }}
    >
      {children}
    </PostContext.Provider>
  )
}

export function usePosts() {
  const ctx = useContext(PostContext)
  if (!ctx) throw new Error("usePosts must be used inside PostProvider")
  return ctx
}
