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

// Perfumes enteros (mayores a 10ml) -> hoja "Pedidos".
// Decants (10ml o menos) -> hoja "Decants".
const SHEET_NAME = 'Pedidos'
const DECANTS_SHEET_NAME = 'Decants'
const DECANT_MAX_ML = 10

// ID de la hoja de cálculo (de la URL: /spreadsheets/d/ESTE_ES_EL_ID/edit)
const SPREADSHEET_ID = '1-c6zcb1h60H9Wj8AWKen0_c1Pi_2582jQHgRa6rDwYc'

const COLUMNS = [
  'Fecha', 'Estado', 'Nombres', 'Celular', 'DNI', 'Método de envío',
  'Destino', 'Dirección', 'Distrito', 'Referencia', 'Detalle',
  'Subtotal', 'Descuento', 'Cupón', 'Total', 'Notas', 'Origen',
]

function getSheet_(name) {
  var ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet()

  var sheet = ss.getSheetByName(name)
  if (!sheet) sheet = ss.insertSheet(name)
  return sheet
}

function ensureHeader_(sheet) {
  var hasHeader = sheet.getLastRow() > 0 && sheet.getRange(1, 1).getValue() === 'Fecha'
  if (!hasHeader) sheet.appendRow(COLUMNS)
}

function formatLine_(l) {
  return (
    l.name + ' x' + l.quantity +
    (l.onDemand ? ' [A pedido]' : '') +
    ' — S/' + (Number(l.price) * Number(l.quantity)).toFixed(2)
  )
}

function sumLines_(lines) {
  return lines.reduce(function (s, l) {
    return s + Number(l.price) * Number(l.quantity)
  }, 0)
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
    var c = payload.client || {}

    var allLines = payload.lines || []
    var decantLines = allLines.filter(function (l) { return Number(l.ml) <= DECANT_MAX_ML })
    var wholeLines = allLines.filter(function (l) { return Number(l.ml) > DECANT_MAX_ML })

    // El descuento de decants aplica solo a decants; el cupón solo a perfumes enteros.
    var decantSubtotal = sumLines_(decantLines)
    var wholeSubtotal = sumLines_(wholeLines)
    var decantTotal = decantSubtotal - (payload.discount || 0)
    var wholeTotal = wholeSubtotal - (payload.couponDiscount || 0)

    var savedSheets = []

    if (wholeLines.length > 0) {
      var pedidos = getSheet_(SHEET_NAME)
      ensureHeader_(pedidos)
      pedidos.appendRow([
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
        wholeLines.map(formatLine_).join('\n'),
        wholeSubtotal,
        0,
        payload.couponCode ? payload.couponCode + ': -' + (payload.couponDiscount || 0) : '',
        wholeTotal,
        payload.notas || '',
        payload.source || 'admin',
      ])
      savedSheets.push({ sheet: SHEET_NAME, row: pedidos.getLastRow() })
    }

    if (decantLines.length > 0) {
      var decants = getSheet_(DECANTS_SHEET_NAME)
      ensureHeader_(decants)
      decants.appendRow([
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
        decantLines.map(formatLine_).join('\n'),
        decantSubtotal,
        payload.discount || 0,
        '',
        decantTotal,
        payload.notas || '',
        payload.source || 'admin',
      ])
      savedSheets.push({ sheet: DECANTS_SHEET_NAME, row: decants.getLastRow() })
    }

    return jsonResponse_({ ok: true, sheets: savedSheets })
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

// Página de estado: abrir la URL /exec en el navegador para verificar.
function doGet() {
  try {
    var pedidos = getSheet_(SHEET_NAME)
    var decants = getSheet_(DECANTS_SHEET_NAME)
    return html_(
      '<h2>Kael Parfums — Web App activa</h2>' +
      '<p>Hoja <b>' + SHEET_NAME + '</b> (perfumes enteros): fila <b>' + pedidos.getLastRow() + '</b>.</p>' +
      '<p>Hoja <b>' + DECANTS_SHEET_NAME + '</b> (decants): fila <b>' + decants.getLastRow() + '</b>.</p>' +
      '<p>La URL funciona.</p>'
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
        lines: [
          { name: 'Decant EDP 3ml', ml: 3, price: 35, quantity: 1, onDemand: false },
          { name: 'Perfume EDP 100ml', ml: 100, price: 449, quantity: 1, onDemand: false },
        ],
        subtotal: 484, discount: 0, couponCode: '', couponDiscount: 0, total: 484,
        notas: 'Fila de prueba', source: 'admin',
      }),
    },
  }
  Logger.log(JSON.stringify(doPost(e)))
}