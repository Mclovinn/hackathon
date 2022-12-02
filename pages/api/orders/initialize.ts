import { NextApiRequest, NextApiResponse } from 'next'
import OrderService from '../../../services/OrderService'
import { createOrders } from '../../../services/logistic.service'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const orders = await OrderService.initializeOrders(req.body.orderIds)
      if (orders.length > 0) {
        const trackingIds = orders.map(order => order.trackingId || '')
        const origin = orders[0].sourceAddress
        const txHash = await createOrders(trackingIds, JSON.stringify(origin))
        return res.status(200).json({ orders, txHash })
      }
      return res.status(200).json('There is not orders to initialize')
    } catch (e) {
      console.log(e)
      return res.status(500).json({ error: e.message })
    }
  }
}

export default handler
