import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import ProductForm from '../components/admin/ProductForm'
import ProductsList from '../components/admin/ProductsList'
import SettingsForm from '../components/admin/SettingsForm'

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError('Email ou mot de passe incorrect.')
      return
    }
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="hang-tag p-6 w-full max-w-sm mt-6">
        <h1 className="stamp-text text-xl mb-4">Connexion Admin</h1>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border-2 border-ink px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Mot de passe</label>
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full border-2 border-ink px-3 py-2" />
        </div>
        {error && <p className="text-safety text-sm mb-3">{error}</p>}
        <button type="submit" disabled={loading}
          className="stamp-text bg-ink text-cream px-4 py-2 w-full hover:bg-safety transition-colors">
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('produits')
  const [products, setProducts] = useState([])
  const [settings, setSettings] = useState(null)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  async function loadProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
  }

  async function loadSettings() {
    const { data } = await supabase.from('settings').select('*').eq('id', 1).single()
    setSettings(data)
  }

  useEffect(() => { loadProducts(); loadSettings() }, [])

  return (
    <div className="min-h-screen">
      <header className="border-b-2 border-ink bg-cream sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="stamp-text text-xl">Dashboard Admin</h1>
          <button onClick={onLogout} className="text-sm font-semibold border-2 border-ink px-3 py-1.5">
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('produits')}
            className={`text-sm font-semibold px-3 py-1.5 border-2 border-ink ${tab === 'produits' ? 'bg-ink text-cream' : ''}`}>
            Produits
          </button>
          <button onClick={() => setTab('reglages')}
            className={`text-sm font-semibold px-3 py-1.5 border-2 border-ink ${tab === 'reglages' ? 'bg-ink text-cream' : ''}`}>
            Réglages (logo, nom)
          </button>
        </div>

        {tab === 'produits' && (
          <>
            {!showForm && (
              <button onClick={() => { setEditing(null); setShowForm(true) }}
                className="stamp-text bg-safety text-cream px-4 py-2 text-sm hover:bg-ink transition-colors">
                + Ajouter un produit
              </button>
            )}
            {showForm && (
              <ProductForm
                editing={editing}
                onSaved={() => { setShowForm(false); loadProducts() }}
                onCancel={() => setShowForm(false)}
              />
            )}
            <ProductsList
              products={products}
              onEdit={p => { setEditing(p); setShowForm(true) }}
              onChanged={loadProducts}
            />
          </>
        )}

        {tab === 'reglages' && settings && (
          <SettingsForm settings={settings} onSaved={setSettings} />
        )}
      </div>
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) return null
  if (!session) return <LoginForm onLogin={() => {}} />
  return <Dashboard onLogout={() => supabase.auth.signOut()} />
            }
