import { Link, useParams } from "react-router-dom"
// Link: sayfa yenilenmeden geri dönmek için
// useParams: URL’deki :id parametresini almak için

import { usePosts } from "../context/PostContext"

function PostDetail() {
  // URL'den id al (örnek: /post/123 → id = "123")
  const { id } = useParams()

  // Context’ten post bulma fonksiyonu ve loading state’i
  const { getPostById, loading } = usePosts()

  if (loading) {
    return (
      <div className="py-20 grid place-items-center">
        <div className="flex items-center gap-3 text-gray-600">
          <span className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-gray-900 animate-spin" />
          <span>Yükleniyor...</span>
        </div>
      </div>
    )
  }

  // id'ye göre tek postu bul
  const post = getPostById(id)

  if (!post) {
    return (
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <p className="text-red-600 font-semibold">Post bulunamadı.</p>
        <Link to="/" className="mt-3 inline-block text-blue-600 underline">
          Geri dön
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Ana sayfaya SPA şekilde geri dönüş */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 hover:text-black transition"
      >
        <span className="text-base">←</span>
        <span>Geri</span>
      </Link>

      {/* Detay kartı */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            {/* break-all: uzun başlık taşmasın diye */}
            <h1 className="text-2xl font-bold break-all">{post.title}</h1>

            <p className="mt-1 text-sm text-gray-600 break-all">
              {post.description}
            </p>
          </div>

          <div className="h-10 w-10 rounded-xl bg-gray-100 grid place-items-center">
            📰
          </div>
        </div>

        <hr className="my-5" />

        {/* İçerik: satır sonlarını koru + taşmayı engelle */}
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap break-all">
          {post.content}
        </p>
      </div>
    </div>
  )
}

export default PostDetail
