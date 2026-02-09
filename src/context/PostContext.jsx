import { createContext, useContext, useEffect, useState } from "react"

// Post verilerini tüm uygulamada paylaşacağımız context
const PostContext = createContext(null)

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([])

  // İlk açılışta loading göstermek için
  const [loading, setLoading] = useState(true)

  // İlk açılışta localStorage'tan oku + 300ms loading simülasyonu
  useEffect(() => {
    // 300ms sonra veriyi yükle
    const timer = setTimeout(() => {
      const saved = localStorage.getItem("mini_blog_posts") // Kaydedilmiş postları oku
      if (saved) setPosts(JSON.parse(saved)) // Varsa state'e bas
      else setPosts(DEFAULT_POSTS) // Yoksa demo postları yükle
      setLoading(false) // Loading bitti
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Posts değişince localStorage'a yaz
  useEffect(() => {
    // İlk açılışta boş [] yazıp localStorage'ı bozmasın diye loading kontrolü
    if (!loading) {
      localStorage.setItem("mini_blog_posts", JSON.stringify(posts))
    }
  }, [posts, loading])

  function addPost({ title, description, content }) {
    const newPost = {
      id: Date.now().toString(), // Benzersiz id üret (string)
      title,
      description,
      content,
    }
    // Yeni postu listenin en başına ekle (en güncel üstte)
    setPosts((prev) => [newPost, ...prev])
  }

  function deletePost(id) {
    // Silmeden önce kullanıcıdan onay al
    const ok = window.confirm("Silmek istediğine emin misin?")
    if (!ok) return
    // Seçilen id'ye sahip postu listeden çıkar
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  function getPostById(id) {
    // Detay sayfası için id'ye göre tek post bul
    return posts.find((p) => p.id === id)
  }

  return (
    // Context ile state + fonksiyonları tüm children'a dağıtıyoruz
    <PostContext.Provider value={{ posts, loading, addPost, deletePost, getPostById }}>
      {children} {/* Provider'ın içine sarılan tüm component'ler */}
    </PostContext.Provider>
  )
}

export function usePosts() {
  const ctx = useContext(PostContext) // Provider'dan gelen value'yu al
  // Provider dışında kullanılırsa direkt hata ver (güvenlik)
  if (!ctx) throw new Error("usePosts must be used inside PostProvider")
  return ctx
}
