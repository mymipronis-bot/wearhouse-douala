export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-10 pb-8 md:pt-16 md:pb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="inline-block price-stamp mb-4">STOCK LIMITÉ</span>
          <h1 className="stamp-text text-4xl md:text-6xl leading-[0.95]">
            Chaussures & vêtements<br />
            <span className="text-safety">multi-marques.</span><br />
            Prix cassés.
          </h1>
          <p className="mt-4 text-ink/70 max-w-md font-medium">
            Nouveaux arrivages chaque semaine. Livraison à Douala. Paiement à la remise ou Mobile Money.
          </p>
        </div>
        <a
          href="#catalogue"
          className="stamp-text bg-safety text-cream px-6 py-3 whitespace-nowrap self-start md:self-auto hover:bg-ink transition-colors"
        >
          Voir le stock →
        </a>
      </div>
    </section>
  )
}
