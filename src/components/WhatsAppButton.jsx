const WHATSAPP_NUMBER = '237674874008' // +237 674 87 40 08

export default function WhatsAppButton({ product, className = '', full = false }) {
  const message = encodeURIComponent(
    `Bonjour WearHouseDouala 👋\nJe suis intéressé(e) par : ${product.name} (${product.brand})\nTaille : ${product.size}\nPrix : ${product.price.toLocaleString('fr-FR')} FCFA\n\nEst-ce toujours disponible ?`
  )
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-ink text-cream font-body font-semibold px-4 py-2.5 hover:bg-safety transition-colors ${full ? 'w-full' : ''} ${className}`}
    >
      Commander sur WhatsApp
    </a>
  )
}
