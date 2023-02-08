import * as dynamoose from 'dynamoose'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../config/env.config'
import { UserItem, UserModel } from '../models/user'
import { NextApiRequest, NextApiResponse } from 'next'

interface RequestParameters {
  req: NextApiRequest
  res: NextApiResponse
}

class UserService {
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
    body.id = uuidv4()
    const userCreated = await UserModel.create(body)
    return userCreated
  }

  async updateUser(body: UserItem) {
    const userUpdate = await UserModel.update(body)
    return userUpdate
  }

  async getUser(id: string) {
    const user = await UserModel.get(id)
    return user
  }

  async getItem({ req }: RequestParameters): Promise<UserItem[]> {
    let Item: UserItem[]
    console.log('res', Object.keys(req.query).length)
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
