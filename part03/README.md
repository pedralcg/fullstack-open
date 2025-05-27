# Notas de la Parte 3: Construyendo el Backend

Este archivo contiene mis notas, comandos de interés y estructura de ejercicios para la Parte 3 del curso Full Stack Open.

## **¡Recomendación Importante: Nuevo Repositorio de GitHub!**

Para la Parte 3, donde comenzarás a trabajar intensivamente en el backend, es **altamente recomendable** crear un **nuevo repositorio de GitHub independiente** para los proyectos de esta parte.

**Razones:**

* **Separación de Intereses:** El frontend (Partes 1-2) y el backend (Parte 3 en adelante) suelen ser proyectos con sus propias dependencias, estructuras de carpetas y lógicas de despliegue. Mantenerlos en repositorios separados facilita la gestión de cada uno.
* **Organización:** Cada proyecto de backend (ej. `notes-backend`, `phonebook-backend`) será una aplicación Node.js independiente. Es más limpio tener un repositorio para cada backend o, al menos, un repositorio para *todos* los backends de la Parte 3, en lugar de mezclarlos con el frontend anterior.
* **Despliegue:** Cuando despliegues tus aplicaciones (por ejemplo, en servicios como Render o Fly.io), generalmente desplegarás el frontend y el backend como entidades separadas. Un repositorio separado simplifica este proceso.
* **Colaboración:** Si alguna vez trabajas en equipo, es común que diferentes equipos se centren en el frontend y el backend, gestionando sus respectivos repositorios.

**Sugerencia de Estructura de Repositorios:**

* `fullstack-open-frontend` (para las Partes 1 y 2, o proyectos frontend)
* `fullstack-open-part3-backend` (para todos los ejercicios de backend de la Parte 3)
* `fullstack-open-notes-backend` (si prefieres un repo por cada ejercicio de backend)

---

## Sobre la Parte 3

La Parte 3 del curso Fullstack Open marca un cambio fundamental: nos adentramos en el **backend**. Aquí aprenderás a construir la parte del servidor de tu aplicación, que es responsable de la lógica de negocio, la gestión de la base de datos y la exposición de APIs para que tu frontend (React) pueda interactuar con ella. Es donde la aplicación cobra vida más allá del navegador.

## Conceptos Clave Cubiertos

Durante esta parte, se explorarán y practicarán los siguientes conceptos esenciales relacionados con el desarrollo de backend:

* **Node.js y npm:**
    * Entender qué es Node.js como entorno de ejecución de JavaScript en el servidor.
    * Uso de `npm` (Node Package Manager) para gestionar dependencias y scripts del proyecto.
* **Express.js:**
    * Introducción a Express.js como un framework web minimalista para Node.js.
    * Configuración de un servidor HTTP básico.
    * Definición de rutas (endpoints) para manejar diferentes tipos de solicitudes HTTP (GET, POST, PUT, DELETE).
* **APIs RESTful (Creación):**
    * Diseño y construcción de APIs RESTful para interactuar con recursos.
    * Manejo de solicitudes y envío de respuestas en formato JSON.
    * Parámetros de ruta y de consulta.
* **Bases de Datos (MongoDB y Mongoose):**
    * Introducción a las bases de datos NoSQL, específicamente MongoDB.
    * Uso de Mongoose como una biblioteca de modelado de objetos para MongoDB en Node.js, facilitando la interacción con la base de datos.
    * Definición de esquemas y modelos de datos.
    * Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con Mongoose.
* **Middleware:**
    * Comprender el concepto de middleware en Express.js.
    * Uso de middleware para tareas como el registro de solicitudes (logging), el manejo de JSON, el manejo de errores y la autenticación.
* **Manejo de Errores en el Backend:**
    * Implementación de estrategias robustas para manejar errores en las APIs, devolviendo respuestas adecuadas al cliente.
* **Variables de Entorno:**
    * Uso de variables de entorno (ej. con la librería `dotenv`) para gestionar configuraciones sensibles (como claves de bases de datos, puertos) sin codificarlas directamente.
    * Esto es crucial para la seguridad y el despliegue.
* **Despliegue (Deployment):**
    * Conceptos básicos de cómo desplegar una aplicación Node.js en un servicio de alojamiento en la nube (como Render, Fly.io o Heroku).
* **Autenticación y Autorización (Opcional/Avanzado):**
    * Introducción a la autenticación de usuarios (ej. con JSON Web Tokens - JWT).
    * Implementación de middleware para proteger rutas.

## Estructura de Ejercicios en este Directorio (`part03/`)

Dentro de este directorio (`part03/`), cada conjunto de ejercicios o proyecto de backend se guardará en su propia subcarpeta, siguiendo la estructura sugerida por el curso:

```bash
fullstack-open\part03
```

* `./notes-backend/` - Construcción de un backend para la aplicación de notas.
* `./phonebook-backend/` - Construcción de un backend para la aplicación de la agenda telefónica.
* *(Se añadirán más carpetas según los ejercicios del curso)*

Para trabajar en una sección específica, navega a este directorio (`part03/`) y luego al directorio del proyecto correspondiente (ej. `cd notes-backend`).

## Cómo Ejecutar el Código Localmente

Para ejecutar los ejercicios de esta parte en tu máquina local, necesitarás configurar y ejecutar el servidor backend. Si también estás trabajando con el frontend (de la Parte 2), ambos deberán estar corriendo simultáneamente.

1.  **Configuración del Proyecto Backend:**

    * Navega al directorio del proyecto backend específico (ej. `./part03/nombre-del-ejercicio-x/`).
    * Instala las dependencias: `npm install` (o `yarn install`).
    * Configura tus variables de entorno (ej. creando un archivo `.env` con `PORT=3001` y `MONGODB_URI=tu_uri_de_mongodb`). **Recuerda añadir `.env` a tu `.gitignore`**.
    * Inicia el servidor backend: `npm start` (o `yarn start`).

2.  **Interacción con el Frontend (Opcional, si aplicable):**

    * Si estás probando el backend con un frontend de la Parte 2, asegúrate de que el frontend esté configurado para hacer peticiones a la dirección y puerto de tu backend (ej. `http://localhost:3001`).
    * Navega al directorio de tu proyecto frontend (ej. `./part02/phonebook/`).
    * Instala las dependencias del frontend: `npm install` (o `yarn install`).
    * Inicia el servidor de desarrollo del frontend: `npm run dev` (o `yarn dev`).

3.  Asegúrate de que **ambos servidores (frontend y backend, si usas ambos)** estén corriendo simultáneamente.

4.  Abre tu navegador y visita la dirección donde se sirve tu aplicación React (normalmente `http://localhost:5173/` o `http://localhost:3000/`).

Tu aplicación React ahora podrá comunicarse con el backend que está corriendo en otra dirección (a menudo en un puerto diferente, como `http://localhost:3001/` o similar), permitiéndote obtener y enviar datos.

---

Este README te servirá como una guía y referencia a medida que explores el emocionante mundo del desarrollo de backend con Node.js y Express.js. ¡Prepárate para construir la "columna vertebral" de tus aplicaciones!