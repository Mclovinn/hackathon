import { NextApiRequest, NextApiResponse } from 'next'
import newHandler from '../../services/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return newHandler(req, res, 'orders')
}
