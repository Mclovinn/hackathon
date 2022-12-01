import { NextApiRequest, NextApiResponse } from 'next'
import DynamoService from '../../services/OrderService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const order = await DynamoService.postOrder(req.body)
      return res.status(200).json(order)
    } catch (e) {
      return res.status(500)
    }
  }

  if (req.method === 'GET') {
    return DynamoService.getItem({ req, res })
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
      const order = await DynamoService.deleteOrder()
      return res.status(200).json(order)
    } catch (e) {
      return res.status(500)
    }
  }
}

export default handler
