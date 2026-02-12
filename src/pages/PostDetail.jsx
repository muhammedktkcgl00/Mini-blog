import { Link, useParams } from "react-router-dom"
import { usePosts } from "../context/PostContext"
import { useEffect, useState } from "react"

function PostDetail() {
  const { id } = useParams()
  const { getPostById, loading, updatePost } = usePosts()

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

  const post = getPostById(id)

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDesc, setEditDesc] = useState("")
  const [editContent, setEditContent] = useState("")
  const [errors, setErrors] = useState({}) // ✅ title/content errorlarını tutar

  // Post gelince edit alanlarını doldur
  useEffect(() => {
    if (post) {
      setEditTitle(post.title || "")
      setEditDesc(post.description || "")
      setEditContent(post.content || "")
      setErrors({})
    }
  }, [post])

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

  function handleSave() {
    // ✅ Trim + validation (edit modunda da boş bırakmayı engelle)
    const newErrors = {}
    if (!editTitle.trim()) newErrors.title = true
    if (!editContent.trim()) newErrors.content = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    updatePost(post.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      content: editContent.trim(),
    })
    setIsEditing(false)
    setErrors({})
  }

  function handleCancel() {
    // Vazgeçince eski haline geri dön
    setEditTitle(post.title || "")
    setEditDesc(post.description || "")
    setEditContent(post.content || "")
    setIsEditing(false)
    setErrors({})
  }

  return (
    <div className="space-y-4">
      {/* Geri */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 hover:text-black transition"
      >
        <span className="text-base">←</span>
        <span>Geri</span>
      </Link>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <div className="space-y-3">
                {/* Title */}
                <div>
                  <input
                    className={`w-full border rounded-xl p-3 outline-none focus:ring-2 font-semibold ${
                      errors.title
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-black/15"
                    }`}
                    value={editTitle}
                    onChange={(e) => {
                      setEditTitle(e.target.value)
                      if (errors.title)
                        setErrors((prev) => ({ ...prev, title: false }))
                    }}
                    placeholder="Başlık"
                  />
                  {errors.title && (
                    <p className="text-xs text-red-600 mt-1">
                      Başlık zorunlu.
                    </p>
                  )}
                </div>

                {/* Description (opsiyonel) */}
                <input
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black/15"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="Açıklama (opsiyonel)"
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold break-all">{post.title}</h1>
                <p className="mt-1 text-sm text-gray-600 break-all">
                  {post.description}
                </p>
              </>
            )}
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2">
            <div className="h-10 w-10 rounded-xl bg-gray-100 grid place-items-center">
              📰
            </div>

            {/* Edit butonları */}
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className={`rounded-xl px-3 py-2 text-sm transition ${
                    Object.keys(errors).length > 0
                      ? "bg-red-600 text-white hover:opacity-90"
                      : "bg-black text-white hover:opacity-90"
                  }`}
                >
                  Kaydet
                </button>
                <button
                  onClick={handleCancel}
                  className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 transition"
                >
                  Vazgeç
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 transition"
              >
                Düzenle
              </button>
            )}
          </div>
        </div>

        <hr className="my-5" />

        {/* Content */}
        {isEditing ? (
          <div>
            <textarea
              className={`w-full border rounded-xl p-3 min-h-[180px] outline-none focus:ring-2 whitespace-pre-wrap break-words overflow-x-hidden ${
                errors.content
                  ? "border-red-500 focus:ring-red-200"
                  : "focus:ring-black/15"
              }`}
              value={editContent}
              onChange={(e) => {
                setEditContent(e.target.value)
                if (errors.content)
                  setErrors((prev) => ({ ...prev, content: false }))
              }}
              placeholder="İçerik"
            />
            {errors.content && (
              <p className="text-xs text-red-600 mt-1">İçerik zorunlu.</p>
            )}
          </div>
        ) : (
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap break-all">
            {post.content}
          </p>
        )}
      </div>
    </div>
  )
}

export default PostDetail
