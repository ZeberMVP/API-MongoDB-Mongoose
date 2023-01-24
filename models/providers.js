const mongoose = require('mongoose');
const objectSchema = {
    company_name: { 
        type: String, 
        required: true,
        unique: true
    },
    CIF: { 
        type: String, 
        required: true,
        unique: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    url_web: {
        type: String,
        required: true
    }
};

const providerSchema = mongoose.Schema(objectSchema);
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

// Insertar un provider

const pr = new Provider({
    company_name: "Oreo",
    CIF: "D4575444577",
    address: "Avenida de Oreo 243",
    url_web: "www.Oreo.com"
});

pr.save().then((data)=>console.log(data));

