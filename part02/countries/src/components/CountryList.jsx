import React from 'react';

// Componente para mostrar un solo país en la lista de resultados
// Recibe el objeto 'country' y el manejador 'handleShowDetails' para el botón 'show'.
const CountryListItem = ({ country, handleShowDetails }) => {
  return (
    <p>
      {country.name.common}
      {/* Botón para mostrar los detalles de este país específico */}
      <button onClick={() => handleShowDetails(country)}>show</button>
    </p>
  );
};

// Componente CountryList: Muestra una lista de países.
// Recibe el array de 'filteredCountries' y el manejador 'handleShowDetails'.
const CountryList = ({ filteredCountries, handleShowDetails }) => {
  return (
    <div>
      {/* Itera sobre los países filtrados y renderiza un CountryListItem para cada uno. */}
      {filteredCountries.map(country => (
        <CountryListItem
          key={country.cca2} // Usa cca2 como key único para cada país
          country={country}
          handleShowDetails={handleShowDetails} // Pasa el manejador al componente hijo
        />
      ))}
    </div>
  );
};

export default CountryList; // Exporta el componente CountryList
