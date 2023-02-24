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
