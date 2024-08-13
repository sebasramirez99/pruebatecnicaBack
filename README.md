
# Proyecto Prueba Técnica - Backend

Este proyecto contiene el backend para la aplicación de la prueba técnica. Este backend está desarrollado en Node.js usando Express y proporciona una API para generar series de Fibonacci y enviarlas por correo electrónico.

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [NPM](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/) como manejador de paquetes

## Instalación

Sigue estos pasos para configurar y ejecutar el backend en tu entorno local:

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/sebasramirez99/pruebatecnicaBack.git
   ```

2. **Navega al directorio del backend:**

   ```bash
   cd pruebatecnicaBack/fibonacci-backend
   ```

3. **Instala las dependencias del proyecto:**

   Si usas NPM:

   ```bash
   npm install
   ```

   Si usas Yarn:

   ```bash
   yarn install
   ```

## Ejecución del Servidor

Para iniciar el servidor localmente, usa el siguiente comando:

```bash
node index.js
```

El servidor estará escuchando por defecto en el puerto `3001`. Puedes acceder a la API en `http://localhost:3001`.

## Endpoints Disponibles

### Generar Serie de Fibonacci

- **GET** `/fibonacci`

  Parámetros de consulta (query params):
  - `x`: Minutos de la hora actual (por ejemplo, 23)
  - `n`: Segundos de la hora actual (por ejemplo, 45)

  Ejemplo de uso:

  ```
  http://localhost:3001/fibonacci?x=23&n=45
  ```

### Enviar Serie de Fibonacci por Correo

- **POST** `/send-email`

  Cuerpo de la solicitud (request body):

  ```json
  {
    "email": "destinatario@example.com",
    "time": "12:23:45",
    "fibonacciNumbers": [21, 13, 8, 5, 3, 2]
  }
  ```

## Documentación de la API

La documentación de la API está disponible a través de Swagger. Una vez que el servidor esté en ejecución, puedes acceder a la documentación en:

```
http://localhost:3001/api-docs
```

## Notas Adicionales

- Asegúrate de configurar correctamente las credenciales de correo en el código antes de enviar correos electrónicos.
- Para que la aplicación frontend funcione correctamente, este backend debe estar en ejecución localmente.
