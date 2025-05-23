import { useState, useEffect } from 'react';
import axios from 'axios';

//! Componente para mostrar un solo país en la lista de resultados
const CountryListItem = ({ country, handleShowDetails }) => {
  return (
    <p>
      {country.name.common}
      {/* Botón para mostrar los detalles de un país específico */}
      <button onClick={() => handleShowDetails(country)}>show</button>
    </p>
  );
};

//! Componente para mostrar los detalles de un solo país
const CountryDetails = ({ country, handleBackToList }) => {
  // Verifica si country, capital y languages existen antes de acceder a sus propiedades
  const capital = country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';
  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <div>
      {/* Botón para volver al listado */}
      <button onClick={handleBackToList}>Back to List</button>
      {/* Nombre común del país */}
      <h2>{country.name.common}</h2>
      {/* Capital del país */}
      <p>Capital: {capital}</p> 
      {/* Área del país */}
      {/*//? El método toLocaleString() convierte un número en una cadena de texto, 
      //? formateándolo según las convenciones del idioma y la región */}
      <p>Area: {country.area ? country.area.toLocaleString() : 'N/A'} km²</p>
      {/* Población del país */}
      {/*//? El método toLocaleString() convierte un número en una cadena de texto, 
      //? formateándolo según las convenciones del idioma y la región */}
      <p>Population: {country.population ? country.population.toLocaleString() : 'N/A'} people</p> 
      {/* Título para la sección de idiomas */}
      <h3>Languages:</h3> 
      <ul>
        {/* Itera sobre los idiomas y los muestra en una lista */}
        {languages.map(lang => (
          // Usa el idioma como key
          <li key={lang}>{lang}</li> 
        ))}
      </ul>
      {/* Muestra la bandera del país */}
      {country.flags && country.flags.png && (
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      )}
    </div>
  );
};

//! Componente principal de la aplicación
const App = () => {
  // Estado para la consulta de búsqueda
  const [searchTerm, setSearchTerm] = useState(''); 
  // Almacena todos los países una vez
  const [allCountries, setAllCountries] = useState([]); 
  // Almacena los países filtrados localmente
  const [filteredCountries, setFilteredCountries] = useState([]); 
  // Estado para mensajes al usuario (ej. "demasiados resultados")
  const [message, setMessage] = useState('');
  // Muestra detalles de un solo país seleccionado
  const [selectedCountry, setSelectedCountry] = useState(null);


  //* Primer useEffect: Carga todos los países una sola vez al inicio
  useEffect(() => {
    axios
    // Petición a la API para obtener TODOS los países
      .get('https://studies.cs.helsinki.fi/restcountries/api/all') 
      .then(response => {
        // Guarda todos los países en el estado
        setAllCountries(response.data); 
      })
      .catch(error => {
        console.error('Error fetching all countries:', error);
        // Mensaje de error si falla la carga inicial
        setMessage('Error loading all country data. Please try again later.'); 
      });
  // Dependencia vacía: se ejecuta solo una vez al montar el componente
  }, []); 

  //! Encapsulado de la lógica de filtrado
  const applyFilter = (currentSearchTerm, currentAllCountries) => {
    setMessage(''); // Borra mensajes antes de filtrar

    if (!currentSearchTerm) {
      setFilteredCountries([]);
      return;
    }

    const lowerCaseSearchTerm = currentSearchTerm.toLowerCase();
    const matches = currentAllCountries.filter(country =>
      country.name.common.toLowerCase().includes(lowerCaseSearchTerm)
    );

    if (matches.length > 10) {
      setMessage('Too many matches, specify another filter.');
      setFilteredCountries([]);
    } else if (matches.length > 1) {
      setFilteredCountries(matches);
    } else if (matches.length === 1) {
      setFilteredCountries(matches);
      setSelectedCountry(matches[0]); // Auto-selecciona si solo hay una coincidencia
    } else {
      setMessage('No countries found matching your search.');
      setFilteredCountries([]);
    }
  };

  //? Segundo useEffect: Filtra los países en el cliente cuando el searchTerm o allCountries cambian
  useEffect(() => {
    // Reinicia el país seleccionado cuando el término de búsqueda cambia
    setSelectedCountry(null);
    // Llama a la función de filtrado
    applyFilter(searchTerm, allCountries);
    // Se ejecuta cuando searchTerm o allCountries cambian 
  }, [searchTerm, allCountries]); 

  // Manejador para el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //! Manejador para el botón 'show' en la lista de países
  const handleShowDetails = (country) => {
    // Establece el país para mostrar sus detalles
    setSelectedCountry(country); 
    // Limpia cualquier mensaje de "demasiados resultados"
    setMessage(''); 
    // Limpia la lista para que solo se muestren los detalles
    setFilteredCountries([]); 
  };

  //! Manejador para el botón 'Back to List'
  const handleBackToList = () => {
    // Borra el país seleccionado para volver a la vista de lista/búsqueda
    setSelectedCountry(null); 
    // Vuelve a aplicar el filtro para restaurar la lista anterior
    applyFilter(searchTerm, allCountries);
  };


  return (
    <div>
      {/* Título de la aplicación */}
      <h1>Country Data</h1>
      <div>
        Find countries:
        <input
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Muestra mensajes al usuario */}
      {message && <p>{message}</p>}

      {/* Renderizado condicional: Prioriza la vista de detalles de un país seleccionado */}
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} handleBackToList={handleBackToList} />
      ) : (
        // Si no hay un país seleccionado, renderiza la lista de países filtrados
        // o el mensaje de "demasiados resultados"
        filteredCountries.length > 1 && filteredCountries.length <= 10 && (
          <div>
            {filteredCountries.map(country => (
              // Pasa el manejador handleShowDetails a cada CountryListItem
              <CountryListItem key={country.cca2} country={country} handleShowDetails={handleShowDetails} />
            ))}
          </div>
        )
      )}
      {/*//! El caso de un solo país que coincide automáticamente ya se maneja estableciendo selectedCountry en el segundo useEffect */}
    </div>
  );
};

export default App;
