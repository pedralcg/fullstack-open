const Note = require('../models/note')
const User = require('../models/user')
// const bcrypt = require('bcrypt')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const initialUsers = [
  {
    username: 'pedralcg',
    name: 'Pedro Alcoba',
    password: 'password123', // Contraseña en texto plano para bcrypt
  },
  {
    username: 'testuser2',
    name: 'Test User Two',
    password: 'password456',
  },
]

const notesInDb = async () => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

// Función auxiliar para generar un ID que no existe (para notas o usuarios)
const nonExistingId = async () => {
  // Necesitamos un usuario existente para asociar la nota temporal
  const users = await User.find({}) // Obtiene los usuarios existentes en la DB
  const firstUser = users[0] // Asume que siempre habrá al menos un usuario (del beforeEach global)

  const note = new Note({
    content: 'willremovethissoon',
    important: false,
    user: firstUser._id // <--- ¡Añade el ID del usuario aquí!
  })

  try {
    await note.save() // Intenta guardar la nota con un user válido
    await note.deleteOne() // Luego la borra
    return note._id.toString() // Devuelve el ID generado
  } catch (error) {
    console.error('Error creating temporary note in nonExistingId:', error)
    throw error // Propaga el error para que el test lo detecte
  }
}


module.exports = {
  initialNotes, initialUsers, nonExistingId, notesInDb, usersInDb
}