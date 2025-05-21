import { useState } from 'react'

//! Componente Filter: Para el campo de búsqueda
// Recibe el término de búsqueda y el manejador de cambios como props.
const Filter = ({searchTerm, handleSearchChange}) => {
  return (
    <div>
      Filter shown with:
      <input
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

//! Componente PersonForm: Para el formulario de añadir nuevas personas
// Recibe la función para añadir personas, y los estados/manejadores de los inputs.
const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
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
  )
}

//! Componente Person: Para mostrar los detalles de una sola persona
// Recibe un objeto 'person' como prop.
const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

//! Componente Persons: Para mostrar la lista de personas filtradas
// Recibe el array de personas filtradas como prop.
const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map(person => (
        // Utiliza el ID de la persona como 'key'
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};


//! Componente principal de la aplicación

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

    //* Verificar si el nombre o número ya existe en la agenda. Utiliza el método 'some()' para comprobar
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());
    const numberExists = persons.some(person => person.number === newNumber);
    //* Realizamos comprobaciones y emitimos una advertencia con alert() si fuera necesario
    if (nameExists && numberExists) {
      alert(`${newName} and ${newNumber} are already added to phonebook`);
    } else if (nameExists ) {
      alert(`${newName} is already added to phonebook`);
    } else if (numberExists) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      //* Si el nombre y el número NO existen, añadimos la nueva persona
      const personObject = {
        name: newName,
        number: newNumber,
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
    setNewName(event.target.value);
  };

  // Función manejadora para el evento 'change' del campo de entrada del número
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Función manejadora para el evento 'search' del campo de entrada de la busqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función lógica de filtrado de personas
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      {/* Renderiza el componente Filter y le pasa las props necesarias */}
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>

      {/* Renderiza el componente PersonForm y le pasa las props necesarias */}
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      {/*//! Elemento de depuración */}
      {/* <div>debug name: {newName}</div> */}
      {/* <div>debug number: {newNumber}</div> */}
      {/* <div>debug search: {searchTerm}</div> */}

      <h2>Numbers</h2>
      
      {/* Renderiza el componente Persons y le pasa la lista filtrada */}
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App