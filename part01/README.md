# Notas de la Parte 1: Introducción a React

Este archivo contiene mis notas, comandos de interés y estructura de ejercicios para la Parte 1 del curso Full Stack Open.

## Sobre la Parte 1

La Parte 1 introduce los conceptos fundamentales de la biblioteca **React** para construir interfaces de usuario en el frontend. Cubre temas como:

* Componentes funcionales y de clase.
* JSX (la sintaxis de React).
* Props para pasar datos entre componentes.
* Estado de los componentes (`useState`).
* Manejo de eventos.
* Renderizado de listas y renderizado condicional.

## Estructura de Ejercicios en este Directorio (`part01/`)

Dentro de este directorio (`part01/`), cada conjunto de ejercicios o proyecto se guardará en su propia subcarpeta, siguiendo la estructura sugerida por el curso:

```bash
fullstack-open\part01
```

* `./courseinfo/` - Ejercicios sobre pasar datos complejos a componentes, estado.
* `./unicafe/` - Ejercicios sobre manejo de eventos y estado más complejo, depuración.
* `./anecdotes/` - Ejercicios sobre estado, manejo de eventos y renderizado condicional.
* *(Se añadirán más carpetas si hay proyectos adicionales en esta parte)*

Para trabajar en una sección específica, navega a este directorio (`part01/`) y luego al directorio del proyecto correspondiente (ej. `cd courseinfo`).

<!-- ## Comandos Comunes para Proyectos de la Parte 1 (con Vite)

Estos comandos se ejecutan **dentro del directorio de cada proyecto individual** (ej. dentro de `part01/courseinfo/`, `part01/unicafe/`, etc.). Debes navegar a la carpeta del proyecto *antes* de ejecutar la mayoría de estos comandos. -->

### Configuración Inicial del Proyecto (usando create-vite)

Si aún no has creado el proyecto para un conjunto de ejercicios, asegúrate de estar en el directorio `part01/` (donde se encuentra este archivo `readme-part01.md`) y ejecuta:

```bash
npm create vite@latest part1 -- --template react

  cd part1
  npm install
  npm run dev
