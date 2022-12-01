import { NextApiRequest, NextApiResponse } from 'next'
import DynamoService from '../../services/OrderService'
import OrderSchema from '../../types/order-schema'
import validate from '../../lib/middlewares/validation'
import * as uuid from 'uuid'

const TABLE_NAME = 'Orders'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = {
      id: { S: uuid.v4() },
      sku: { S: req.body.sku },
      status: { S: req.body.status },
      destinationAddress: { S: req.body.destinationAddress },
      trackingId: { S: req.body.trackingId },
      manifestId: { S: req.body.manifestId },
      created: { S: req.body.created },
      delivered: { S: req.body.delivered },
      shipped: { S: req.body.shipped },
    }
    return DynamoService.postItem({ tableName: TABLE_NAME, req, res, body })
  }

  if (req.method === 'GET') {
    return DynamoService.getItem({ tableName: TABLE_NAME, req, res })
  }

  if (req.method === 'PUT') {
    return DynamoService.updateItem({ tableName: TABLE_NAME, req, res })
  }

  if (req.method === 'DELETE') {
    return DynamoService.deleteItem({ tableName: TABLE_NAME, req, res })
  }
}

export default validate({ body: OrderSchema }, handler)
