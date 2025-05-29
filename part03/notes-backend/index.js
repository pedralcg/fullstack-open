//! Cargar variables de entorno
require('dotenv').config()

const express = require('express')
const app = express()

// Importa el modelo Note
const Note = require('./models/note')


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

//* GET /api/notes/:id
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  Note.findById(id).then(note => { // Usamos Mongoose para buscar por ID
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
})

//* POST /api/notes
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => { // Usamos .save() para guardar en la base de datos
    response.json(savedNote) // Enviamos la nota guardada como respuesta
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  Note.findByIdAndRemove(id).then(() => { // Usamos Mongoose para eliminar
    response.status(204).end()
  })
})

// Middleware unknownEndpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})