import { supabase } from '../../supabaseClient'

export default function ProductsList({ products, onEdit, onChanged }) {
  async function handleDelete(id) {
    if (!confirm('Supprimer ce produit ?')) return
    await supabase.from('products').delete().eq('id', id)
    onChanged()
  }

  if (products.length === 0) {
    return <p className="text-ink/60 mt-4">Aucun produit pour l'instant. Ajoute le premier ci-dessus.</p>
  }

  return (
    <div className="mt-4 space-y-2">
      {products.map(p => (
        <div key={p.id} className="flex items-center gap-3 border-2 border-ink bg-cream p-2">
          <img
            src={p.image_url || 'https://placehold.co/80x80/EDE6D6/1A1815?text=?'}
            alt={p.name}
            className="w-14 h-14 object-cover border border-ink/30"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{p.name} — {p.brand}</p>
            <p className="text-xs text-ink/60">
              {p.category} · Taille {p.size} · {p.price.toLocaleString('fr-FR')} FCFA · Stock {p.stock}
            </p>
          </div>
          <button onClick={() => onEdit(p)} className="text-xs font-semibold border-2 border-ink px-2 py-1">
            Éditer
          </button>
          <button onClick={() => handleDelete(p.id)} className="text-xs font-semibold border-2 border-safety text-safety px-2 py-1">
            Suppr.
          </button>
        </div>
      ))}
    </div>
  )
}
