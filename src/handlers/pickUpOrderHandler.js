const { createPickupOrder, getPickupOrderById, getAllPickupOrders } = require('../services/orderService');

const create = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const newOrder = await createPickupOrder(requestBody);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Order created successfully",
                data: newOrder,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}

const getById = async (event) => {
    try {
        const { id } = event.pathParameters;
        const order = await getPickupOrderById(id);

        if (!order) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Order not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(order),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}

const getAll = async (event) => {
    try {
        const orders = await getAllPickupOrders();

        return {
            statusCode: 200,
            body: JSON.stringify(orders),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}

module.exports = {
    create,
    getById,
    getAll
};