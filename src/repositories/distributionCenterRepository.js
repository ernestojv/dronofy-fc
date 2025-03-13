const dynamoDB = require("../config/dynamoConfig");

const TABLE_NAME = 'DistributionCenterTable';

const create = async (distributionCenter) => {
    const params = {
        TableName: TABLE_NAME,
        Item: distributionCenter,
    };

    await dynamoDB.put(params).promise();
    return distributionCenter;
}

const getById = async (distributionCenterId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            distributionCenterId,
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
    getAll,
};
