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
    .catch(error => next(error)) // ¡IMPORTANTE: añade este catch para pasar el error a next!
})

//* PUT /api/notes/:id
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body // Contiene el contenido y la importancia actualizados

  // Crea un objeto simple con los campos a actualizar
  // No necesitas 'new Note({...})' aquí, Mongoose espera un objeto JS plano
  const note = {
    content: body.content,
    important: body.important,
  }

  // findByIdAndUpdate:
  // 1er arg: el ID de la nota a actualizar
  // 2do arg: el objeto con los datos a actualizar
  // 3er arg: opciones. { new: true } devuelve la nota actualizada, no la original.
  Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' }) // Añadir runValidators: true y context: 'query' para futuras validaciones
    .then(updatedNote => {
      // Si updatedNote es null, significa que no se encontró la nota con ese ID
      if (updatedNote) {
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
    .then(result => {
      // result será el documento eliminado si se encontró, o null si no
      // Puedes verificar 'result' si quieres diferentes códigos de estado
      // Por ahora, 204 es común para éxito, independientemente de si se encontró o no
      response.status(204).end()
    })
    .catch(error => next(error)) // Pasa el error al errorHandler
})

// Middleware unknownEndpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


//! ** NUEVO: Middleware de manejo de errores **
const errorHandler = (error, request, response, next) => {
  // Imprime el mensaje de error para depuración en la consola del servidor
  console.error(error.message)

  if (error.name === 'CastError') {
    // Si el error es un CastError (ID malformado)
    return response.status(400).send({ error: 'malformatted id' })
  }

  // Para otros tipos de errores, pasa el control al siguiente middleware de Express
  // (incluido el manejador de errores predeterminado de Express si no hay más)
  next(error)
}

//* ¡Este debe ser el último middleware cargado!
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})