const express = require('express')
const cowsay = require('cowsay')
const morgan = require('morgan');

require('./utils/db_mongo'); // conectarse a la BBDD Mongo
const calculator = require('./utils/calculator')
const error404 = require('./middlewares/error404')

// Módulos de Rutas
const booksRoutes = require('./routes/booksRoutes')
const productsRoutes = require('./routes/productsRoutes')
const productsApiRoutes = require('./routes/productsApiRoutes')
const providersApiRoutes = require('./routes/providersApiRoutes')
const entriesApiRoutes = require('./routes/entriesApiRoutes')

const app = express()
const port = 3000

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

morgan.token('id', function getId(req) {
    return req.id
});

var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
}));

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode >= 400
    },
    stream: process.stdout
}));


app.get('/', (req, res) => {
    const calc = calculator.add(2, 2);
    //res.send(`Hello World! La suma es ${suma}`)
    res.render('content', { msj: "The Bridge", calc })
})

//Rutas 
app.use('/books',booksRoutes); // Books
app.use('/products',productsRoutes); // Rutas web products
app.use('/api/products',productsApiRoutes); // Rutas web API products
app.use('/api/providers',providersApiRoutes); // Rutas web API providers
app.use('/api/entries',entriesApiRoutes); // Rutas API entries
app.use(error404); // Middleware Para ruta no encontrada (404)

app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Nos vamos a por tortilla (si queda) Example app listening on port http://localhost:${port}`,
            e: "oO",
            T: "U "
        }))
})