import { Link } from 'react-router-dom'

export default function Newsletter() {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Mantente Informado</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-3 mb-5">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-white/50 mb-10 leading-relaxed">
            Recibe noticias sobre lanzamientos, ofertas exclusivas y contenido sobre perfumería directamente en tu bandeja de entrada.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-5 py-3.5 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors whitespace-nowrap"
            >
              Suscribirse
            </button>
          </form>
          <p className="text-white/30 text-xs mt-5">
            Al suscribirte, aceptas nuestra{' '}
            <Link to="/about" className="text-white/50 hover:text-gold underline">Política de Privacidad</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
