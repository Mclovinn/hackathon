import { NextApiRequest, NextApiResponse } from 'next'
import DynamoService from '../../services/DynamoService'
import OrderSchema from '../../types/order-schema'
import validate from '../../lib/middlewares/validation'

const TABLE_NAME = 'Orders'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return DynamoService.postItem({ tableName: TABLE_NAME, req, res })
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
