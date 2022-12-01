import { NextApiRequest, NextApiResponse } from 'next'
import DynamoService from '../../services/OrderService'

const TABLE_NAME = 'Orders'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return DynamoService.postItem({ tableName: TABLE_NAME, req, res })
  }

  if (req.method === 'GET') {
    return DynamoService.getItem({ tableName: TABLE_NAME, req, res })
  }

  if (req.method === 'PUT') {
    try {
      await DynamoService.updateOrder(req.body)
      return res.status(200).json('')
    } catch (e) {
      return res.status(500)
    }
  }

  if (req.method === 'DELETE') {
    try {
      await DynamoService.deleteOrder()
      return res.status(200).json('')
    } catch (e) {
      return res.status(500)
    }
  }
}

export default handler
