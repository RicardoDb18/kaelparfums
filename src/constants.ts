export const WHATSAPP_NUMBER = '51918123682'

export const WHATSAPP_LINK = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

// Módulo admin (/admin) — pedidos a Google Sheets vía Google Apps Script
// 1) Deployea el script "orders-webapp.gs" como Aplicación web (acceso: Cualquier usuario).
// 2) Pega aquí la URL de la app web que te devuelve Google.
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbylfsZXJdxWYnqViLZdNOng6eQtZd3nurroiRsPtEzNaLHjU-8uP6qVlnBu1Mo0djj_/exec'

export const ADMIN_PASSWORD = 'Kael.2026'
