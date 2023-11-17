# README - Flujo de Trabajo con Git

Este documento describe el flujo de trabajo básico para colaborar en un proyecto utilizando Git. Asegúrate de tener Git instalado en tu máquina antes de comenzar.

## Pasos para Contribuir al Proyecto

### 1. Actualizar la Rama Personal

Antes de comenzar a trabajar en tu tarea, asegúrate de tener la rama personal actualizada.

```bash
git checkout personal
git pull origin develop
```

### 2. Realizar Cambios Locales

Realiza tus cambios en la rama personal. Añade los archivos modificados o nuevos y realiza un commit.

```bash
git add <nombre_archivo_o_carpeta>
git commit -m "[ADD] Descripción del cambio"
```

### 3. Subir Cambios a la Rama Personal

Una vez que hayas realizado tus cambios y commits, sube tus cambios a la rama personal.

```bash
git push origin personal
```

### 4. Cambiar a la Rama de Desarrollo

Cuando tengas una funcionalidad completa y lista para ser compartida, cambia a la rama de desarrollo.

```bash
git checkout develop
```

### 5. Actualizar la Rama de Desarrollo

Asegúrate de tener la última versión de la rama de desarrollo.

```bash
git pull origin develop
```

### 6. Fusionar Cambios de la Rama Personal a Desarrollo

Fusiona los cambios de tu rama personal a la rama de desarrollo.

```bash
git merge personal
```

### 7. Subir Cambios a la Rama de Desarrollo

Una vez que hayas fusionado los cambios, sube la rama de desarrollo al repositorio remoto.

```bash
git push origin develop
```

### 8. Volver a la Rama Personal

Regresa a tu rama personal para continuar trabajando en nuevas funcionalidades o correcciones.

```bash
git checkout personal
```

¡Repite estos pasos para cada ciclo de desarrollo!

Este flujo de trabajo básico asegura que todos los cambios estén sincronizados y facilita la colaboración en equipo. ¡Buena suerte con tu contribución!

> By Gersom
