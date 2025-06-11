const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')

// GET all notes - Add .populate()
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 }) // <--- AÑADE .populate()
  response.json(notes)
})

// GET specific note - Add .populate()
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id).populate('user', { username: 1, name: 1 }) // <--- AÑADE .populate()
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

// Obtención del Token
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


// POST a new note - Correct user handling
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // 1. Busca el usuario por el ID proporcionado en el cuerpo de la solicitud (decodedToken.id)
  const user = await User.findById(decodedToken.id)

  // 2. Si no se encuentra el usuario, devuelve un error 400.
  // (Esto es importante porque el campo 'user' en Note schema es requerido)
  if (!user) {
    return response.status(400).json({ error: 'user ID is missing or invalid' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id // Asigna el ObjectId real del usuario encontrado
  })

  try {
    const savedNote = await note.save() // Guarda la nota

    // 3. Añade la nota recién guardada al array de notas del usuario
    user.notes = user.notes.concat(savedNote._id)
    await user.save() // Guarda el usuario actualizado

    // 4. Popula el campo 'user' de la nota guardada antes de enviarla como respuesta
    const populatedNote = await savedNote.populate('user', { username: 1, name: 1 }) // <--- Popula antes de responder
    response.status(201).json(populatedNote)
  } catch (error) {
    next(error)
  }
})

// DELETE a note
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter

