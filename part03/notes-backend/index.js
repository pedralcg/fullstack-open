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

//! NUEVO: Middleware de manejo de errores
const errorHandler = (error, request, response, next) => {
  // Imprime el mensaje de error para depuración en la consola del servidor
  console.error(error.message)

  if (error.name === 'CastError') {
    // Si el error es un CastError (ID malformado)
    return response.status(400).send({ error: 'malformatted id' })
    // Error de validación
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  // Para otros tipos de errores, pasa el control al siguiente middleware de Express
  // (incluido el manejador de errores predeterminado de Express si no hay más)
  next(error)
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
// Añadir 'next' como tercer parámetro
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id) // Mongoose intenta convertir el ID
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end() // ID no encontrado
      }
    })
    // En caso de error (ej. CastError), pasa el error a la función next()
    .catch(error => next(error))
})

//* POST /api/notes
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => { // Usamos .save() para guardar en la base de datos
    response.json(savedNote) // Enviamos la nota guardada como respuesta
  })
    .catch(error => next(error)) // ¡IMPORTANTE: añade este catch para pasar el error a next!
})

//* PUT /api/notes/:id
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body
  // Contiene el contenido y la importancia actualizados

  // findByIdAndUpdate:
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important }, // Objeto con los campos a actualizar
    { new: true, runValidators: true, context: 'query' } // Opciones clave
  )
    .then(updatedNote => {
      if (updatedNote) { // Verificar si se encontró la nota
        response.json(updatedNote)
      } else {
        response.status(404).end() // Nota no encontrada
      }
    })
    .catch(error => next(error)) // Pasa el error al errorHandler
})

//* DELETE /api/notes/:id
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id) // Usa findByIdAndDelete de Mongoose
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error)) // Pasa el error al errorHandler
})

// Middleware unknownEndpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//* ¡Este debe ser el último middleware cargado!
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})