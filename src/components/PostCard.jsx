import { Link } from "react-router-dom"
import { useState } from "react"
import { usePosts } from "../context/PostContext"
import ConfirmModal from "./ConfirmModal"

function PostCard({ post }) {
  const { deletePost } = usePosts()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const preview =
    (post.content || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 90) + ((post.content || "").length > 90 ? "..." : "")

  return (
    <article className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {/* Başlığa tıklayınca detaya gider + hover underline */}
          <Link to={`/post/${post.id}`} className="group block">
            <h2 className="text-lg font-semibold break-all group-hover:underline">
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

        <div className="h-10 w-10 rounded-xl bg-gray-100 grid place-items-center text-sm text-gray-700 shrink-0">
          ✨
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          to={`/post/${post.id}`}
          className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 transition"
        >
          Detay
        </Link>

        <button
          onClick={() => setConfirmOpen(true)}
          className="rounded-full border px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        >
          Sil
        </button>
      </div>

      {/* Silme onayı */}
      <ConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          deletePost(post.id)
          setConfirmOpen(false)
        }}
      />
    </article>
  )
}

export default PostCard
