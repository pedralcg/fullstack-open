import React from 'react'; // Importa React
import Weather from './Weather'; // Importa el componente Weather

// Componente para mostrar los detalles de un solo país.
// Recibe el objeto 'country' y el manejador 'handleBackToList' para el botón de retroceso.
const CountryDetails = ({ country, handleBackToList }) => {
  // Verifica si country, capital y languages existen antes de acceder a sus propiedades
  const capital = country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';
  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <div>
      {/* Botón para volver al listado */}
      <button onClick={handleBackToList}>Back to List</button>
      <h2>{country.name.common}</h2> {/* Nombre común del país */}
      <p>Capital: {capital}</p> {/* Capital del país */}
      <p>Area: {country.area ? country.area.toLocaleString() : 'N/A'} km²</p> {/* Área del país */}
      <p>Population: {country.population ? country.population.toLocaleString() : 'N/A'} people</p> {/* Población del país */}

      <h3>Languages:</h3> {/* Título para la sección de idiomas */}
      <ul>
        {/* Itera sobre los idiomas y los muestra en una lista */}
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      {/* Muestra la bandera del país */}
      {country.flags && country.flags.png && (
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      )}

      {/* Delega la visualización del clima al componente Weather */}
      {/* Pasa la capital como prop al componente Weather */}
      <Weather capital={capital} />
    </div>
  );
};

export default CountryDetails; // Exporta el componente CountryDetails
