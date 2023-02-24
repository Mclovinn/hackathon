import { OrderModel, OrderItem } from '../models/order'
import { NextApiRequest, NextApiResponse } from 'next'
import * as dynamoose from 'dynamoose'
import { v4 as uuidv4 } from 'uuid'
import { OrderStatus } from '../types/order-status'
import { config } from '../config/env.config'
import { getOrder } from './logistic.service'

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

  async initializeOrders(orderIds: any) {
    let orderList: Array<OrderItem> = []
    const manifestId = uuidv4()
    const orders = await OrderModel.batchGet(orderIds)
    for (let i = 0; i < orders.length; i++) {
      let orderUpdated = orders[i]
      if (orders[i].status == OrderStatus.READY_TO_FULFILL) {
        orderUpdated = await OrderModel.update(
          { id: orders[i].id },
          {
            status: OrderStatus.IN_TRANSIT,
            trackingId: uuidv4(),
            manifestId: manifestId,
            shipped: Date.now().toString(),
          }
        )
      }
      orderList.push(orderUpdated)
    }
    return orderList
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

  async getOrder({ req }: RequestParameters): Promise<OrderItem> {
    const order = await OrderModel.scan('id').eq(req.query.id?.toString()).exec()
    return order[0]
  }

  async changeOrderToDelivered({ req }: RequestParameters) {
    const orderUpdate = await OrderModel.update(
      { id: req.query.id },
      {
        status: OrderStatus.DELIVERED,
      }
    )
    return orderUpdate
  }

  async updateOrder(body: OrderItem) {
    const orderUpdate = await OrderModel.update(body)
    return orderUpdate
  }

  async deleteOrder() {
    const orderDeleted = await OrderModel.delete()
    return orderDeleted
  }

  async getOrderManifest(trackingId: any) {
    const order = await getOrder(trackingId)
    for (let i = 0; i < order.events.length; i++) {
      order.events[i].location = JSON.parse(order.events[i].location)
    }
    return order
  }
}

const instance = new OrderService()
Object.freeze(instance)
export default instance
