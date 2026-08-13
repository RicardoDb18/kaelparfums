export const WHATSAPP_NUMBER = '51918123682'

export const WHATSAPP_LINK = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

// Módulo admin (/admin) — pedidos a Google Sheets vía Google Apps Script
// 1) Deployea el script "orders-webapp.gs" como Aplicación web (acceso: Cualquier usuario).
// 2) Pega aquí la URL de la app web que te devuelve Google.
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyaIr-QDyFHpRsMqCu4yDr4LzLCe8sIDg0U-6YxG362e5Y94mLfg2ndM78uue0QtwCB/exec'

export const ADMIN_PASSWORD = 'Kael.2026'
