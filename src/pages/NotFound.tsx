import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center py-20">
        <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Error 404</span>
        <h1 className="text-4xl font-display font-bold text-black mt-4 mb-4">Página no encontrada</h1>
        <p className="text-black/50 mb-8 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
