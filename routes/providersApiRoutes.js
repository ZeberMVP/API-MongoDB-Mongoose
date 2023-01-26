const express = require('express')
const providersApiController = require('../controllers/providersApiController')
const providersApiRouter = express.Router();


providersApiRouter.get('/',providersApiController.getProviders);

/*Objeto de prueba para crear*/
/*
{
    company_name: "Oreo",
    CIF: "D4575444577",
    address: "Avenida de Oreo 243",
    url_web: "www.Oreo.com"
}
*/

providersApiRouter.post('/',providersApiController.createProvider);
providersApiRouter.put('/',providersApiController.updateProvider);
providersApiRouter.delete('/',providersApiController.deleteProvider);

module.exports = providersApiRouter;