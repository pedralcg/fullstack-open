import { useState } from 'react'

const App = () => {
  // Estado para almacenar la lista de personas en la agenda
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // Estado para controlar el valor del campo de entrada del nuevo nombre
  const [newName, setNewName] = useState('')

  // Estado para controlar el valor del campo de entrada del nuevo número
  const [newNumber, setNewNumber] = useState('')

  //? Nuevo estado para el término de búsqueda**
  const [searchTerm, setSearchTerm] = useState('');

  // Función manejadora para el evento 'submit' del formulario
  const addPerson = (event) => {
    // Previene el comportamiento por defecto de enviar el formulario (recargar la página)
    event.preventDefault(); 

    //! Paso 1: Verificar si el nombre o número ya existe en la agenda
    // Utiliza el método 'some()' para comprobar
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());
    const numberExists = persons.some(person => person.number === newNumber);
    if (nameExists && numberExists) {
      //! Paso 2a: Si el nombre y el número ya existe, emite una advertencia con alert()
      alert(`${newName} and ${newNumber} is already added to phonebook`);
    } else if (nameExists ) {
      //! Paso 2b: Si el nombre ya existe, emite una advertencia
      alert(`${newName} is already added to phonebook`);
    } else if (numberExists) {
      //! Paso 2c: Si el número ya existe, emite una advertencia
      alert(`${newNumber} is already added to phonebook`);
    } else {
      //! Paso 3: Si el nombre y el número NO existen, procede a añadir la nueva persona
      const personObject = {
        name: newName,
        number: newNumber,
        // Asignamos una ID simple
        id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1,
      };
      // Actualiza el estado 'persons' añadiendo la nueva persona.
      setPersons([...persons, personObject]);
    }
    
    // Limpia el campo de entrada después de añadir la persona
    setNewName('');
    setNewNumber('');
  };

  // Función manejadora para el evento 'change' del campo de entrada del nombre
  const handleNameChange = (event) => {
    // Actualiza el estado 'newName' con el valor actual del campo de entrada
    setNewName(event.target.value);
  };

  // Función manejadora para el evento 'change' del campo de entrada del número
  const handleNumberChange = (event) => {
    // Actualiza el estado 'newNumber' con el valor actual del campo de entrada
    setNewNumber(event.target.value);
  };

  //? Nuevo manejador para el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //? Lógica de filtrado de personas
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      {/* Campo de búsqueda */}
      <div>
        Filter shown with:
        <input
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <h2>Add a new</h2>
      {/* Formulario para añadir nuevas personas */}
      {/* Asocia la función addPerson al evento submit */}
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            // El valor del input está controlado por el estado newName
            onChange={handleNameChange}
            // Cada cambio en el input actualiza el estado newName
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            // El valor del input está controlado por el estado newNumber
            onChange={handleNumberChange}
            // Cada cambio en el input actualiza el estado newNumber
          />
        </div>
        <div>
          <button type="submit">add</button>
          {/* Botón para enviar el formulario */}
        </div>
      </form>
      {/*//! Elemento de depuración */}
      {/* <div>debug name: {newName}</div> */}
      {/* <div>debug number: {newNumber}</div> */}
      {/* <div>debug search: {searchTerm}</div> */}
      <h2>Numbers</h2>
      <div>
        {/* Muestra la lista de personas filtradas */}
        {filteredPersons.map(person => (
          // Utiliza la id de la persona como 'key'
          <p key={person.id}>{person.name} {person.number}</p>
        ))}
      </div>
    </div>
  )
}

export default App