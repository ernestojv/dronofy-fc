const { v4: uuidv4 } = require('uuid');
const { create, getById, getAll } = require('../repositories/droneRepository');
const { getDistributionCenterById } = require('../services/distributionCenterService')
const createDrone = async (data) => {
    const distributionCenter = await getDistributionCenterById(data.lastDistributionCenterId);
    if (!distributionCenter) {
        throw new Error('Distribution Center not found');
    }
    const drone = {
        droneId: uuidv4(),
        model: data.model,
        range: data.range,
        maxSpeed: data.maxSpeed,
        status: data.status,
        lastDistributionCenterId: data.lastDistributionCenterId,
        location: data.location,
        lastLocationUpdate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    };
    return await create(drone);
}

const getDroneById = async (droneId) => {
    return await getById(droneId);
}

const getAllDrones = async () => {
    return await getAll();
}

module.exports = {
    createDrone,
    getDroneById,
    getAllDrones,
};