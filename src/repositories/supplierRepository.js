const dynamoDB = require("../config/dynamoConfig");

const TABLE_NAME = 'SupplierTable';

const create = async (supplier) => {
    const params = {
        TableName: TABLE_NAME,
        Item: supplier,
    };
    await dynamoDB.put(params).promise();
    return supplier;
}

const getById = async (supplierId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            supplierId,
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