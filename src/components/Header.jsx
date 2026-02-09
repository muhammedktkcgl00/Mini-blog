import { Link } from "react-router-dom" 
// Sayfa yenilenmeden ana sayfaya geçmek için Link kullanıyoruz (SPA)

function Header() {
  return (
    // Navbar sticky ile yukarı sabitlenir z-20 ile üstte kalır
    <header className="sticky top-0 z-20">
      
      {/* Arka plan gradient katmanı */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950" />
      
      {/* Alt çizgi + cam efekti */}
      <div className="absolute inset-0 border-b border-white/10 bg-white/5 backdrop-blur" />

      {/* İçerik alanı */}
      <div className="relative mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        
        {/* Logoya tıklayınca ana sayfaya gider */}
        <Link to="/" className="flex items-center gap-3">
          
          {/* Logo kutusu */}
          <div className="h-10 w-10 rounded-xl bg-white/10 ring-1 ring-white/15 text-white grid place-items-center font-bold">
            MB
          </div>

          {/* Başlık metinleri */}
          <div>
            <p className="text-xs text-white/70 leading-none">Mini Blog</p>
            <h1 className="text-lg font-semibold leading-tight text-white">
              Dashboard
            </h1>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
// Header component'ini diğer dosyalarda kullanabilmek için export ediyoruz
