import PostCard from "../components/PostCard"

import PostForm from "../components/PostForm"

import { usePosts } from "../context/PostContext"

function Home() {
  // Post listesi ve loading durumunu Context’ten çekiyoruz
  const { posts, loading } = usePosts()

  // Loading true iken liste/empty state göstermeyip spinner gösteriyoruz
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

  return (
    <div className="space-y-6">
      {/* Üst bilgilendirme kartı */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Postlarını yönet</h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs rounded-full border px-2 py-1 text-gray-600">
              {posts.length} post {/* Post sayısı state'ten türetilir */}
            </span>
            <span className="text-xs rounded-full border px-2 py-1 text-gray-600">
              LocalStorage 
            </span>
          </div>
        </div>
      </div>

      {/* Form solda, post listesi sağda olacak şekilde 2 kolon */}
      <div className="grid gap-6 lg:grid-cols-[420px_1fr] items-start">
        <PostForm />

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Tüm Postlar</h3>
          </div>

          {/* Post yoksa empty state göster */}
          {posts.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-gray-100 grid place-items-center text-xl">
                📝 
              </div>
              <h4 className="mt-3 font-semibold">Henüz post yok</h4>
              <p className="mt-1 text-sm text-gray-600">
                İlk postunu soldaki formdan ekleyebilirsin.
              </p>
            </div>
          ) : (
            // Post varsa listeyi map ile PostCard'a çevir
            <div className="grid gap-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} /> // key React için, post props ile gider
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
