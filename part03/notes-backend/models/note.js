const mongoose = require('mongoose')

// ¡Obtén la URL de MongoDB desde las variables de entorno!
const url = process.env.MONGODB_URI

// Validar que la URL de MongoDB se ha cargado correctamente
if (!url) {
  console.error('Error: MONGODB_URI not found in .env file or environment variables.');
  console.error('Please make sure you have a .env file with MONGODB_URI=your_connection_string');
  process.exit(1);
}

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
})

// ¡Añade esto para formatear la respuesta!
noteSchema.set('toJSON', {
  // Transformamos el objeto ID a un ID string
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Eliminamos el objeto ID de la respuesta
    delete returnedObject._id
    // Eliminamos el objeto __v de la respuesta
    delete returnedObject.__v
  }
})

// Exporta el modelo Note para que pueda ser utilizado en otros archivos
module.exports = mongoose.model('Note', noteSchema) //