import { Link } from 'react-router-dom'

export default function Promociones() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Promociones</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-black mt-3 mb-4">
            Descuentos por Volumen
          </h1>
          <p className="text-black/50 max-w-xl mx-auto">
            Compra más decants y ahorra. Mientras más pruebas, más descubres.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gold/10 to-transparent border border-gold/20 rounded-2xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-display font-bold text-black mb-3">🔥 CYBER WOW — Cupón CYBERWOW</h2>
            <p className="text-black/50 mb-4 max-w-lg mx-auto">
              Agrega el cupón <strong className="text-gold">CYBERWOW</strong> en tu carrito y obtén descuentos adicionales acumulables con promociones vigentes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white rounded-xl p-4 border border-gold/10">
                <p className="text-xs text-black/40 uppercase tracking-wider mb-1">Decants</p>
                <p className="text-3xl font-display font-bold text-gold">10%</p>
                <p className="text-xs text-black/50 mt-1">OFF</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gold/10">
                <p className="text-xs text-black/40 uppercase tracking-wider mb-1">Perfumes</p>
                <p className="text-3xl font-display font-bold text-gold">20%</p>
                <p className="text-xs text-black/50 mt-1">OFF</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl font-display font-bold text-gold">3</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-black mb-2">3–4 Decants</h3>
              <p className="text-black/50 mb-4">Lleva 3 o 4 decants y obtén</p>
              <span className="text-4xl font-display font-bold text-gold">10% OFF</span>
            </div>
            <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl font-display font-bold text-gold">5+</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-black mb-2">5+ Decants</h3>
              <p className="text-black/50 mb-4">Lleva 5 o más decants y obtén</p>
              <span className="text-4xl font-display font-bold text-gold">15% OFF</span>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-2xl border border-black/5 p-8 mb-14">
            <h2 className="text-xl font-display font-semibold text-black mb-4">¿Cómo funciona?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-gold text-black font-bold flex items-center justify-center shrink-0 text-sm">1</span>
                <div>
                  <p className="font-medium text-black">Elige tus decants</p>
                  <p className="text-sm text-black/50">Selecciona las fragancias que quieras probar en formato decant (3ml, 5ml o 10ml).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-gold text-black font-bold flex items-center justify-center shrink-0 text-sm">2</span>
                <div>
                  <p className="font-medium text-black">Acumula unidades</p>
                  <p className="text-sm text-black/50">Agrega al carrito 3 o más decants (pueden ser de diferentes fragancias).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-gold text-black font-bold flex items-center justify-center shrink-0 text-sm">3</span>
                <div>
                  <p className="font-medium text-black">Descuento automático</p>
                  <p className="text-sm text-black/50">El descuento se aplicará automáticamente al llegar al carrito.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
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
        </div>
      </div>
    </main>
  )
}
