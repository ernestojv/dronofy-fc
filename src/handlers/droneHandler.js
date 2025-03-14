const { createDrone, getDroneById, getAllDrones } = require('../services/droneService');

const create = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const newDrone = await createDrone(requestBody);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Drone created successfully",
                data: newDrone,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}

const getById = async (event) => {
    try {
        const { id } = event.pathParameters;
        const drone = await getDroneById(id);

        if (!drone) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Drone not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(drone),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}

const getAll = async (event) => {
    try {
        const drones = await getAllDrones();

        return {
            statusCode: 200,
            body: JSON.stringify(drones),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}

module.exports = {
    create,
    getById,
    getAll,
};