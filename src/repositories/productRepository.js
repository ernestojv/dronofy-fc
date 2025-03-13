const dynamoDB = require("../config/dynamoConfig");

const TABLE_NAME = 'ProductTable';

const create = async (product) => {
    const params = {
        TableName: TABLE_NAME,
        Item: product,
    };
    await dynamoDB.put(params).promise();
    return product;
}

const getById = async (productId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            productId,
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