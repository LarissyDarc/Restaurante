const test = require('node:test')
const assert = require('node:assert/strict')
const { createServer } = require('node:http')
const { createReservationMiddleware } = require('./reservation-api.cjs')

async function withApi(run) {
  const server = createServer(createReservationMiddleware())
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address()

  try {
    await run(`http://127.0.0.1:${port}/api/reservas`)
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  }
}

test('CT08: creates a reservation and responds with HTTP 201', async () => {
  await withApi(async (url) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Ana', email: 'ANA@example.com', message: 'Almoço' })
    })
    const body = await response.json()

    assert.equal(response.status, 201)
    assert.equal(body.reservation.name, 'Ana')
    assert.equal(body.reservation.email, 'ana@example.com')
    assert.equal(body.reservation.status, 'received')
  })
})

test('CT09: rejects invalid reservation data with HTTP 422', async () => {
  await withApi(async (url) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'invalid' })
    })
    const body = await response.json()

    assert.equal(response.status, 422)
    assert.ok(body.errors.name)
    assert.ok(body.errors.email)
  })
})

test('CT10: rejects malformed JSON with HTTP 400', async () => {
  await withApi(async (url) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{invalid json'
    })

    assert.equal(response.status, 400)
    assert.match((await response.json()).error, /JSON válido/)
  })
})

test('CT11: rejects unsupported methods with HTTP 405', async () => {
  await withApi(async (url) => {
    const response = await fetch(url, { method: 'GET' })

    assert.equal(response.status, 405)
    assert.equal(response.headers.get('allow'), 'POST')
  })
})