// Controlador - Lógica de negocio de la app
const Provider = require('../models/providers');

const getProviders = async (req,res) => {
        try {
            let providers = await Provider.find({},'-_id -__v');
            res.status(200).json(providers); // Respuesta de la API para muchos productos
        }
        catch(err){
            res.status(400).json({msj: err.message});
        }
}

const createProvider = async (req,res) => {
    console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
    const newProvider = req.body; // {} nuevo producto a guardar
    
    try{
        // Para guardar en una BBDD MongoDB
        let response = await new Provider(newProvider);
        let answer = await response.save(); // objeto de vuelta de guardar en la bbdd
        console.log("Este es el console.log de lo que devuelve la api", answer);

        res.status(201).json({
            message: "proveedor creado", product:{answer}
        });
    }catch(err){
        console.log("Este es el error que devuelve la api", err.message);
        res.status(400).json({
            msj: err.message
        });
    }
}

const updateProvider = async (req, res) => {
    const {company_name, new_company_name, CIF, address, url_web} = req.body
    try {
        const provider = await Provider.findOneAndUpdate({ company_name }, { $set: { company_name: new_company_name,  CIF, address, url_web} }, { new: true });
        console.log(provider)
        res.status(201).json({
            message: "proveedor modificado", product:{provider}
        });
    }
    catch (err){
        console.log("Este es el error que devuelve la api", err.message);
        res.status(400).json({
            msj: err.message
        });
    }
}

const deleteProvider = async (req, res) => {
    const {company_name} = req.body
    try {
        const provider = await Provider.findOneAndRemove({ company_name });
        console.log(provider)
        res.status(200).json({
            message: "proveedor borrado", product:{provider}
        });
    }
    catch (err){
        console.log("Este es el error que devuelve la api", err.message);
        res.status(400).json({
            msj: err.message
        });
    }
}

module.exports = {
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider
}