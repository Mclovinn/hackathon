import { NextApiRequest, NextApiResponse } from 'next'
import OrderService from '../../services/OrderService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const order = await OrderService.postOrder(req.body)
      return res.status(200).json(order)
    } catch (e) {
      return res.status(500)
    }
  }

  if (req.method === 'GET') {
    return OrderService.getItem({ req, res })
  }

  if (req.method === 'PUT') {
    try {
      await OrderService.updateOrder(req.body)
      return res.status(200).json('')
    } catch (e) {
      return res.status(500)
    }
  }

  if (req.method === 'DELETE') {
    try {
      const order = await OrderService.deleteOrder()
      return res.status(200).json(order)
    } catch (e) {
      return res.status(500)
    }
  }
}

export default handler
