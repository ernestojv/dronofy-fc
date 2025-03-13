const { createProduct, getProductById, getAllProducts } = require("../services/productService");

const create = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const newProduct = await createProduct(requestBody);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Product created successfully",
                data: newProduct,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

const getById = async (event) => {
    try {
        const { id } = event.pathParameters;
        const product = await getProductById(id);

        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Product not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(product),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

const getAll = async (event) => {
    try {
        const products = await getAllProducts();

        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

module.exports = {
    create,
    getById,
    getAll,
};