import { NextApiRequest, NextApiResponse } from 'next'
import OrderService from '../../../services/order.service'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const order = await OrderService.getOrdersReport()
      return res.status(200).json(order)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }
}

export default handler
