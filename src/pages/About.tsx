import { Link } from 'react-router-dom'

export default function About() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Nosotros</span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-black mt-3">
              Sobre Kael Parfums
            </h1>
          </div>

          <p className="text-lg text-black/60 leading-relaxed mb-10">
            En Kael Parfums somos apasionados por la perfumería. Nacimos con la misión de hacer accesibles las fragancias más exclusivas del mundo a través de nuestro sistema de decants, permitiendo a los amantes del perfume explorar, descubrir y disfrutar sin límites.
          </p>

          <h2 className="text-2xl font-display font-bold text-black mt-16 mb-4">Nuestra Historia</h2>
          <p className="text-black/60 leading-relaxed mb-6">
            Fundada en 2024, Kael Parfums nació de la frustración de no poder probar fragancias de nicho sin invertir en frascos completos. Entendimos que cada persona tiene una química única y que una fragancia huele diferente en cada piel. Por eso creamos un servicio de decants que te permite experimentar antes de comprometerte.
          </p>

          <h2 className="text-2xl font-display font-bold text-black mt-16 mb-6">Nuestra Filosofía</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-8 bg-zinc-50 rounded-xl border border-black/5">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-black mb-1">Autenticidad</h3>
              <p className="text-sm text-black/50">100% originales, garantizados</p>
            </div>
            <div className="text-center p-8 bg-zinc-50 rounded-xl border border-black/5">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-black mb-1">Accesibilidad</h3>
              <p className="text-sm text-black/50">Decants para todos los bolsillos</p>
            </div>
            <div className="text-center p-8 bg-zinc-50 rounded-xl border border-black/5">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-black mb-1">Curaduría</h3>
              <p className="text-sm text-black/50">Selección exclusiva de fragancias</p>
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold text-black mt-16 mb-4">¿Qué son los Decants?</h2>
          <p className="text-black/60 leading-relaxed mb-10">
            Los decants son muestras de perfume envasadas en frascos con atomizador, generalmente de 2ml, 5ml o 10ml. Te permiten probar una fragancia durante varios días para decidir si realmente es para ti, sin tener que comprar el frasco completo. Es la forma más inteligente de descubrir nuevos aromas.
          </p>

          <div className="text-center mt-12">
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
