export default function Header() {
  return (
    <header className="border-b-2 border-ink bg-cream sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="stamp-text text-xl md:text-2xl">
          WearHouse<span className="text-safety">Douala</span>
        </a>
        <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest border border-ink px-2 py-1 rotate-1.5">
          Déstockage 🔥 237
        </span>
      </div>
    </header>
  )
}
