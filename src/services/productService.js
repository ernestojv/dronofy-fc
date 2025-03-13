const { v4: uuidv4 } = require("uuid");
const { create, getById, getAll } = require("../repositories/productRepository");

const createProduct = async (data) => {
    const product = {
        productId: uuidv4(), // Genera un ID único
        name: data.name,
        price: data.price,
        stock: data.stock,
        supplierId: data.supplierId,
        createdAt: new Date().toISOString(),
    };
    return await create(product);
}

const getProductById = async (productId) => {
    return await getById(productId);
}

const getAllProducts = async () => {
    return await getAll();
}

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
};