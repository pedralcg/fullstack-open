import { useState, useEffect } from 'react';
import axios from 'axios';

//! Componente para mostrar un solo país en la lista de resultados
const CountryListItem = ({ country }) => {
  return (
    <p>{country.name.common}</p>
  );
};

//! Componente para mostrar los detalles de un solo país
const CountryDetails = ({ country }) => {
  // Verifica si country, capital y languages existen antes de acceder a sus propiedades
  const capital = country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';
  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <div>
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

  //* Segundo useEffect: Filtra los países en el cliente cuando el searchTerm o allCountries cambian
  useEffect(() => {
    // Borra mensajes anteriores
    setMessage('');

    if (!searchTerm) {
      // Si no hay término de búsqueda, no hay países filtrados
      setFilteredCountries([]); 
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    // Filtra los países de 'allCountries' basándose en el término de búsqueda
    const matches = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(lowerCaseSearchTerm)
    );

    if (matches.length > 10) {
      // Más de 10 resultados
      setMessage('Too many matches, specify another filter.'); 
      // Limpia la lista de países filtrados
      setFilteredCountries([]); 
    } else if (matches.length > 1) {
      // Entre 2 y 10 resultados, muestra la lista
      setFilteredCountries(matches); 
    } else if (matches.length === 1) {
      // Exactamente 1 resultado
      setFilteredCountries(matches); 
      // Se renderizará directamente cuando filteredCountries.length sea 1.
    } else {
      // Ningún resultado
      setMessage('No countries found matching your search.'); 
      setFilteredCountries([]);
    }
  // Se ejecuta cuando searchTerm o allCountries cambian
  }, [searchTerm, allCountries]); 

  // Manejador para el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

      {/* Renderiza los detalles de un país si solo hay un país filtrado */}
      {filteredCountries.length === 1 && (
        // Muestra los detalles del único país encontrado
        <CountryDetails country={filteredCountries[0]} /> 
      )}

      {/* Si hay entre 2 y 10 países filtrados, muestra la lista */}
      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <div>
          {filteredCountries.map(country => (
            // Usa cca2 como key único
            <CountryListItem key={country.cca2} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
