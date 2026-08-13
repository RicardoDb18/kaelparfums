/**
 * Kael Parfums — Web App de pedidos (Google Apps Script)
 * =======================================================
 * Guarda los pedidos del módulo /admin como filas en una hoja
 * de cálculo de Google Drive.
 *
 * NOTA: Si al hacer "Extensiones -> Apps Script" te sale
 * "Sorry, unable to open the file at this time", es un fallo del
 * propio Google. Usa la ruta B (proyecto independiente).
 *
 * CÓMO CONECTARLA (una sola vez, ~5 min) — RUTA B (RECOMENDADA):
 *
 * 1) Crea la hoja de cálculo nueva:
 *      https://sheets.google.com/create   (Botón "+")
 *    Asígnale un nombre (ej. "Kael Parfums — Pedidos").
 *
 * 2) Copia el ID de la hoja. Está en la URL de la hoja:
 *      https://docs.google.com/spreadsheets/d/AQUI_EL_ID/edit
 *    y pégalo en la constante SPREADSHEET_ID (línea 46).
 *
 * 3) Abre el editor de Apps Script independiente:
 *      https://script.google.com -> "Nuevo proyecto"
 *    Borra el contenido y pega TODO este archivo en Code.gs.
 *
 * 4) Clic en "Implementar" -> "Nueva implementación" ->
 *      Tipo:        Aplicación web
 *      Ejecutar como: Yo
 *      Acceso:      Cualquier usuario
 *    Clic en "Implementar", acepta los permisos y copia la URL
 *    de la aplicación web (termina en /exec).
 *
 * 5) En el proyecto web, pega esa URL en:
 *      src/constants.ts -> APPS_SCRIPT_URL
 *
 * 6) Rebuild y deploy. Cada pedido nuevo del panel /admin se
 *    agrega automáticamente como una fila en la hoja "Pedidos".
 *
 * RUTA A (opcional): si el menú de tu hoja sí funciona, crea el
 *   script desde "Extensiones -> Apps Script" (queda vinculado).
 *   Entonces puedes dejar SPREADSHEET_ID vacío.
 */

const SHEET_NAME = 'Pedidos'

// ID de la hoja de cálculo (de la URL: /spreadsheets/d/ESTE_ES_EL_ID/edit)
const SPREADSHEET_ID = '1-c6zcb1h60H9Wj8AWKen0_c1Pi_2582jQHgRa6rDwYc'

const COLUMNS = [
  'Fecha', 'Estado', 'Nombres', 'Celular', 'DNI', 'Método de envío',
  'Destino', 'Dirección', 'Distrito', 'Referencia', 'Detalle',
  'Subtotal', 'Descuento', 'Cupón', 'Total', 'Notas', 'Origen',
]

function getSheet_() {
  var ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet()

  var sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME)
  return sheet
}

// Fecha y hora actual en Lima (Perú, UTC-5). Perú no usa horario de verano.
function nowLima_() {
  return Utilities.formatDate(new Date(), 'America/Lima', 'yyyy-MM-dd HH:mm:ss')
}

function doPost(e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var payload = JSON.parse(e.postData.contents)
    var sheet = getSheet_()

    var hasHeader = sheet.getLastRow() > 0 && sheet.getRange(1, 1).getValue() === 'Fecha'
    if (!hasHeader) sheet.appendRow(COLUMNS)

    var c = payload.client || {}

    var detail = (payload.lines || [])
      .map(function (l) {
        return (
          l.name + ' x' + l.quantity +
          (l.onDemand ? ' [A pedido]' : '') +
          ' — S/' + (Number(l.price) * Number(l.quantity)).toFixed(2)
        )
      })
      .join('\n')

    sheet.appendRow([
      nowLima_(),
      payload.estado || 'Nuevo',
      c.nombres || '',
      c.celular || '',
      c.dni || '',
      payload.shippingMethod || '',
      c.destino || '',
      c.direccion || '',
      c.distrito || '',
      c.referencia || '',
      detail,
      payload.subtotal != null ? payload.subtotal : '',
      payload.discount || 0,
      payload.couponCode ? payload.couponCode + ': -' + (payload.couponDiscount || 0) : '',
      payload.total != null ? payload.total : '',
      payload.notas || '',
      payload.source || 'admin',
    ])

    return jsonResponse_({ ok: true, row: sheet.getLastRow() })
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

// Página de estado: abrir la URL /exec en el navegador para verificar.
function doGet() {
  try {
    var sheet = getSheet_()
    return html_(
      '<h2>Kael Parfums — Web App activa</h2>' +
      '<p>Hoja <b>' + SHEET_NAME + '</b> encontrada. La URL funciona.</p>' +
      '<p>Última fila: <b>' + sheet.getLastRow() + '</b></p>'
    )
  } catch (err) {
    return html_('<h2>Error de configuración</h2><pre>' + String(err) + '</pre>')
  }
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}

function html_(body) {
  return HtmlService.createHtmlOutput('<body style="font-family:sans-serif">' + body + '</body>')
}

// Para probar desde el editor sin abrir el navegador:
// selecciona testPost_ y clic en "Ejecutar".
function testPost_() {
  var e = {
    postData: {
      contents: JSON.stringify({
        fecha: new Date().toISOString(),
        estado: 'Prueba',
        client: { nombres: 'Test', celular: '999999999', dni: '', destino: '', direccion: '', distrito: '', referencia: '' },
        shippingMethod: 'tienda',
        lines: [{ name: 'Prueba EDP 3ml', ml: 3, price: 35, quantity: 1, onDemand: false }],
        subtotal: 35, discount: 0, couponCode: '', couponDiscount: 0, total: 35,
        notas: 'Fila de prueba', source: 'admin',
      }),
    },
  }
  Logger.log(JSON.stringify(doPost(e)))
}