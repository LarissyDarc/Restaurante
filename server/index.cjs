const { createServer } = require('node:http')
const { createReservationMiddleware } = require('./reservation-api.cjs')

const middleware = createReservationMiddleware()
const port = Number(process.env.API_PORT || 3001)

const server = createServer((request, response) => {
  middleware(request, response, () => {
    response.statusCode = 404
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.end(JSON.stringify({ error: 'Rota não encontrada.' }))
  })
})

server.listen(port, '127.0.0.1', () => {
  console.log(`API de reservas disponível em http://127.0.0.1:${port}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}