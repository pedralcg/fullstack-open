# Notas de la Parte 2: Comunicación con el Servidor

Este archivo contiene mis notas, comandos de interés y estructura de ejercicios para la Parte 2 del curso Full Stack Open.

## Sobre la Parte 2

La Parte 2 del curso Fullstack Open se enfoca en la **comunicación del frontend (React) con un servidor (backend)**. Es una parte fundamental para convertir tus aplicaciones React estáticas o con estado local en aplicaciones Fullstack reales. Aprenderás cómo tu frontend puede solicitar datos a un backend (APIs), enviar datos para ser guardados o procesados, y manejar las respuestas y posibles errores de estas interacciones.

## Conceptos Clave Cubiertos

Durante esta parte, se explorarán y practicarán los siguientes conceptos esenciales relacionados con la comunicación entre el cliente y el servidor:

* **El Modelo Cliente-Servidor:** Comprender cómo una aplicación web se divide en un cliente (el navegador con tu código React) y un servidor (donde reside la lógica de negocio y la base de datos), y cómo el cliente inicia las solicitudes y el servidor responde.

* **APIs (Interfaces de Programación de Aplicaciones):** Entender qué son las APIs RESTful, sus endpoints y los diferentes métodos HTTP (GET, POST, PUT, DELETE) para la comunicación estructurada.

* **Obtención de Datos (GET Requests):** Cómo tu componente React puede solicitar datos a un servidor usando la API `Workspace` o bibliotecas como `axios`, y manejar respuestas en formato JSON.

* **Envío de Datos (POST, PUT, DELETE Requests):** Cómo enviar datos desde el frontend al servidor para crear, actualizar o eliminar recursos, incluyendo datos en el cuerpo de la solicitud (payload).

* **Operaciones Asíncronas y Promises:** Comprender que las solicitudes de red son asíncronas y cómo usar Promises y la sintaxis `async/await` para manejar sus resultados.

* **Efectos Secundarios en React (`useEffect`):** Uso del hook `useEffect` para realizar solicitudes de datos al servidor después del renderizado inicial y manejar sus dependencias.

* **Manejo de Respuestas y Errores:** Procesar los datos recibidos del servidor y implementar manejo de errores para solicitudes fallidas.

* **Módulos de Servicio:** Estructurar el código relacionado con las llamadas a la API en módulos separados para mantener el código del componente limpio.

## Estructura de Ejercicios en este Directorio (`part02/`)

Dentro de este directorio (`part02/`), cada conjunto de ejercicios o proyecto se guardará en su propia subcarpeta, siguiendo la estructura sugerida por el curso:

```bash
fullstack-open\part02
```

* `./countries/` - Ejercicios sobre obtención de datos externos (APIs).
* `./phonebook/` - Ejercicios sobre construcción de una aplicación Fullstack simple con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) contra un backend.
* *(Se añadirán más carpetas según los ejercicios del curso)*

Para trabajar en una sección específica, navega a este directorio (`part02/`) y luego al directorio del proyecto correspondiente (ej. `cd countries`).

### Configuración Inicial del Proyecto (usando create-vite)

Si aún no has creado el proyecto para un conjunto de ejercicios, asegúrate de estar en el directorio `part02/` (donde se encuentra este archivo `README.md`) y ejecuta:

```bash
npm create vite@latest part2 -- --template react

  cd part2
  npm install
  npm run dev
```

## Cómo Ejecutar el Código Localmente

Para ejecutar los ejercicios de esta parte en tu máquina local, necesitarás tanto el **código del frontend** (React) como un **servidor backend** en funcionamiento.

1.  **Configuración del Proyecto Frontend:**

    * Navega al directorio del proyecto frontend (`./part02/nombre-del-ejercicio-x/`).

    * Instala las dependencias: `npm install`.

    * El servidor de desarrollo del frontend se iniciará con `npm run dev`.

2.  **Configuración y Ejecución del Backend:**

    * La Parte 2 a menudo proporciona un pequeño servidor backend para que interactúes con él. Sigue las instrucciones específicas del curso para configurar y ejecutar este servidor.

    * Generalmente, esto implicará navegar al directorio del código backend proporcionado e iniciar el servidor (ej. `npm install` y luego `npm start`).

3.  Asegúrate de que **ambos servidores (frontend y backend)** estén corriendo simultáneamente.

4.  Abre tu navegador y visita la dirección donde se sirve tu aplicación React (normalmente `http://localhost:5173/` o `http://localhost:3000/`).

Tu aplicación React ahora podrá comunicarse con el backend que está corriendo en otra dirección (a menudo en un puerto diferente, como `http://localhost:3001/` o similar), permitiéndote obtener y enviar datos.

---

Este README te servirá como una guía y referencia a medida que explores la emocionante área de la comunicación cliente-servidor en el desarrollo Fullstack.