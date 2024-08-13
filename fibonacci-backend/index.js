// Importa las dependencias necesarias para construir la API.
const express = require('express'); // Express es un marco de trabajo para construir aplicaciones web y APIs en Node.js.
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing) es un middleware que permite controlar quién puede acceder a la API.
const nodemailer = require('nodemailer'); // Nodemailer es un módulo para enviar correos electrónicos desde Node.js.
const swaggerUi = require('swagger-ui-express'); // Swagger UI permite visualizar y probar la API a través de una interfaz gráfica.
const swaggerJsDoc = require('swagger-jsdoc'); // Swagger JSDoc es una herramienta que genera documentación Swagger a partir de comentarios en el código.

// Crea una instancia de una aplicación Express.
const app = express();

// Usa CORS para permitir solicitudes desde diferentes orígenes.
app.use(cors());

// Usa el middleware express.json() para analizar solicitudes entrantes con formato JSON.
app.use(express.json());

// Configura las opciones para la documentación de Swagger.
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Fibonacci API', // Título de la API.
            version: '1.0.0', // Versión de la API.
            description: 'API para generar series de Fibonacci y enviar por correo electrónico', // Descripción de la API.
        },
    },
    apis: ['index.js'], // Especifica los archivos donde Swagger buscará comentarios para generar la documentación.
};

// Genera la documentación Swagger a partir de las opciones configuradas.
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configura la ruta /api-docs para servir la documentación de Swagger.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Función para generar una serie de Fibonacci, comenzando con los dígitos de x y generando n números.
const generateFibonacci = (x, n) => {
    const xDigits = String(x).split('').map(Number); // Convierte x en una cadena, divide cada dígito, y lo convierte en un número.
    xDigits.sort((a, b) => a - b); // Ordena los dígitos de menor a mayor.
    const series = [xDigits[0], xDigits[1]]; // Inicia la serie con los dos dígitos menores.
    for (let i = 2; i < n; i++) {
        series.push(series[i - 1] + series[i - 2]); // Genera los siguientes números de la serie sumando los dos anteriores.
    }
    return series.reverse(); // Devuelve la serie en orden descendente.
};

/**
 * @swagger
 * /fibonacci:
 *   get:
 *     summary: Generar una serie Fibonacci
 *     parameters:
 *       - in: query
 *         name: x
 *         required: true
 *         type: integer
 *         description: Minutos de la hora actual
 *       - in: query
 *         name: n
 *         required: true
 *         type: integer
 *         description: Segundos de la hora actual
 *     responses:
 *       200:
 *         description: Serie Fibonacci generada
 */
// Endpoint GET /fibonacci para generar y devolver una serie de Fibonacci.
app.get('/fibonacci', (req, res) => {
    const { x, n } = req.query; // Extrae los parámetros x y n de la consulta.
    const series = generateFibonacci(parseInt(x), parseInt(n)); // Genera la serie de Fibonacci.
    res.json(series); // Envía la serie generada como respuesta en formato JSON.
});

// Endpoint POST /send-email para enviar la serie de Fibonacci por correo electrónico.
app.post('/send-email', (req, res) => {
    const { email, time, fibonacciNumbers } = req.body; // Extrae el correo electrónico, la hora y los números de Fibonacci del cuerpo de la solicitud.

    // Configura el transporte de correo utilizando el servicio de Gmail.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebatecnicaproteccion@gmail.com', // Correo electrónico del remitente.
            pass: 'adry hhiw sfaf egul', // Contraseña de la aplicación (asegúrate de usar una contraseña de aplicación para mayor seguridad).
        },
    });

    // Configura el contenido del correo electrónico.
    const mailOptions = {
        from: 'pruebatecnicaproteccion@gmail.com', // Dirección de correo del remitente.
        to: email, // Dirección de correo del destinatario.
        subject: `Prueba Técnica – Serie Fibonacci`, // Asunto del correo.
        text: `Hora de generación: ${time}\nSerie Fibonacci: ${fibonacciNumbers.join(', ')}`, // Cuerpo del correo.
    };

    // Envía el correo electrónico.
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString()); // Si ocurre un error, envía una respuesta de error con el mensaje.
        }
        res.send('Correo enviado: ' + info.response); // Si el correo se envía con éxito, envía una respuesta de confirmación.
    });
});

// Inicia el servidor en el puerto 3001 y muestra un mensaje en la consola cuando el servidor esté funcionando.
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
