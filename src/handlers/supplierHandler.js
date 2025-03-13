const { createSupplier, getSuppliers, getSupplierById } = require('../services/supplierService');

const create = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const newSupplier = await createSupplier(requestBody);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Supplier created successfully",
                data: newSupplier,
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
        const supplier = await getSupplierById(id);

        if (!supplier) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Supplier not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(supplier),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

const getAll = async () => {
    try {
        const suppliers = await getSuppliers();

        return {
            statusCode: 200,
            body: JSON.stringify(suppliers),
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