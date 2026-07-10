import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../supabaseClient'
import Header from '../components/Header'
import DeliveryBanner from '../components/DeliveryBanner'
import Hero from '../components/Hero'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'

const rotations = ['rotate-1.5', '-rotate-1.5', 'rotate-2.5', '-rotate-2.5', 'rotate-0']

export default function Site() {
  const [products, setProducts] = useState([])
  const [settings, setSettings] = useState({ business_name: 'WearHouseDouala', logo_url: null, whatsapp_number: '237674874008' })
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Tout')
  const [activeBrand, setActiveBrand] = useState('Tout')

  useEffect(() => {
    async function load() {
      const [{ data: productsData }, { data: settingsData }] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('settings').select('*').eq('id', 1).single(),
      ])
      if (productsData) setProducts(productsData)
      if (settingsData) setSettings(settingsData)
      setLoading(false)
    }
    load()
  }, [])

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products])
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const catMatch = activeCategory === 'Tout' || p.category === activeCategory
      const brandMatch = activeBrand === 'Tout' || p.brand === activeBrand
      return catMatch && brandMatch
    })
  }, [products, activeCategory, activeBrand])

  return (
    <div className="min-h-screen flex flex-col">
      <Header businessName={settings.business_name} logoUrl={settings.logo_url} />
      <DeliveryBanner />
      <Hero />
      <div className="torn-divider" />

      <main id="catalogue" className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        <h2 className="stamp-text text-2xl mb-4">Le stock</h2>

        {loading ? (
          <p className="text-ink/60 font-medium py-12 text-center">Chargement du stock...</p>
        ) : products.length === 0 ? (
          <p className="text-ink/60 font-medium py-12 text-center">
            Le stock arrive bientôt. Repasse dans quelques jours !
          </p>
        ) : (
          <>
            <Filters
              categories={categories}
              brands={brands}
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
                  <ProductCard
                    key={product.id}
                    product={product}
                    whatsappNumber={settings.whatsapp_number}
                    rotate={rotations[i % rotations.length]}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t-2 border-ink bg-ink text-cream mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="stamp-text text-lg">{settings.business_name}</p>
          <p className="text-sm text-cream/70 mt-1">Douala, Cameroun · Livraison locale · WhatsApp direct</p>
        </div>
      </footer>
    </div>
  )
      }
