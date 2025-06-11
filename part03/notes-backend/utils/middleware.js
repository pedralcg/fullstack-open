const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message) // Sigue logueando el error para depuración

  // Manejo específico para errores de validación de Mongoose
  if (error.name === 'ValidationError') {
    // Para mensajes de error más amigables (ej. "User validation failed: username: Path `username` (mluukkai) is not unique.")
    return response.status(400).json({ error: error.message })
  }

  // Manejo para errores de 'CastError' (ID mal formado)
  if (error.name === 'CastError') {
    // En tu caso de Post, si el user ID no es válido para ObjectId, puede ser CastError.
    return response.status(400).send({ error: 'malformed id' })
  }

  // <--- ¡AÑADE ESTE BLOQUE para duplicados (username unique)! --->
  // error.code 11000 es el código de error de MongoDB para "Duplicate key error"
  if (error.code === 11000 && error.name === 'MongoServerError') {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  // Token invalido o ausente
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
    // Token expirado
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}