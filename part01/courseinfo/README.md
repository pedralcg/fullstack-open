# Full Stack Open - Parte 1: Ejercicios Courseinfo

Este directorio (`part01/courseinfo/`) contiene mi solución y código para los ejercicios del set "Courseinfo" de la Parte 1 del curso Full Stack Open.

<!-- Estos ejercicios se centran en introducir los conceptos básicos de React, incluyendo:

* La creación y uso de componentes.
* Pasar datos a componentes mediante **props**.
* Manejar estructuras de datos más complejas en el estado (aunque el estado complejo se ve más en ejercicios posteriores). -->

## Cómo crear y poner en marcha este proyecto

Si necesitas recrear o configurar este proyecto desde cero, sigue estos pasos:

1.  **Crear el Directorio y el Proyecto Vite/React:**
    * Abre tu terminal y navega al directorio **padre** donde quieres que se cree la carpeta `courseinfo` -- `FULLSTACK-OPEN/part01/`.
    * Ejecuta el siguiente comando:
      ```bash
      npm create vite@latest courseinfo --template react
      ```
      Este comando creará el directorio `courseinfo/` y generará los archivos iniciales del proyecto React dentro.  
      Si después de ejecutar el comando te vuelve a preguntar el framework, selecciona React; y si te pregunta la variante, selecciona JavaScript

2.  **Navegar al Directorio del Proyecto:**
    * Una vez que el comando anterior termine, navega al directorio del proyecto recién creado:
      ```bash
      cd courseinfo
      ```

3.  **Instalar las Dependencias del Proyecto:**
    * Ahora que estás dentro del directorio `courseinfo/`, instala las dependencias necesarias:
      ```bash
      npm install
      ```
      Debes hacer esto la primera vez que configures el proyecto en un nuevo entorno o si las dependencias cambian.

4.  **Iniciar el Servidor de Desarrollo de Vite:**
    * Desde dentro del directorio `courseinfo/`, inicia la aplicación:
      ```bash
      npm run dev
      ```
      Este comando compila el proyecto y abre un servidor local (normalmente en `http://localhost:5173/`).


<!-- ## Notas Adicionales o Reflexiones sobre los Ejercicios

*(Este espacio es opcional para que añadas tus propias notas sobre los ejercicios de Courseinfo a medida que los haces. Por ejemplo:)*

* Fue interesante ver cómo se pueden descomponer partes de la UI en componentes reutilizables.
* Entendí mejor la diferencia entre pasar datos mediante props y usar el estado local.
* Tuve que pensar en la estructura de los datos para pasarlos eficientemente a través de varios niveles de componentes. -->

---

Este archivo (`README.md`) reside en la raíz del proyecto Courseinfo y proporciona las instrucciones necesarias para configurarlo y ejecutarlo.