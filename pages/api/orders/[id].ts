import { NextApiRequest, NextApiResponse } from 'next'
import OrderService from '../../../services/order.service'
import { deliverOrder } from '../../../services/logistic.service'
import { OrderStatus } from '../../../types/order-status'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      if (req.body.status === OrderStatus.DELIVERED) {
        let order = await OrderService.getOrder({ req, res })
        if (order && order.status === OrderStatus.IN_TRANSIT) {
          const origin = order.destinationAddress
          const txHash = order.trackingId && (await deliverOrder(order.trackingId, JSON.stringify(origin)))
          if (txHash) {
            const orderUpdate = await OrderService.changeOrderToDelivered({ req, res })
            return res.status(200).json({ orderUpdate, txHash })
          }
        }
      }
    } catch (e) {
      console.log(e)
      return res.status(500).json('Failed to update the order')
    }
  }
}

export default handler
