const express = require('express')
const productsApiController = require('../controllers/productsApiController')
const productsApiRouter = express.Router();

// Rutas de API de productos

// GET http://localhost:3000/api/products/3
// GET http://localhost:3000/api/products/4
// GET http://localhost:3000/api/products
productsApiRouter.get('/:id?',productsApiController.getProducts);

// POST http://localhost:3000/api/products
productsApiRouter.post('/',productsApiController.createProduct);
productsApiRouter.put('/',productsApiController.updateProduct);
productsApiRouter.delete('/',productsApiController.deleteProduct);

module.exports = productsApiRouter;
