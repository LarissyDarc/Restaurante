const { randomUUID } = require('node:crypto')

const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 1000

function validateReservation(input) {
  const errors = {}

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { valid: false, errors: { form: 'Os dados da reserva devem ser um objeto.' } }
  }

  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const message = typeof input.message === 'string' ? input.message.trim() : ''

  if (!name) errors.name = 'Informe seu nome.'
  else if (name.length > MAX_NAME_LENGTH) errors.name = 'O nome deve ter no máximo 100 caracteres.'

  if (!email) errors.email = 'Informe seu e-mail.'
  else if (email.length > MAX_EMAIL_LENGTH || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Informe um e-mail válido.'
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = 'A mensagem deve ter no máximo 1000 caracteres.'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: { name, email, message }
  }
}

function createReservation(input, { id = randomUUID, now = () => new Date() } = {}) {
  const result = validateReservation(input)
  if (!result.valid) return { ok: false, errors: result.errors }

  return {
    ok: true,
    reservation: {
      id: id(),
      ...result.value,
      status: 'received',
      createdAt: now().toISOString()
    }
  }
}

module.exports = { createReservation, validateReservation }