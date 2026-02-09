import { Link } from "react-router-dom"

import { usePosts } from "../context/PostContext"
// Context içindeki fonksiyonlara erişmek için custom hook

function PostCard({ post }) {
  // Silme fonksiyonunu Context’ten alıyoruz
  const { deletePost } = usePosts()


  const preview =
    (post.content || "")
      .replace(/\s+/g, " ") // Fazla boşlukları temizle
      .trim() // Baştaki/sondaki boşlukları sil
      .slice(0, 90) + ((post.content || "").length > 90 ? "..." : "")
      // Uzunsa sonuna ... ekle

  return (
    <article className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">

          {/* Başlığa tıklayınca detay sayfasına gider çünkü aynı link verildi ikisine */}
          <Link to={`/post/${post.id}`} className="group block">
            <h2 className="text-lg font-semibold group-hover:underline break-all">
              {post.title}
            </h2>
          </Link>

          
          <p className="mt-1 text-sm text-gray-600 break-all">
            {post.description}
          </p>

          <p className="mt-2 text-sm text-gray-500 break-all">
            {preview}
          </p>
        </div>

        {/* Sağdaki küçük ikon */}
        <div className="h-10 w-10 rounded-xl bg-gray-100 grid place-items-center text-sm text-gray-700 shrink-0">
          ✨
        </div>
      </div>

      {/* Detay ve Sil butonları */}
      <div className="mt-4 flex items-center gap-2">

        {/* Detay sayfasına gider */}
        <Link
          to={`/post/${post.id}`}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 transition"
        >
          Detay
        </Link>

        {/* Sil butonuna basınca Context içindeki deletePost çalışır */}
        <button
          onClick={() => deletePost(post.id)} // Silinecek postun id’sini gönderiyoruz
          className="rounded-xl border px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        >
          Sil
        </button>
      </div>
    </article>
  )
}

export default PostCard
// PostCard component’ini başka sayfalarda kullanabilmek için export ediyoruz
