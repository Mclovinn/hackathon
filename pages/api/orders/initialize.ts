import { NextApiRequest, NextApiResponse } from 'next'
import OrderService from '../../../services/OrderService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const orders = await OrderService.initializeOrders(req.body.orderIds)
      return res.status(200).json(orders)
    } catch (e) {
      return res.status(500)
    }
  }
}

export default handler
