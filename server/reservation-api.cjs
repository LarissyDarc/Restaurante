const { createReservation } = require('./reservations.cjs')

const MAX_BODY_BYTES = 16 * 1024

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
}

function createReservationMiddleware(reservations = []) {
  return async function reservationMiddleware(request, response, next) {
    const pathname = new URL(request.url, 'http://localhost').pathname
    if (pathname !== '/api/reservas') return next()

    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST')
      return sendJson(response, 405, { error: 'Método não permitido.' })
    }

    let body = ''
    try {
      for await (const chunk of request) {
        body += chunk
        if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
          return sendJson(response, 413, { error: 'A solicitação excede o limite permitido.' })
        }
      }
    } catch {
      return sendJson(response, 400, { error: 'Não foi possível ler os dados da reserva.' })
    }

    let input
    try {
      input = JSON.parse(body)
    } catch {
      return sendJson(response, 400, { error: 'Envie os dados da reserva em formato JSON válido.' })
    }

    const result = createReservation(input)
    if (!result.ok) return sendJson(response, 422, { errors: result.errors })

    reservations.push(result.reservation)
    return sendJson(response, 201, { reservation: result.reservation })
  }
}

module.exports = { createReservationMiddleware }