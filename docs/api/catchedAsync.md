# CATCHED ASYNC

```javascript
const catchedAsync = (fn, errorHandler) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        if (errorHandler) {
            errorHandler(error, req, res, next);
        } else {
            next(error);
        }
    }
};

module.exports = catchedAsync;
```


1.  Declaración de la función:

    -   La función `catchedAsync` es una función de orden superior que toma dos parámetros: `fn` y `errorHandler`.
2.  Función Retornada:

    -   `catchedAsync` devuelve otra función que toma tres parámetros: `req` (request), `res` (response), y `next` (función para pasar al siguiente middleware).
3.  Bloque Try-Catch:

    -   Dentro de la función retornada, hay un bloque `try-catch`.

    -   En el bloque `try`, se ejecuta la función `fn(req, res, next)` de forma asíncrona usando `await`.

    -   Si la ejecución de `fn` es exitosa, todo está bien y no hay ningún problema.

    -   Si hay algún error durante la ejecución de `fn`, el control pasa al bloque `catch`.

4.  Manejo de Errores:

    -   Dentro del bloque `catch`, se verifica si se proporcionó una función `errorHandler`.

    -   Si `errorHandler` está presente, se llama a `errorHandler(error, req, res, next)` para manejar el error de manera personalizada.

    -   Si no se proporciona `errorHandler`, se llama a `next(error)`. Esto significa que el error se pasa al siguiente middleware en la cadena de middleware de Express.

5.  Exportación:

    -   Finalmente, la función `catchedAsync` se exporta para que pueda ser utilizada en otros archivos de código.

Esta función está diseñada para envolver otras funciones asíncronas (como controladores de rutas en Express) y manejar errores de manera centralizada. Si se proporciona un `errorHandler`, se utilizará para manejar el error; de lo contrario, el error se pasa al siguiente middleware.