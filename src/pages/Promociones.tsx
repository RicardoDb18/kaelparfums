import { Link } from 'react-router-dom'

export default function Promociones() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Promociones</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-black mt-3 mb-4">
            Descuentos Disponibles
          </h1>
          <p className="text-black/50 max-w-xl mx-auto">
            Compra más decants y ahorra. Mientras más pruebas, más descubres.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 to-transparent border border-amber-200 rounded-2xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-display font-bold text-black mb-3">🔥 CYBER WOW — Cupón CYBERWOW</h2>
            <p className="text-black/50 mb-4 max-w-lg mx-auto">
              Agrega el cupón <strong className="text-amber-600">CYBERWOW</strong> en tu carrito y obtén descuentos adicionales acumulables con promociones vigentes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white rounded-xl p-4 border border-amber-200">
                <p className="text-xs text-black/40 uppercase tracking-wider mb-1">Decants</p>
                <p className="text-3xl font-display font-bold text-amber-600">10%</p>
                <p className="text-xs text-black/50 mt-1">OFF</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-amber-200">
                <p className="text-xs text-black/40 uppercase tracking-wider mb-1">Perfumes</p>
                <p className="text-3xl font-display font-bold text-amber-600">20%</p>
                <p className="text-xs text-black/50 mt-1">OFF</p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all"
              >
                Explorar Perfumes
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div className="bg-gradient-to-br from-amber-50 to-amber-50/50 rounded-2xl p-8 border border-amber-200 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl font-display font-bold text-amber-600">3</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-black mb-2">3–5 Decants</h3>
              <p className="text-black/50 mb-4">Lleva 3 a 5 decants y obtén</p>
              <span className="text-4xl font-display font-bold text-amber-600">10% OFF</span>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-50/50 rounded-2xl p-8 border border-amber-200 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl font-display font-bold text-amber-600">6+</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-black mb-2">6+ Decants</h3>
              <p className="text-black/50 mb-4">Lleva 6 o más decants y obtén</p>
              <span className="text-4xl font-display font-bold text-amber-600">15% OFF</span>
            </div>
          </div>
          <div className="text-center py-4">
            <p className="text-black/50 text-sm mb-6">
              *Promoción válida solo para decants (3ml, 5ml y 10ml). No acumulable con otras ofertas.
            </p>
            <Link
              to="/decants"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all"
            >
              Explorar Decants
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-transparent border border-amber-200 rounded-2xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-display font-bold text-black mb-3">📦 10% OFF en Perfumes a Pedido</h2>
            <p className="text-black/50 mb-4 max-w-lg mx-auto">
              ¿No encuentras stock de tu perfume favorito? Puedes solicitarlo como pedido especial y obtén un <strong className="text-amber-600">10% de descuento</strong>.
            </p>
            <div className="bg-white rounded-xl p-4 border border-amber-200 max-w-[200px] mx-auto mb-2">
              <p className="text-xs text-black/40 uppercase tracking-wider mb-1">A Pedido</p>
              <p className="text-3xl font-display font-bold text-amber-600">10%</p>
              <p className="text-xs text-black/50 mt-1">OFF</p>
            </div>
            <p className="text-xs text-black/30 mt-4">*No acumulable con otras promociones. Válido solo para perfumes de diseñador y árabes.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
