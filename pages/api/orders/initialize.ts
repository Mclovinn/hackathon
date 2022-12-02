import { NextApiRequest, NextApiResponse } from 'next'
import OrderService from '../../../services/OrderService'
import { createOrders } from '../../../services/logistic.service'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const orders = await OrderService.initializeOrders(req.body.orderIds)
      const trackingIds = orders.map(order => order.trackingId || '')
      const origin = orders[0].sourceAddress
      await createOrders(trackingIds, JSON.stringify(origin))
      return res.status(200).json(orders)
    } catch (e) {
      console.log(e)
      return res.status(500)
    }
  }
}

export default handler
