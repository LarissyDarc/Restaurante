const test = require('node:test')
const assert = require('node:assert/strict')
const { createReservation, validateReservation } = require('./reservations.cjs')

test('CT01: accepts a valid reservation and normalizes its fields', () => {
  const result = validateReservation({
    name: '  Ana Souza  ',
    email: '  ANA@EXAMPLE.COM ',
    message: '  Mesa para duas pessoas  '
  })

  assert.equal(result.valid, true)
  assert.deepEqual(result.value, {
    name: 'Ana Souza',
    email: 'ana@example.com',
    message: 'Mesa para duas pessoas'
  })
})

test('CT02: rejects a reservation without a name', () => {
  const result = validateReservation({ name: '  ', email: 'ana@example.com' })

  assert.equal(result.valid, false)
  assert.equal(result.errors.name, 'Informe seu nome.')
})

test('CT03: rejects a missing or malformed email', () => {
  const missingEmail = validateReservation({ name: 'Ana', email: '' })
  assert.equal(missingEmail.valid, false)
  assert.equal(missingEmail.errors.email, 'Informe seu e-mail.')

  for (const email of ['ana.example.com', 'ana@']) {
    const result = validateReservation({ name: 'Ana', email })
    assert.equal(result.valid, false, `email should be rejected: ${email}`)
    assert.equal(result.errors.email, 'Informe um e-mail válido.')
  }
})

test('CT04: rejects a name longer than 100 characters', () => {
  const result = validateReservation({ name: 'A'.repeat(101), email: 'ana@example.com' })

  assert.equal(result.valid, false)
  assert.match(result.errors.name, /100 caracteres/)
})

test('CT05: rejects a message longer than 1000 characters', () => {
  const result = validateReservation({
    name: 'Ana',
    email: 'ana@example.com',
    message: 'a'.repeat(1001)
  })

  assert.equal(result.valid, false)
  assert.match(result.errors.message, /1000 caracteres/)
})

test('CT06: rejects payloads that are not objects', () => {
  const result = validateReservation(null)

  assert.equal(result.valid, false)
  assert.equal(result.errors.form, 'Os dados da reserva devem ser um objeto.')
})

test('CT07: creates a reservation with a stable status and timestamp', () => {
  const result = createReservation(
    { name: 'Ana', email: 'ana@example.com', message: '' },
    { id: () => 'reservation-1', now: () => new Date('2026-10-19T12:00:00.000Z') }
  )

  assert.equal(result.ok, true)
  assert.deepEqual(result.reservation, {
    id: 'reservation-1',
    name: 'Ana',
    email: 'ana@example.com',
    message: '',
    status: 'received',
    createdAt: '2026-10-19T12:00:00.000Z'
  })
})