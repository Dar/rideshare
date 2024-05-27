/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  given_name: string,
  family_name: string,
  phone_number: string,
  currentLat: number,
  currentLng: number,
  heading: number,
  email: string,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  given_name?: ModelStringInput | null,
  family_name?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  currentLat?: ModelFloatInput | null,
  currentLng?: ModelFloatInput | null,
  heading?: ModelFloatInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  given_name: string,
  family_name: string,
  phone_number: string,
  currentLat: number,
  currentLng: number,
  heading: number,
  email: string,
  orders?: ModelOrderConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelOrderConnection = {
  __typename: "ModelOrderConnection",
  items:  Array<Order | null >,
  nextToken?: string | null,
};

export type Order = {
  __typename: "Order",
  id: string,
  createdAt: string,
  type: string,
  status: string,
  origin: string,
  destination: string,
  originAddress: string,
  destinationAddress: string,
  fare: number,
  scheduleDate: string,
  passengerNumber: string,
  paymentType: string,
  notes: string,
  designate: string,
  userId: string,
  user?: User | null,
  driverId?: string | null,
  driver?: Driver | null,
  updatedAt: string,
};

export type Driver = {
  __typename: "Driver",
  id: string,
  username: string,
  given_name: string,
  family_name: string,
  phone_number: string,
  currentLat: number,
  currentLng: number,
  heading: number,
  email: string,
  type: string,
  isActive: boolean,
  orders?: ModelOrderConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  given_name?: string | null,
  family_name?: string | null,
  phone_number?: string | null,
  currentLat?: number | null,
  currentLng?: number | null,
  heading?: number | null,
  email?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateDriverInput = {
  id?: string | null,
  username: string,
  given_name: string,
  family_name: string,
  phone_number: string,
  currentLat: number,
  currentLng: number,
  heading: number,
  email: string,
  type: string,
  isActive: boolean,
};

export type ModelDriverConditionInput = {
  username?: ModelStringInput | null,
  given_name?: ModelStringInput | null,
  family_name?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  currentLat?: ModelFloatInput | null,
  currentLng?: ModelFloatInput | null,
  heading?: ModelFloatInput | null,
  email?: ModelStringInput | null,
  type?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  and?: Array< ModelDriverConditionInput | null > | null,
  or?: Array< ModelDriverConditionInput | null > | null,
  not?: ModelDriverConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateDriverInput = {
  id: string,
  username?: string | null,
  given_name?: string | null,
  family_name?: string | null,
  phone_number?: string | null,
  currentLat?: number | null,
  currentLng?: number | null,
  heading?: number | null,
  email?: string | null,
  type?: string | null,
  isActive?: boolean | null,
};

export type DeleteDriverInput = {
  id: string,
};

export type CreateOrderInput = {
  id?: string | null,
  createdAt?: string | null,
  type: string,
  status: string,
  origin: string,
  destination: string,
  originAddress: string,
  destinationAddress: string,
  fare: number,
  scheduleDate: string,
  passengerNumber: string,
  paymentType: string,
  notes: string,
  designate: string,
  userId: string,
  driverId?: string | null,
};

export type ModelOrderConditionInput = {
  createdAt?: ModelStringInput | null,
  type?: ModelStringInput | null,
  status?: ModelStringInput | null,
  origin?: ModelStringInput | null,
  destination?: ModelStringInput | null,
  originAddress?: ModelStringInput | null,
  destinationAddress?: ModelStringInput | null,
  fare?: ModelFloatInput | null,
  scheduleDate?: ModelStringInput | null,
  passengerNumber?: ModelStringInput | null,
  paymentType?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  designate?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  driverId?: ModelIDInput | null,
  and?: Array< ModelOrderConditionInput | null > | null,
  or?: Array< ModelOrderConditionInput | null > | null,
  not?: ModelOrderConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateOrderInput = {
  id: string,
  createdAt?: string | null,
  type?: string | null,
  status?: string | null,
  origin?: string | null,
  destination?: string | null,
  originAddress?: string | null,
  destinationAddress?: string | null,
  fare?: number | null,
  scheduleDate?: string | null,
  passengerNumber?: string | null,
  paymentType?: string | null,
  notes?: string | null,
  designate?: string | null,
  userId?: string | null,
  driverId?: string | null,
};

export type DeleteOrderInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  given_name?: ModelStringInput | null,
  family_name?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  currentLat?: ModelFloatInput | null,
  currentLng?: ModelFloatInput | null,
  heading?: ModelFloatInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelDriverFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  given_name?: ModelStringInput | null,
  family_name?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  currentLat?: ModelFloatInput | null,
  currentLng?: ModelFloatInput | null,
  heading?: ModelFloatInput | null,
  email?: ModelStringInput | null,
  type?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  and?: Array< ModelDriverFilterInput | null > | null,
  or?: Array< ModelDriverFilterInput | null > | null,
  not?: ModelDriverFilterInput | null,
};

export type ModelDriverConnection = {
  __typename: "ModelDriverConnection",
  items:  Array<Driver | null >,
  nextToken?: string | null,
};

export type ModelOrderFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  type?: ModelStringInput | null,
  status?: ModelStringInput | null,
  origin?: ModelStringInput | null,
  destination?: ModelStringInput | null,
  originAddress?: ModelStringInput | null,
  destinationAddress?: ModelStringInput | null,
  fare?: ModelFloatInput | null,
  scheduleDate?: ModelStringInput | null,
  passengerNumber?: ModelStringInput | null,
  paymentType?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  designate?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  driverId?: ModelIDInput | null,
  and?: Array< ModelOrderFilterInput | null > | null,
  or?: Array< ModelOrderFilterInput | null > | null,
  not?: ModelOrderFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  given_name?: ModelSubscriptionStringInput | null,
  family_name?: ModelSubscriptionStringInput | null,
  phone_number?: ModelSubscriptionStringInput | null,
  currentLat?: ModelSubscriptionFloatInput | null,
  currentLng?: ModelSubscriptionFloatInput | null,
  heading?: ModelSubscriptionFloatInput | null,
  email?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionDriverFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  given_name?: ModelSubscriptionStringInput | null,
  family_name?: ModelSubscriptionStringInput | null,
  phone_number?: ModelSubscriptionStringInput | null,
  currentLat?: ModelSubscriptionFloatInput | null,
  currentLng?: ModelSubscriptionFloatInput | null,
  heading?: ModelSubscriptionFloatInput | null,
  email?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionDriverFilterInput | null > | null,
  or?: Array< ModelSubscriptionDriverFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionOrderFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  origin?: ModelSubscriptionStringInput | null,
  destination?: ModelSubscriptionStringInput | null,
  originAddress?: ModelSubscriptionStringInput | null,
  destinationAddress?: ModelSubscriptionStringInput | null,
  fare?: ModelSubscriptionFloatInput | null,
  scheduleDate?: ModelSubscriptionStringInput | null,
  passengerNumber?: ModelSubscriptionStringInput | null,
  paymentType?: ModelSubscriptionStringInput | null,
  notes?: ModelSubscriptionStringInput | null,
  designate?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  driverId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionOrderFilterInput | null > | null,
  or?: Array< ModelSubscriptionOrderFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDriverMutationVariables = {
  input: CreateDriverInput,
  condition?: ModelDriverConditionInput | null,
};

export type CreateDriverMutation = {
  createDriver?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDriverMutationVariables = {
  input: UpdateDriverInput,
  condition?: ModelDriverConditionInput | null,
};

export type UpdateDriverMutation = {
  updateDriver?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDriverMutationVariables = {
  input: DeleteDriverInput,
  condition?: ModelDriverConditionInput | null,
};

export type DeleteDriverMutation = {
  deleteDriver?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateOrderMutationVariables = {
  input: CreateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    createdAt: string,
    type: string,
    status: string,
    origin: string,
    destination: string,
    originAddress: string,
    destinationAddress: string,
    fare: number,
    scheduleDate: string,
    passengerNumber: string,
    paymentType: string,
    notes: string,
    designate: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    driverId?: string | null,
    driver?:  {
      __typename: "Driver",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      type: string,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateOrderMutationVariables = {
  input: UpdateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type UpdateOrderMutation = {
  updateOrder?:  {
    __typename: "Order",
    id: string,
    createdAt: string,
    type: string,
    status: string,
    origin: string,
    destination: string,
    originAddress: string,
    destinationAddress: string,
    fare: number,
    scheduleDate: string,
    passengerNumber: string,
    paymentType: string,
    notes: string,
    designate: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    driverId?: string | null,
    driver?:  {
      __typename: "Driver",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      type: string,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteOrderMutationVariables = {
  input: DeleteOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type DeleteOrderMutation = {
  deleteOrder?:  {
    __typename: "Order",
    id: string,
    createdAt: string,
    type: string,
    status: string,
    origin: string,
    destination: string,
    originAddress: string,
    destinationAddress: string,
    fare: number,
    scheduleDate: string,
    passengerNumber: string,
    paymentType: string,
    notes: string,
    designate: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    driverId?: string | null,
    driver?:  {
      __typename: "Driver",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      type: string,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDriverQueryVariables = {
  id: string,
};

export type GetDriverQuery = {
  getDriver?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDriversQueryVariables = {
  filter?: ModelDriverFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDriversQuery = {
  listDrivers?:  {
    __typename: "ModelDriverConnection",
    items:  Array< {
      __typename: "Driver",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      type: string,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetOrderQueryVariables = {
  id: string,
};

export type GetOrderQuery = {
  getOrder?:  {
    __typename: "Order",
    id: string,
    createdAt: string,
    type: string,
    status: string,
    origin: string,
    destination: string,
    originAddress: string,
    destinationAddress: string,
    fare: number,
    scheduleDate: string,
    passengerNumber: string,
    paymentType: string,
    notes: string,
    designate: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    driverId?: string | null,
    driver?:  {
      __typename: "Driver",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      type: string,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListOrdersQueryVariables = {
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersQuery = {
  listOrders?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      createdAt: string,
      type: string,
      status: string,
      origin: string,
      destination: string,
      originAddress: string,
      destinationAddress: string,
      fare: number,
      scheduleDate: string,
      passengerNumber: string,
      paymentType: string,
      notes: string,
      designate: string,
      userId: string,
      driverId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OrdersByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type OrdersByUserIdQuery = {
  ordersByUserId?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      createdAt: string,
      type: string,
      status: string,
      origin: string,
      destination: string,
      originAddress: string,
      destinationAddress: string,
      fare: number,
      scheduleDate: string,
      passengerNumber: string,
      paymentType: string,
      notes: string,
      designate: string,
      userId: string,
      driverId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OrdersByDriverIdQueryVariables = {
  driverId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type OrdersByDriverIdQuery = {
  ordersByDriverId?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      createdAt: string,
      type: string,
      status: string,
      origin: string,
      destination: string,
      originAddress: string,
      destinationAddress: string,
      fare: number,
      scheduleDate: string,
      passengerNumber: string,
      paymentType: string,
      notes: string,
      designate: string,
      userId: string,
      driverId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnOrderUpdatedSubscriptionVariables = {
  id: string,
};

export type OnOrderUpdatedSubscription = {
  onOrderUpdated?:  {
    __typename: "Order",
    id: string,
    createdAt: string,
    type: string,
    status: string,
    origin: string,
    destination: string,
    originAddress: string,
    destinationAddress: string,
    fare: number,
    scheduleDate: string,
    passengerNumber: string,
    paymentType: string,
    notes: string,
    designate: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    driverId?: string | null,
    driver?:  {
      __typename: "Driver",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      type: string,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDriverUpdatedSubscriptionVariables = {
  id: string,
};

export type OnDriverUpdatedSubscription = {
  onDriverUpdated?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDriversUpdatedSubscriptionVariables = {
};

export type OnDriversUpdatedSubscription = {
  onDriversUpdated?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDriverDeletedSubscriptionVariables = {
};

export type OnDriverDeletedSubscription = {
  onDriverDeleted?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDriverActiveSubscriptionVariables = {
  isActive: boolean,
};

export type OnDriverActiveSubscription = {
  onDriverActive?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDriverSubscriptionVariables = {
  filter?: ModelSubscriptionDriverFilterInput | null,
};

export type OnCreateDriverSubscription = {
  onCreateDriver?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDriverSubscriptionVariables = {
  filter?: ModelSubscriptionDriverFilterInput | null,
};

export type OnUpdateDriverSubscription = {
  onUpdateDriver?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDriverSubscriptionVariables = {
  filter?: ModelSubscriptionDriverFilterInput | null,
};

export type OnDeleteDriverSubscription = {
  onDeleteDriver?:  {
    __typename: "Driver",
    id: string,
    username: string,
    given_name: string,
    family_name: string,
    phone_number: string,
    currentLat: number,
    currentLng: number,
    heading: number,
    email: string,
    type: string,
    isActive: boolean,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
};

export type OnCreateOrderSubscription = {
  onCreateOrder?:  {
    __typename: "Order",
    id: string,
    createdAt: string,
    type: string,
    status: string,
    origin: string,
    destination: string,
    originAddress: string,
    destinationAddress: string,
    fare: number,
    scheduleDate: string,
    passengerNumber: string,
    paymentType: string,
    notes: string,
    designate: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    driverId?: string | null,
    driver?:  {
      __typename: "Driver",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      type: string,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
};

export type OnUpdateOrderSubscription = {
  onUpdateOrder?:  {
    __typename: "Order",
    id: string,
    createdAt: string,
    type: string,
    status: string,
    origin: string,
    destination: string,
    originAddress: string,
    destinationAddress: string,
    fare: number,
    scheduleDate: string,
    passengerNumber: string,
    paymentType: string,
    notes: string,
    designate: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    driverId?: string | null,
    driver?:  {
      __typename: "Driver",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      type: string,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
};

export type OnDeleteOrderSubscription = {
  onDeleteOrder?:  {
    __typename: "Order",
    id: string,
    createdAt: string,
    type: string,
    status: string,
    origin: string,
    destination: string,
    originAddress: string,
    destinationAddress: string,
    fare: number,
    scheduleDate: string,
    passengerNumber: string,
    paymentType: string,
    notes: string,
    designate: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    driverId?: string | null,
    driver?:  {
      __typename: "Driver",
      id: string,
      username: string,
      given_name: string,
      family_name: string,
      phone_number: string,
      currentLat: number,
      currentLng: number,
      heading: number,
      email: string,
      type: string,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};
