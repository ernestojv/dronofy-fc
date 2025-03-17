const dynamoDB = require("../config/dynamoConfig");

const TABLE_NAME = 'PickupOrderTable';

const create = async (pickupOrder) => {
    const params = {
        TableName: TABLE_NAME,
        Item: pickupOrder,
    };
    await dynamoDB.put(params).promise();
    return pickupOrder;
}

const getById = async (pickupOrderId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            pickupOrderId,
        },
    };

    const { Item } = await dynamoDB.get(params).promise();
    return Item;
}

const getAll = async () => {
    const params = {
        TableName: TABLE_NAME,
    };

    const { Items } = await dynamoDB.scan(params).promise();
    return Items;
}

module.exports = {
    create,
    getById,
    getAll
};