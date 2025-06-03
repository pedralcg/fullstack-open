//! Cargar variables de entorno
require('dotenv').config()

const mongoose = require('mongoose')

// Método .env
const url = process.env.MONGODB_URI
// console.log('Generated URL:', url)


mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


// Imprimimos todas las notas de la BBDD noteAPP
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

