import { WHATSAPP_LINK } from '../../constants'

export default function Newsletter() {
  const handleJoin = () => {
    window.open(WHATSAPP_LINK('Quiero unirme a la comunidad'), '_blank')
  }

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Comunidad</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-3 mb-5">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-white/50 mb-10 leading-relaxed">
            Sé parte de nuestro círculo exclusivo y recibe novedades, lanzamientos y ofertas especiales directamente por WhatsApp.
          </p>
          <button
            onClick={handleJoin}
            className="px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors whitespace-nowrap"
          >
            Unirme a la comunidad
          </button>
          <p className="text-white/30 text-xs mt-5">
            Al unirte recibirás mensajes promocionales. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  )
}
