const { v4: uuidv4 } = require("uuid");
const { create, getById, getAll } = require("../repositories/distributionCenterRepository");

const createDistributionCenter = async (data) => {
    const distributionCenter = {
        distributionCenterId: uuidv4(), // Genera un ID único
        name: data.name,
        longitude: data.longitude,
        latitude: data.latitude,
        createdAt: new Date().toISOString(),
    };
    return await create(distributionCenter);
}

const getDistributionCenterById = async (distributionCenterId) => {
    return await getById(distributionCenterId);
}

const getAllDistributionCenters = async () => {
    return await getAll();
}

module.exports = {
    createDistributionCenter,
    getDistributionCenterById,
    getAllDistributionCenters,
};
