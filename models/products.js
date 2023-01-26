const mongoose = require('mongoose');
const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true,
        unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image: {
        type: String,
        validate: {
            validator: function(url){
                if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Porfa, sólo imágenes JPG o PNG"
        }
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    }
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Product = mongoose.model('Product', productSchema);

/*Objeto de prueba para crear*/
/*
{
    "id": 1,
    "title": "Galletas Oreo",
    "price": 1.2,
    "description": "Pack de cuatro bolsas de galletas Oreo",
    "image": "https://estoyhechouncocinillas.com/wp-content/uploads/2015/08/tostadas_con_tomate.png",
    "company": "Oreo" (Debes haber creado el provider "Oreo" antes)
}
*/

module.exports = Product;

