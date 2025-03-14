const dynamoDB = require("../config/dynamoConfig");

const TABLE_NAME = 'DroneTable';

const create = async (drone) => {
    const params = {
        TableName: TABLE_NAME,
        Item: drone,
    };
    await dynamoDB.put(params).promise();
    return drone;
}

const getById = async (droneId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            droneId,
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