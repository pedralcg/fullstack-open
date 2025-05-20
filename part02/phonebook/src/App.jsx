import { useState } from 'react'

const App = () => {
  // Estado para almacenar la lista de personas en la agenda
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  // Estado para controlar el valor del campo de entrada del nuevo nombre
  const [newName, setNewName] = useState('')

  // Función manejadora para el evento 'submit' del formulario
  const addPerson = (event) => {
    // Previene el comportamiento por defecto de enviar el formulario (recargar la página)
    event.preventDefault(); 

    //! Paso 1: Verificar si el nombre ya existe en la agenda
    // Utiliza el método 'some()' para comprobar si alguna persona en el array 'persons'
    // tiene el mismo nombre que el 'newName' actual (ignorando mayúsculas/minúsculas para una mejor UX).
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());

    if (nameExists) {
      //! Paso 2: Si el nombre ya existe, emite una advertencia con alert()
      alert(`${newName} is already added to phonebook`);
    } else {
      //! Paso 3: Si el nombre NO existe, procede a añadir la nueva persona
      // Crea un nuevo objeto de persona con el nombre actual del campo de entrada
      const personObject = {
        name: newName,
      };
      // Actualiza el estado 'persons' añadiendo la nueva persona.
      setPersons([...persons, personObject]);
    }
    
    // Limpia el campo de entrada después de añadir la persona
    setNewName('');
  };

  // Función manejadora para el evento 'change' del campo de entrada del nombre
  const handleNameChange = (event) => {
    // Actualiza el estado 'newName' con el valor actual del campo de entrada
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
          <button type="submit">add</button>
          {/* Botón para enviar el formulario */}
        </div>
      </form>
      {/* Elemento de depuración para ver el valor de newName */}
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <div>
        {/* Muestra la lista de personas */}
        {persons.map(person => (
          // Utiliza el nombre de la persona como 'key'
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  )
}

export default App