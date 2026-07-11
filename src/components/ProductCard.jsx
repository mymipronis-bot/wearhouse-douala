import WhatsAppButton from './WhatsAppButton'

export default function ProductCard({ product, whatsappNumber, rotate }) {
  return (
    <div className={`hang-tag p-3 flex flex-col mt-3 ${rotate}`}>
      <div className="relative bg-[#f0ebe0] border border-ink/20">
        <img
          src={product.image_url || 'https://placehold.co/400x400/EDE6D6/1A1815?text=Photo+bientot'}
          alt={`${product.name} - ${product.brand}`}
          className="w-full h-72 object-contain"
        />
        {product.stock <= 3 && (
          <span className="absolute top-2 left-2 bg-safety text-cream text-xs font-stencil px-2 py-1">
            DERNIÈRES PIÈCES
          </span>
        )}
      </div>
      <div className="mt-3 flex-1 flex flex-col">
        <p className="text-xs uppercase tracking-wide text-ink/60 font-semibold">{product.brand}</p>
        <h3 className="stamp-text text-base leading-tight mt-0.5">{product.name}</h3>
        <p className="text-sm text-ink/70 mt-1">Taille {product.size}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="price-stamp text-sm">{product.price.toLocaleString('fr-FR')} FCFA</span>
        </div>
        <WhatsAppButton product={product} whatsappNumber={whatsappNumber} full className="mt-3 text-sm" />
      </div>
    </div>
  )
}
