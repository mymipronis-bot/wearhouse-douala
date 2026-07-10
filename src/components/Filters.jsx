import { categories, brands } from '../data/products'

export default function Filters({ activeCategory, setActiveCategory, activeBrand, setActiveBrand }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => setActiveCategory('Tout')}
        className={`text-sm font-semibold px-3 py-1.5 border-2 border-ink ${activeCategory === 'Tout' ? 'bg-ink text-cream' : 'bg-transparent'}`}
      >
        Tout
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`text-sm font-semibold px-3 py-1.5 border-2 border-ink ${activeCategory === cat ? 'bg-ink text-cream' : 'bg-transparent'}`}
        >
          {cat}
        </button>
      ))}
      <select
        value={activeBrand}
        onChange={e => setActiveBrand(e.target.value)}
        className="text-sm font-semibold px-3 py-1.5 border-2 border-ink bg-cream ml-auto"
      >
        <option value="Tout">Toutes les marques</option>
        {brands.map(b => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
    </div>
  )
}
