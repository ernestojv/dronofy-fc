const { createPurchaseOrder, getPurchaseOrderById, getPurchaseOrders } = require('../services/purchaseOrderService');

const create = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const newPurchaseOrder = await createPurchaseOrder(requestBody);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Purchase order created successfully",
                data: newPurchaseOrder,
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
        const purchaseOrder = await getPurchaseOrderById(id);

        if (!purchaseOrder) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Purchase order not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(purchaseOrder),
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
        const purchaseOrders = await getPurchaseOrders();

        return {
            statusCode: 200,
            body: JSON.stringify(purchaseOrders),
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