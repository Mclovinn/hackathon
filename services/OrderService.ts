import { OrderModel, OrderItem } from '../models/order'
import { NextApiRequest, NextApiResponse } from 'next'
import * as dynamoose from 'dynamoose'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../config/env.config'
interface RequestParameters {
  req: NextApiRequest
  res: NextApiResponse
}

class OrderService {
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

  async postOrder(body: OrderItem) {
    body.id = uuidv4()
    const orderCreated = await OrderModel.create(body)
    return orderCreated
  }

  async getItem({ req }: RequestParameters): Promise<OrderItem[]> {
    let Item: OrderItem[]
    if (Object.keys(req.query).length === 0) {
      Item = await OrderModel.scan().exec()
    } else {
      req.query.status
        ? (Item = await OrderModel.scan('status').contains(req.query.status.toString().toLocaleUpperCase()).exec())
        : (Item = await OrderModel.scan('id').contains(req.query.id).exec())
    }
    return Item
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
