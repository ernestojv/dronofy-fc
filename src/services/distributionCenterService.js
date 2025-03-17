const { v4: uuidv4 } = require("uuid");
const { create, getById, getAll } = require("../repositories/distributionCenterRepository");

const createDistributionCenter = async (data) => {
    const distributionCenter = {
        distributionCenterId: uuidv4(), // Genera un ID único
        name: data.name,
        location: data.location,
        createdAt: new Date().toISOString(),
    };
    return await create(distributionCenter);
}

const getDistributionCenterById = async (distributionCenterId) => {
    return await getById(distributionCenterId);
}

const getNearbyDistributionCenters = async (location, range) => {
    const distributionCenters = await getAll();

    return distributionCenters
        .map(distributionCenter => {
            const distance = getDistanceFromLatLonInMeters(location, distributionCenter.location);
            return { ...distributionCenter, distance };
        })
        .filter(distributionCenter => distributionCenter.distance <= range);
};


const getAllDistributionCenters = async () => {
    return await getAll();
}

const getDistanceFromLatLonInMeters = (location1, location2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(location2.latitude - location1.latitude); // deg2rad below
    const dLon = deg2rad(location2.longitude - location1.longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(location1.latitude)) * Math.cos(deg2rad(location2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c * 1000; // Distance in meters
    return d;
}

const deg2rad = (degrees) => {
    return degrees * (Math.PI / 180);
};

module.exports = {
    createDistributionCenter,
    getDistributionCenterById,
    getNearbyDistributionCenters,
    getAllDistributionCenters,
};
