/* eslint-disable no-unused-vars */
export type UserType = {
  id: string
  email: string
  firstName: String
  lastName: string
  role: UserRole
  idCognito: string
}

export enum UserRole {
  WAREHOUSE_OPERATOR = 'WAREHOUSE_OPERATOR',
  COURIER = 'COURIER',
}

export type ICognitoSignUpUser = {
  email: string
  password: string
  id?: string
  confirmPassword?: string
  confirmEmail?: string
  firstName?: string
  lastName?: string
  cognitoId?: string
}

export type ICognitoUser = {
  email: string
  password: string
  uuid?: string
}
