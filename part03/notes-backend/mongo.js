//! Cargar variables de entorno
require('dotenv').config()
///////////////////////////////////

const mongoose = require('mongoose')

// // Método del curso
// // Validación de argumentos, si no hay contraseña la solicita
// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// console.log('process.argv:', process.argv)
// console.log('Password from arguments:', password)

// const url =
//   `mongodb+srv://pedralcg:${password}@cluster0.a2ikdqk.mongodb.net/noteApp?
//   retryWrites=true&w=majority&appName=Cluster0`
// console.log('Generated URL:', url)


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


// // Comentado para ñadir nueva función
// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })


// Imprimimos todas las notas de la BBDD noteAPP
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})


// // Imprimimos todas las notas IMPORTANTES de la BBDD noteAPP
// Note.find({important: true}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })


