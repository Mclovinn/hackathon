import { model, Schema } from 'dynamoose'
import { Item } from 'dynamoose/dist/Item'
import { UserRole } from '../types/user.type'

export class UserItem extends Item {
  id: string | undefined
  email: string | undefined
  firstName: string | undefined
  lastName: string | undefined
  role: UserRole | undefined
  idCognito: string | undefined
  password?: string
}

export const UserModel = model<UserItem>(
  'User',
  new Schema(
    {
      id: {
        type: String,
        hashKey: true,
      },
      email: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      idCognito: {
        type: String,
      },
      role: {
        type: String,
      },
    },
    {
      timestamps: {
        createdAt: 'created',
        updatedAt: 'updated', // updatedAt will not be stored as part of the timestamp
      },
    }
  ),
  { throughput: 'ON_DEMAND' }
)
