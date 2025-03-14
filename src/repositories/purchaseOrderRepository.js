const dynamoDB = require("../config/dynamoConfig");

const TABLE_NAME = 'PurchaseOrderTable';

const create = async (purchaseOrder) => {
    const params = {
        TableName: TABLE_NAME,
        Item: purchaseOrder,
    };
    await dynamoDB.put(params).promise();
    return purchaseOrder;
}

const getById = async (purchaseOrderId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            purchaseOrderId,
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