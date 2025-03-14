const { v4: uuidv4 } = require('uuid');
const { create, getById, getAll } = require('../repositories/droneRepository');

const createDrone = async (data) => {
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