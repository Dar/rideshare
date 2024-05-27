/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getDriver = /* GraphQL */ `query GetDriver($id: ID!) {
  getDriver(id: $id) {
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
` as GeneratedQuery<APITypes.GetDriverQueryVariables, APITypes.GetDriverQuery>;
export const listDrivers = /* GraphQL */ `query ListDrivers(
  $filter: ModelDriverFilterInput
  $limit: Int
  $nextToken: String
) {
  listDrivers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDriversQueryVariables,
  APITypes.ListDriversQuery
>;
export const getOrder = /* GraphQL */ `query GetOrder($id: ID!) {
  getOrder(id: $id) {
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
` as GeneratedQuery<APITypes.GetOrderQueryVariables, APITypes.GetOrderQuery>;
export const listOrders = /* GraphQL */ `query ListOrders(
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      driverId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOrdersQueryVariables,
  APITypes.ListOrdersQuery
>;
export const ordersByUserId = /* GraphQL */ `query OrdersByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  ordersByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
      driverId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.OrdersByUserIdQueryVariables,
  APITypes.OrdersByUserIdQuery
>;
export const ordersByDriverId = /* GraphQL */ `query OrdersByDriverId(
  $driverId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  ordersByDriverId(
    driverId: $driverId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
      driverId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.OrdersByDriverIdQueryVariables,
  APITypes.OrdersByDriverIdQuery
>;
