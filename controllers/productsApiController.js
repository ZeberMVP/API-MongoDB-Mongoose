// Controlador - Lógica de negocio de la app
const Product = require('../models/products');
const Provider = require('../models/providers');

const getProducts = async (req,res) => {
    try {
        const products = await Product
            .find()
            .populate('company', 'company_name')
            .select('id title price description image company');
        console.log(products);
        res.status(200).json({
            message: "All products and providers",
            products
        });
    } catch (err) {
        console.log("An error occurred: ", err.message);
        res.status(500).json({
            message: err.message
        });
    }
}


const createProduct = async (req,res) => {
    console.log("Esto es el console.log de lo que introducimos por postman", req.body);
    const { id, title, price, description, image, company } = req.body;
    try{
        const provider = await Provider.find({company_name: company});
        const provider_id = provider[0]._id.toString();
        const product = new Product({
            id,
            title,
            price,
            description,
            image,
            company: provider_id
        });
        const result = await product.save();
        console.log(result);
        res.status(201).json({
            message: "producto creado",
            product:{result}
        });
    }catch(err){
        console.log("Este es el error que devuelve la api", err.message);
        res.status(400).json({
            msj: err.message
        });
    }
}

const updateProduct = async (req, res) => {
    const {id, title, new_title, price, description, image, company} = req.body
    const provider = await Provider.find({company_name: company});
    const provider_id = provider[0]._id.toString();
    try {
        const product = await Product.findOneAndUpdate({ title }, { $set: { id, title: new_title,  price, description, image, company: provider_id} }, { new: true });
        console.log(product)
        res.status(201).json({
            message: "producto modificado", product:{product}
        });
    }
    catch (err){
        console.log("Este es el error que devuelve la api", err.message);
        res.status(400).json({
            msj: err.message
        });
    }
}

const deleteProduct = async (req, res) => {
    const {title} = req.body
    try {
        const product = await Product.findOneAndRemove({ title });
        console.log(product)
        res.status(200).json({
            message: "producto borrado", product:{product}
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
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}