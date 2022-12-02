import { NextApiRequest, NextApiResponse } from 'next'
import OrderService from '../../../services/OrderService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      await OrderService.changeOrderToDelivered({ req, res })
      return res.status(200).json('')
    } catch (e) {
      console.log(e)
      return res.status(500)
    }
  }
}

export default handler
