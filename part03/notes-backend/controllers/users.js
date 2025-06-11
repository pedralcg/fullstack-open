const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  // Popula las notas asociadas al usuario si quieres verlas
  const users = await User.find({}).populate('notes', { content: 1, important: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  // Validación de longitud mínima de la contraseña
  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error) // Pasa el error al middleware de errores ( ValidationError o MongoServerError)
  }
})

module.exports = usersRouter