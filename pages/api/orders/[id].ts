import { NextApiRequest, NextApiResponse } from 'next'
import OrderService from '../../../services/OrderService'
import { deliverOrder } from '../../../services/logistic.service'
import { OrderStatus } from '../../../types/order-status'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      if (req.body.status === OrderStatus.DELIVERED) {
        let order = await OrderService.changeOrderToDelivered({ req, res })
        if (order) {
          const origin = order.destinationAddress
          const txHash = order.trackingId && (await deliverOrder(order.trackingId, JSON.stringify(origin)))
          return res.status(200).json({ order, txHash })
        }
      }
    } catch (e) {
      console.log(e)
      return res.status(500)
    }
  }
}

export default handler
