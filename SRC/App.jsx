import { useState, useMemo } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Filters from './components/Filters'
import ProductCard from './components/ProductCard'
import { products } from './data/products'

const rotations = ['rotate-1.5', '-rotate-1.5', 'rotate-2.5', '-rotate-2.5', 'rotate-0']

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Tout')
  const [activeBrand, setActiveBrand] = useState('Tout')

  const filtered = useMemo(() => {
    return products.filter(p => {
      const catMatch = activeCategory === 'Tout' || p.category === activeCategory
      const brandMatch = activeBrand === 'Tout' || p.brand === activeBrand
      return catMatch && brandMatch
    })
  }, [activeCategory, activeBrand])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <div className="torn-divider" />

      <main id="catalogue" className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        <h2 className="stamp-text text-2xl mb-4">Le stock</h2>
        <Filters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
        />

        {filtered.length === 0 ? (
          <p className="text-ink/60 font-medium py-12 text-center">
            Rien ici pour l'instant. Essaie un autre filtre.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} rotate={rotations[i % rotations.length]} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t-2 border-ink bg-ink text-cream mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="stamp-text text-lg">WearHouseDouala</p>
          <p className="text-sm text-cream/70 mt-1">Douala, Cameroun · Livraison locale · WhatsApp direct</p>
        </div>
      </footer>
    </div>
  )
}
