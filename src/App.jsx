import { Routes, Route } from "react-router-dom"
// SPA routing yapmak için (sayfa yenilenmeden geçiş)

import Header from "./components/Header"

import Home from "./pages/Home"

import PostDetail from "./pages/PostDetail"

function App() {
  return (
    // Sayfanın genel layout’u (footer aşağıda kalsın diye flex-col)
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">

      {/* Tüm sayfalarda görünen navbar */}
      <Header />

      {/* Sayfa içeriği (route’lar burada değişir) */}
      <main className="mx-auto max-w-3xl px-4 py-6 flex-1 w-full">
        <Routes>
          {/* Ana sayfa */}
          <Route path="/" element={<Home />} />

          {/* Dinamik detay sayfası (/post/1, /post/2 vs.) */}
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </main>

      {/* Footer (navbar ile uyumlu) */}
      <footer>
        <div className="relative">
          {/* Üstte yumuşak geçiş efekti */}
          <div className="h-6 bg-gradient-to-b from-transparent to-black/10" />

          {/* Footer arka plan */}
          <div className="bg-gradient-to-r from-black via-gray-900 to-black">
            <div className="bg-white/5 backdrop-blur">
              <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
