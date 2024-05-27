/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    username
    given_name
    family_name
    phone_number
    currentLat
    currentLng
    heading
    email
    orders {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    username
    given_name
    family_name
    phone_number
    currentLat
    currentLng
    heading
    email
    orders {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    username
    given_name
    family_name
    phone_number
    currentLat
    currentLng
    heading
    email
    orders {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createDriver = /* GraphQL */ `mutation CreateDriver(
  $input: CreateDriverInput!
  $condition: ModelDriverConditionInput
) {
  createDriver(input: $input, condition: $condition) {
    id
    username
    given_name
    family_name
    phone_number
    currentLat
    currentLng
    heading
    email
    type
    isActive
    orders {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDriverMutationVariables,
  APITypes.CreateDriverMutation
>;
export const updateDriver = /* GraphQL */ `mutation UpdateDriver(
  $input: UpdateDriverInput!
  $condition: ModelDriverConditionInput
) {
  updateDriver(input: $input, condition: $condition) {
    id
    username
    given_name
    family_name
    phone_number
    currentLat
    currentLng
    heading
    email
    type
    isActive
    orders {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDriverMutationVariables,
  APITypes.UpdateDriverMutation
>;
export const deleteDriver = /* GraphQL */ `mutation DeleteDriver(
  $input: DeleteDriverInput!
  $condition: ModelDriverConditionInput
) {
  deleteDriver(input: $input, condition: $condition) {
    id
    username
    given_name
    family_name
    phone_number
    currentLat
    currentLng
    heading
    email
    type
    isActive
    orders {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDriverMutationVariables,
  APITypes.DeleteDriverMutation
>;
export const createOrder = /* GraphQL */ `mutation CreateOrder(
  $input: CreateOrderInput!
  $condition: ModelOrderConditionInput
) {
  createOrder(input: $input, condition: $condition) {
    id
    createdAt
    type
    status
    origin
    destination
    originAddress
    destinationAddress
    fare
    scheduleDate
    passengerNumber
    paymentType
    notes
    designate
    userId
    user {
      id
      username
      given_name
      family_name
      phone_number
      currentLat
      currentLng
      heading
      email
      createdAt
      updatedAt
      __typename
    }
    driverId
    driver {
      id
      username
      given_name
      family_name
      phone_number
      currentLat
      currentLng
      heading
      email
      type
      isActive
      createdAt
      updatedAt
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateOrderMutationVariables,
  APITypes.CreateOrderMutation
>;
export const updateOrder = /* GraphQL */ `mutation UpdateOrder(
  $input: UpdateOrderInput!
  $condition: ModelOrderConditionInput
) {
  updateOrder(input: $input, condition: $condition) {
    id
    createdAt
    type
    status
    origin
    destination
    originAddress
    destinationAddress
    fare
    scheduleDate
    passengerNumber
    paymentType
    notes
    designate
    userId
    user {
      id
      username
      given_name
      family_name
      phone_number
      currentLat
      currentLng
      heading
      email
      createdAt
      updatedAt
      __typename
    }
    driverId
    driver {
      id
      username
      given_name
      family_name
      phone_number
      currentLat
      currentLng
      heading
      email
      type
      isActive
      createdAt
      updatedAt
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateOrderMutationVariables,
  APITypes.UpdateOrderMutation
>;
export const deleteOrder = /* GraphQL */ `mutation DeleteOrder(
  $input: DeleteOrderInput!
  $condition: ModelOrderConditionInput
) {
  deleteOrder(input: $input, condition: $condition) {
    id
    createdAt
    type
    status
    origin
    destination
    originAddress
    destinationAddress
    fare
    scheduleDate
    passengerNumber
    paymentType
    notes
    designate
    userId
    user {
      id
      username
      given_name
      family_name
      phone_number
      currentLat
      currentLng
      heading
      email
      createdAt
      updatedAt
      __typename
    }
    driverId
    driver {
      id
      username
      given_name
      family_name
      phone_number
      currentLat
      currentLng
      heading
      email
      type
      isActive
      createdAt
      updatedAt
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteOrderMutationVariables,
  APITypes.DeleteOrderMutation
>;
