import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect
import axios from 'axios'; // Importa axios para realizar peticiones HTTP

// Define la URL base de la API de OpenWeatherMap como una constante.
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
// Accede a la clave API desde las variables de entorno de Vite como una constante.
const WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

// Componente Weather: Muestra la información meteorológica para una capital dada.
// Recibe la 'capital' como prop.
const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null); // Estado para almacenar los datos meteorológicos
  const [weatherMessage, setWeatherMessage] = useState(''); // Estado para mensajes de carga/error del clima

  // useEffect para obtener los datos meteorológicos cuando la capital cambia.
  useEffect(() => {
    if (capital && capital !== 'N/A') { // Solo busca el clima si hay una capital válida
      setWeatherMessage('Loading weather data...'); // Muestra mensaje de carga
      // Construye la URL completa para la petición, incluyendo la capital, la clave API y las unidades.
      // 'units=metric' para obtener temperatura en Celsius.
      const url = `${WEATHER_API_URL}?&units=metric&appid=${WEATHER_API_KEY}`
      // Realiza la petición GET a la API de OpenWeatherMap.
      axios
        .get(url)
        .then(response => {
          setWeather(response.data); // Guarda los datos del clima
          setWeatherMessage(''); // Limpia el mensaje de carga
        })
        .catch(error => {
          console.error('Error fetching weather data:', error); // Registra el error en consola
          setWeatherMessage('Could not fetch weather data for capital.'); // Muestra mensaje de error al usuario
          setWeather(null); // Limpia los datos del clima
        });
    } else {
      setWeatherMessage('No capital available for weather data.'); // Mensaje si no hay capital
      setWeather(null); // Limpia los datos del clima
    }
  }, [capital]); // Este efecto se re-ejecuta cada vez que la 'capital' prop cambia.

  return (
    <div>
      <h3>Weather in {capital}</h3> {/* Título de la sección de clima */}
      {weatherMessage && <p>{weatherMessage}</p>} {/* Muestra mensajes de carga/error */}
      {weather && ( // Si hay datos meteorológicos, los muestra
        <div>
          <p>Temperature: {weather.main.temp} Celsius</p>
          {/* Icono meteorológico: Verifica que existan los datos del icono */}
          {weather.weather && weather.weather[0] && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description} // Descripción alternativa para accesibilidad
              width="50"
            />
          )}
          {/* Muestra la descripción del clima */}
          {weather.weather && weather.weather[0] && weather.weather[0].description}
          <p>Wind: {weather.wind.speed} m/s</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Clouds: {weather.clouds.all}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather; // Exporta el componente Weather
