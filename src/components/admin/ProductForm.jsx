import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import ImageUpload from './ImageUpload'

const empty = { name: '', brand: '', category: 'Chaussures', size: '', price: '', stock: 1, image_url: '' }

export default function ProductForm({ editing, onSaved, onCancel }) {
  const [form, setForm] = useState(editing || empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      size: form.size,
      price: parseInt(form.price, 10),
      stock: parseInt(form.stock, 10),
      image_url: form.image_url || null,
    }

    const { error: dbError } = editing
      ? await supabase.from('products').update(payload).eq('id', editing.id)
      : await supabase.from('products').insert(payload)

    setSaving(false)
    if (dbError) {
      setError('Erreur : ' + dbError.message)
      return
    }
    onSaved()
  }

  return (
    <form onSubmit={handleSubmit} className="hang-tag p-4 mt-3 space-y-3 max-w-md">
      <h3 className="stamp-text text-lg">{editing ? 'Modifier le produit' : 'Nouveau produit'}</h3>

      <div>
        <label className="block text-sm font-semibold mb-1">Nom</label>
        <input required value={form.name} onChange={e => update('name', e.target.value)}
          className="w-full border-2 border-ink px-3 py-2" placeholder="Air Max 90" />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Marque</label>
        <input required value={form.brand} onChange={e => update('brand', e.target.value)}
          className="w-full border-2 border-ink px-3 py-2" placeholder="Nike" />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Catégorie</label>
        <select value={form.category} onChange={e => update('category', e.target.value)}
          className="w-full border-2 border-ink px-3 py-2">
          <option>Chaussures</option>
          <option>Vêtements</option>
        </select>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Taille</label>
          <input required value={form.size} onChange={e => update('size', e.target.value)}
            className="w-full border-2 border-ink px-3 py-2" placeholder="42" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Stock</label>
          <input required type="number" min="0" value={form.stock} onChange={e => update('stock', e.target.value)}
            className="w-full border-2 border-ink px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Prix (FCFA)</label>
        <input required type="number" min="0" value={form.price} onChange={e => update('price', e.target.value)}
          className="w-full border-2 border-ink px-3 py-2" placeholder="25000" />
      </div>

      <ImageUpload currentUrl={form.image_url} onUploaded={url => update('image_url', url)} label="Photo du produit" />

      {error && <p className="text-safety text-sm">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={saving}
          className="stamp-text bg-ink text-cream px-4 py-2 hover:bg-safety transition-colors text-sm">
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button type="button" onClick={onCancel}
          className="text-sm font-semibold px-4 py-2 border-2 border-ink">
          Annuler
        </button>
      </div>
    </form>
  )
}
