const { createDistributionCenter, getDistributionCenterById, getAllDistributionCenters } = require("../services/distributionCenterService");

const create = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const newDistributionCenter = await createDistributionCenter(requestBody);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Distribution Center created successfully",
        data: newDistributionCenter,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const getById = async (event) => {
  try {
    const { id } = event.pathParameters;
    const distributionCenter = await getDistributionCenterById(id);

    if (!distributionCenter) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Distribution Center not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(distributionCenter),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const getAll = async (event) => {
  try {
    const distributionCenters = await getAllDistributionCenters();

    return {
      statusCode: 200,
      body: JSON.stringify(distributionCenters),
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
