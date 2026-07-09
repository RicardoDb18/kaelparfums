import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-medium uppercase tracking-[0.25em]">Contacto</span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-black mt-3">
              Contáctanos
            </h1>
            <p className="text-black/50 mt-3 max-w-xl mx-auto">
              ¿Tienes preguntas sobre nuestras fragancias, decants o pedidos? Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              {sent ? (
                <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-black/5">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-black mb-2">¡Mensaje enviado!</h3>
                  <p className="text-black/50">Te responderemos a la brevedad posible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Nombre</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-gold transition-colors"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Correo</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-gold transition-colors"
                        placeholder="tu@correo.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Asunto</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-gold transition-colors"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Mensaje</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-zinc-50 rounded-2xl border border-black/5 p-8">
                <h3 className="text-lg font-display font-semibold text-black mb-6">Información de Contacto</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-black text-sm">Teléfono</p>
                      <p className="text-black/50 text-sm mt-1">+51 999 888 777</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-black text-sm">Correo</p>
                      <p className="text-black/50 text-sm mt-1">hola@kaelparfums.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-black text-sm">Ubicación</p>
                      <p className="text-black/50 text-sm mt-1">Lima, Perú</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-2xl border border-black/5 p-8">
                <h3 className="text-lg font-display font-semibold text-black mb-4">Horario de Atención</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-black/50">Lunes - Viernes</span>
                    <span className="text-black font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-black/50">Sábados</span>
                    <span className="text-black font-medium">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-black/50">Domingos</span>
                    <span className="text-black/50">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
