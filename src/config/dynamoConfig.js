const AWS = require('aws-sdk');

const dynamoDbConfig = {
  region: process.env.AWS_REGION || 'us-east-1',
  apiVersion: '2012-08-10'
};

AWS.config.update({
  region: dynamoDbConfig.region,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = { dynamoDb };
