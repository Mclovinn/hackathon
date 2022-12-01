import { OrderModel, OrderItem } from '../models/order'
import { NextApiRequest, NextApiResponse } from 'next'
import * as dynamoose from 'dynamoose'
interface RequestParameters {
  tableName: string
  req: NextApiRequest
  res: NextApiResponse
}

class OrderService {
  constructor() {
    // Create new DynamoDB instance
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: process.env.LOGISTICS_BACKEND_ACCESS_KEY || '',
        secretAccessKey: process.env.LOGISTICS_BACKEND_SECRET_KEY || '',
      },
      region: process.env.LOGISTICS_BACKEND_REGION || '',
    })
    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb)
  }

  async postOrder(body: OrderItem) {
    const orderCreated = await OrderModel.create(body)
    return orderCreated
  }

  async getItem({ res }: RequestParameters): Promise<void> {
    return res.status(200).json('')
  }

  async updateOrder(body: OrderItem) {
    const orderUpdate = await OrderModel.update(body)
    return orderUpdate
  }

  async deleteOrder() {
    const orderDeleted = await OrderModel.delete()
    return orderDeleted
  }
}

const instance = new OrderService()
Object.freeze(instance)

export default instance
