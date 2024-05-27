const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log('Error: No user was written to DynamoDB');
    context.done(null, event);
    return;
  }

  // Save the user to DynamoDB
  const date = new Date();

  const params = {
    Item: {
      id: {S: event.request.userAttributes.sub},
      __typename: {S: 'User'},
      username: {S: event.request.userAttributes.email},
      email: {S: event.request.userAttributes.email},
      given_name: {S: event.request.userAttributes.given_name},
      family_name: {S: event.request.userAttributes.family_name},
      phone_number: {S: event.request.userAttributes.phone_number},
      currentLat: {N: '0'},
      currentLng: {N: '0'},
      heading: {N: '0'},
      createdAt: {S: date.toISOString()},
      updatedAt: {S: date.toISOString()},
    },
    TableName: process.env.USERTABLE,
  };

  try {
    await ddb.putItem(params).promise();
    console.log('Success');
  } catch (e) {
    console.log('Error', e);
  }

  context.done(null, event);
};
