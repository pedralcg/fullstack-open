const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Note = require('../models/note')
const User = require('../models/user')


// --- beforeEach más completo (ámbito global/superior) ---
beforeEach(async () => {
  // console.log('--- GLOBAL beforeEach START ---')
  // Limpiar y poblar USUARIOS primero
  await User.deleteMany({}) // Borra todos los usuarios existentes
  // console.log('--- cleared users collection ---')

  // Crear instancias de User, hashear contraseñas, y luego guardar.
  // Promise.all esperará a que todas las promesas de user.save() se resuelvan.
  const savedUsers = await Promise.all(
    helper.initialUsers.map(async (user) => {
      const passwordHash = await bcrypt.hash(user.password, 10)
      const userInstance = new User({ username: user.username, name: user.name, passwordHash })
      return userInstance.save() // Devuelve la promesa de guardar la instancia del usuario
    })
  )
  // savedUsers ahora será un array de los documentos de usuario guardados

  // console.log('--- inserted initial users ---')

  // Limpiar y poblar NOTAS
  await Note.deleteMany({}) // Borra todas las notas existentes
  // console.log('--- cleared notes collection ---')

  // Crea las notas iniciales y ASÓCIALAS al primer usuario guardado
  // Asegúrate de que savedUsers[0] existe antes de acceder a _id
  const firstUserId = savedUsers[0] ? savedUsers[0]._id : null
  const noteObjects = helper.initialNotes.map(note => ({ ...note, user: firstUserId }))
  await Note.insertMany(noteObjects)
  // console.log('--- inserted initial notes ---')
  // console.log('--- GLOBAL beforeEach END ---')
})


// --- Estructura de los describe ---

describe(' Note API tests - [when there is initially some notes saved]', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    assert(contents.includes('Browser can execute only JavaScript'))
  })

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()

      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      // Ya no necesitas obtener usersInDb aquí, el beforeEach global ya los creó
      const usersInDb = await helper.usersInDb() // Esto solo es para obtener el ID del usuario
      const firstUser = usersInDb[0] // Usamos el primer usuario

      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
        user: firstUser.id // Añade el ID del usuario
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)

      const contents = notesAtEnd.map(r => r.content)
      assert(!contents.includes(noteToDelete.content))
    })
  })
}) // FIN del describe 'Note API tests'


describe('User API tests - [when there is initially one user in db', () => {

  test('creation succeeds with a fresh username', async () => {
    // Asume que el beforeEach global ya limpió y creó los initialUsers
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb() // usersAtStart incluirá los initialUsers

    const newUser = {
      username: helper.initialUsers[0].username, // <--- CAMBIA ESTO: usa un username de initialUsers
      name: 'Existing User',
      password: 'newsecret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400) // Espera 400 Bad Request
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    // Asegúrate de que el mensaje de error coincida con lo que devuelve tu errorHandler
    assert(result.body.error.includes('expected `username` to be unique')) // O 'E11000 duplicate key' si es más genérico

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
}) // FIN del describe 'User API tests'


after(async () => {
  await mongoose.connection.close()
  console.log('--- mongoose connection closed after tests ---')
})