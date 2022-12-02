import { NextApiRequest, NextApiResponse } from 'next'
import OrderService from '../../../../services/OrderService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log(req.query.trackingId)
      const order = await OrderService.getOrderManifest(req.query.trackingId)
      return res.status(200).json(order)
    } catch (e) {
      return res.status(500)
    }
  }
}

export default handler
