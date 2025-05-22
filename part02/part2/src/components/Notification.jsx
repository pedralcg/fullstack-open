import React from 'react'; // Importa React

// Componente Notification: Muestra un mensaje de notificación/error.
// Recibe un prop 'message' que contiene el texto del mensaje.
const Notification = ({ message }) => {
  // Si el mensaje es nulo, no se renderiza nada.
  if (message === null) {
    return null;
  }

  // Si hay un mensaje, se renderiza dentro de un div con la clase CSS "notification".
  // Puedes cambiar "notification" a "error" si solo lo usarás para errores,
  // pero "notification" es más genérico y útil para mensajes de éxito también.
  return (
    <div className="error">
      {message}
    </div>
  );
};

export default Notification; // Exporta el componente Notification
