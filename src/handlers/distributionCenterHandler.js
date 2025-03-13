const { createDistributionCenter } = require("../services/distributionCenterService");

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

module.exports = {
  create,
};
