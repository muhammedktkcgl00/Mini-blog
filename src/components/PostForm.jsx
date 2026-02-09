import { useState } from "react"

import { usePosts } from "../context/PostContext"

function PostForm() {
  // Context’ten addPost fonksiyonunu çekiyoruz
  const { addPost } = usePosts()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")

  // Hangi alanlarda hata var bilgisini tutar
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    // Form submit olunca sayfa yenilenmesin
    e.preventDefault()

    const newErrors = {}
    if (!title.trim()) newErrors.title = true // Başlık boşsa hata
    if (!content.trim()) newErrors.content = true // İçerik boşsa hata

    // Hata varsa post eklemeyi durdur, uyarıları göster
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Hata yoksa post ekle (boşlukları trim ile temizliyoruz)
    addPost({
      title: title.trim(),
      description: description.trim() || "Açıklama yok.",
      content: content.trim(),
    })

    // Formu sıfırla
    setTitle("")
    setDescription("")
    setContent("")
    setErrors({})
  }

  return (
    <section className="rounded-2xl border bg-white shadow-sm">

      <div className="p-4 border-b">
        <h2 className="text-base font-semibold">Yeni Post</h2>
        <p className="text-sm text-gray-500">Başlık ve içerik zorunlu.</p>
      </div>

      {/* Submit olunca handleSubmit çalışır */}
      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <div>
          <input
            className={`border rounded-xl p-3 w-full outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-200"
                : "focus:ring-black/15"
            }`}
            placeholder="Başlık"
            value={title} 
            onChange={(e) => {
              setTitle(e.target.value) // Yazdıkça state güncellenir
              if (errors.title) setErrors((prev) => ({ ...prev, title: false }))
            }}
          />
          {/* Başlık hatası mesajı */}
          {errors.title && (
            <p className="text-xs text-red-600 mt-1">Bu alan zorunlu</p>
          )}
        </div>

        <input
          className="border rounded-xl p-3 w-full outline-none focus:ring-2 focus:ring-black/15"
          placeholder="Açıklama (opsiyonel)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* İçerik */}
        <div>
          <textarea
            // Hata varsa kırmızı border/ring, yoksa normal
            className={`border rounded-xl p-3 w-full min-h-[120px] outline-none focus:ring-2 whitespace-pre-wrap break-words overflow-x-hidden ${
              errors.content
                ? "border-red-500 focus:ring-red-200"
                : "focus:ring-black/15"
            }`}
            placeholder="İçerik"
            value={content} // Controlled textarea
            onChange={(e) => {
              setContent(e.target.value) // Yazdıkça state güncellenir
              // Kullanıcı yazmaya başlayınca içerik hatasını temizle
              if (errors.content)
                setErrors((prev) => ({ ...prev, content: false }))
            }}
          />
          {/* İçerik hatası mesajı */}
          {errors.content && (
            <p className="text-xs text-red-600 mt-1">Bu alan zorunlu</p>
          )}
        </div>

        {/* Buton sağda dursun */}
        <div className="flex items-center justify-end">
          {/* type="submit" yazmasak da form içinde default submit */}
          <button className="rounded-xl bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2.5 hover:opacity-95 active:scale-[0.99] transition shadow-sm">
            Ekle
          </button>
        </div>
      </form>
    </section>
  )
}

export default PostForm
