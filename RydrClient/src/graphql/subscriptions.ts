/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onOrderUpdated = /* GraphQL */ `subscription OnOrderUpdated($id: ID!) {
  onOrderUpdated(id: $id) {
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
` as GeneratedSubscription<
  APITypes.OnOrderUpdatedSubscriptionVariables,
  APITypes.OnOrderUpdatedSubscription
>;
export const onDriverUpdated = /* GraphQL */ `subscription OnDriverUpdated($id: ID!) {
  onDriverUpdated(id: $id) {
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
` as GeneratedSubscription<
  APITypes.OnDriverUpdatedSubscriptionVariables,
  APITypes.OnDriverUpdatedSubscription
>;
export const onDriversUpdated = /* GraphQL */ `subscription OnDriversUpdated {
  onDriversUpdated {
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
` as GeneratedSubscription<
  APITypes.OnDriversUpdatedSubscriptionVariables,
  APITypes.OnDriversUpdatedSubscription
>;
export const onDriverDeleted = /* GraphQL */ `subscription OnDriverDeleted {
  onDriverDeleted {
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
` as GeneratedSubscription<
  APITypes.OnDriverDeletedSubscriptionVariables,
  APITypes.OnDriverDeletedSubscription
>;
export const onDriverActive = /* GraphQL */ `subscription OnDriverActive($isActive: Boolean!) {
  onDriverActive(isActive: $isActive) {
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
` as GeneratedSubscription<
  APITypes.OnDriverActiveSubscriptionVariables,
  APITypes.OnDriverActiveSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateDriver = /* GraphQL */ `subscription OnCreateDriver($filter: ModelSubscriptionDriverFilterInput) {
  onCreateDriver(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateDriverSubscriptionVariables,
  APITypes.OnCreateDriverSubscription
>;
export const onUpdateDriver = /* GraphQL */ `subscription OnUpdateDriver($filter: ModelSubscriptionDriverFilterInput) {
  onUpdateDriver(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateDriverSubscriptionVariables,
  APITypes.OnUpdateDriverSubscription
>;
export const onDeleteDriver = /* GraphQL */ `subscription OnDeleteDriver($filter: ModelSubscriptionDriverFilterInput) {
  onDeleteDriver(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteDriverSubscriptionVariables,
  APITypes.OnDeleteDriverSubscription
>;
export const onCreateOrder = /* GraphQL */ `subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
  onCreateOrder(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateOrderSubscriptionVariables,
  APITypes.OnCreateOrderSubscription
>;
export const onUpdateOrder = /* GraphQL */ `subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
  onUpdateOrder(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateOrderSubscriptionVariables,
  APITypes.OnUpdateOrderSubscription
>;
export const onDeleteOrder = /* GraphQL */ `subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
  onDeleteOrder(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteOrderSubscriptionVariables,
  APITypes.OnDeleteOrderSubscription
>;
