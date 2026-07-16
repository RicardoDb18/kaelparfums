import { Link } from 'react-router-dom'
import { brands } from '../../data/products'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-display font-bold text-white">Kael</span>
              <span className="text-2xl font-display font-light text-gold">Parfums</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Tu destino para perfumes de nicho, diseñador y árabes. Decants premium de las mejores casas del mundo.
            </p>
            <div className="flex gap-4">
              <a href="https://www.tiktok.com/@kael.parfums" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.88 2.013 9.235 2 11.665 2h.65zm-.08 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-gold">Categorías</h3>
            <ul className="space-y-3">
              <li><Link to="/shop?type=arabes" className="text-white/50 hover:text-white text-sm transition-colors">Perfumes Árabes</Link></li>
              <li><Link to="/shop?type=disenador" className="text-white/50 hover:text-white text-sm transition-colors">Perfumes de Diseñador</Link></li>
              <li><Link to="/shop?type=nicho" className="text-white/50 hover:text-white text-sm transition-colors">Perfumes de Nicho</Link></li>
              <li><Link to="/decants" className="text-white/50 hover:text-white text-sm transition-colors">Decants</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-gold">Marcas</h3>
            <ul className="space-y-3">
              {brands.slice(0, 6).map(brand => (
                <li key={brand.id}>
                  <Link to={`/shop?brand=${brand.slug}`} className="text-white/50 hover:text-white text-sm transition-colors">
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-gold">Newsletter</h3>
            <p className="text-white/50 text-sm mb-4">
              Suscríbete para recibir novedades y ofertas exclusivas.
            </p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold text-black font-semibold text-sm rounded-lg hover:bg-gold-light transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Kael Parfums. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/about" className="text-white/30 hover:text-white/60 transition-colors">Términos</Link>
            <Link to="/about" className="text-white/30 hover:text-white/60 transition-colors">Privacidad</Link>
            <Link to="/contact" className="text-white/30 hover:text-white/60 transition-colors">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
