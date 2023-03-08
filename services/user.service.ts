import * as dynamoose from 'dynamoose'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../config/env.config'
import { UserItem, UserModel } from '../models/user'
import { NextApiRequest, NextApiResponse } from 'next'
import { AuthService } from './auth.service'
import { UserRole } from '../types/user.type'

interface RequestParameters {
  req: NextApiRequest
  res: NextApiResponse
}

class UserService {
  authService = new AuthService()
  constructor() {
    // Create new DynamoDB instance
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: config.awsConfig.accessKey,
        secretAccessKey: config.awsConfig.secretKey,
      },
      region: config.awsConfig.region,
    })
    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb)
  }

  async postUser(body: UserItem) {
    if (body.email && body.password) {
      const user = await this.authService.signUp({ email: body.email, password: body.password })
      if (user?.userData) {
        body.id = uuidv4()
        body.role = body.role || UserRole.COURIER
        body.idCognito = user.userData.cognitoId
        const userCreated = await UserModel.create(body)
        return userCreated
      } else {
        console.log('no se creoo el usaurio')
      }
    } else {
      console.log('no hay usuario o passsword')
    }
  }

  async updateUser(body: UserItem) {
    const userUpdate = await UserModel.update(body)
    return userUpdate
  }

  async getUser(id: string) {
    const user = await UserModel.get(id)
    return user
  }

  async getUserWithParameter(parameter: string, searchParameter: string) {
    const user = UserModel.scan(parameter).contains(searchParameter).exec()
    return user
  }

  async getItem({ req }: RequestParameters): Promise<UserItem[]> {
    let Item: UserItem[]
    if (Object.keys(req.query).length === 0) {
      Item = await UserModel.scan().exec()
    } else {
      Item = await UserModel.scan('id').contains(req.query.id).exec()
    }
    return Item
  }

  async deleteUser(body: UserItem) {
    if (body.id) {
      const user = await this.getUser(body.id)
      const userDeleted = await user.delete()
      return userDeleted
    }
    return console.log('error id not entered')
  }
}

const instance = new UserService()
Object.freeze(instance)
export default instance
