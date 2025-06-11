const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // Busqueda del usuario en la BBDD por el username de la solicitud
  const user = await User.findOne({ username })
  // verifica la password
  const passwordCorrect = user === null
    ? false
    // bcrypt.compare se usa para verificar si la contraseña es correcta
    : await bcrypt.compare(password, user.passwordHash)

  // Si no se encuentra el usuario o la contraseña es incorrecta, código de estado 401 unauthorized
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  // Si la contraseña es correcta, se crea un token con el método jwt.sign
  // el token expira in 60*60 segundos, eso es, en una hora
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )
  // El token contiene el nombre de usuario y la ID de usuario en un formato firmado digitalmente

  // Una solicitud exitosa se responde con el código de estado 200 OK
  // El token generado y el username del usuario se devuelven al cuerpo de la respuesta
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter