const express = require('express')
const productsApiController = require('../controllers/productsApiController')
const productsApiRouter = express.Router();

// Rutas de API de productos

// GET http://localhost:3000/api/products/3
// GET http://localhost:3000/api/products/4
// GET http://localhost:3000/api/products
productsApiRouter.get('/:id?',productsApiController.getProducts);

/*Objeto de prueba para crear*/
/*
{
    "id": 40,
    "title": "Galletas Oreo",
    "price": 1.2,
    "description": "Pack de cuatro bolsas de galletas Oreo",
    "image": "https://estoyhechouncocinillas.com/wp-content/uploads/2015/08/tostadas_con_tomate.png",
    "company": "Oreo" (Debes haber creado el provider "Oreo" antes)
}
*/

// POST http://localhost:3000/api/products
productsApiRouter.post('/',productsApiController.createProduct);

module.exports = productsApiRouter;
