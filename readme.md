# README

## Autor
**Gersom**

## Descripción
Este repositorio contiene dos proyectos relacionados que se utilizan conjuntamente para crear una aplicación web completa. Este proyecto sirve como un template para agilizar el desarrollo de aplicaciones web, proporcionando una estructura básica tanto para el frontend como para el backend. A continuación, se detalla la estructura de archivos y una breve descripción de cada uno de los proyectos.

## Estructura de Archivos

### Proyecto Vite con React (./client)
Este directorio contiene el proyecto del cliente de la aplicación, desarrollado utilizando [Vite](https://vitejs.dev/) como el entorno de desarrollo y [React](https://reactjs.org/) como la biblioteca de interfaz de usuario. Aquí se encuentran los archivos relacionados con la parte del frontend de la aplicación.

#### Instrucciones de Desarrollo
1. Para iniciar el servidor de desarrollo del cliente, navegue al directorio `/client` y ejecute el siguiente comando:
   ```
   npm install
   npm run dev
   ```
   Esto iniciará un servidor de desarrollo y abrirá la aplicación en su navegador predeterminado. Puede realizar cambios en el código fuente y ver los resultados en tiempo real.

2. Para compilar la aplicación para su uso en producción, ejecute el siguiente comando:
   ```
   npm run build
   ```
   Esto generará una carpeta `/dist` con los archivos optimizados para producción.

### Proyecto Node con Express (./server)
Este directorio contiene el proyecto del servidor de la aplicación, desarrollado utilizando [Node.js](https://nodejs.org/) y [Express](https://expressjs.com/) como el marco de desarrollo. Aquí se encuentran los archivos relacionados con la parte del backend de la aplicación.

#### Instrucciones de Desarrollo
1. Para iniciar el servidor de desarrollo del backend, navegue al directorio `/server` y ejecute el siguiente comando:
   ```
   npm install
   npm run dev
   ```
   Esto iniciará el servidor Express con [Nodemon](https://nodemon.io/) para reiniciar automáticamente cuando se detecten cambios en el código. Estará escuchando en el puerto especificado en el archivo de configuración.

2. Puede definir rutas, controladores y lógica de negocio en este proyecto de servidor para admitir las funcionalidades necesarias de su aplicación.

## Configuración
Asegúrese de verificar los archivos de configuración y ajustarlos según sea necesario para su entorno de desarrollo y producción.

## Contribución
Si desea contribuir a este proyecto, no dude en enviar solicitudes de extracción (pull requests) con sus mejoras o correcciones. Estamos abiertos a contribuciones de la comunidad.

¡Gracias por usar este repositorio! Si tiene alguna pregunta o necesita ayuda, no dude en ponerse en contacto con el autor, Gersom.
