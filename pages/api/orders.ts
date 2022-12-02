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
    try {
      const orders = await OrderService.getItem({ req, res })
      return res.status(200).json(orders)
    } catch (e) {
      return res.status(500)
    }
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

  if (req.method === 'PATCH') {
    try {
      await OrderService.changeToDeliveredOrder({ req, res })
      return res.status(200).json('')
    } catch (e) {
      return res.status(500)
    }
  }
}

export default handler
