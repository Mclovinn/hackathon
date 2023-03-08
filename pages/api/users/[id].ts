import { NextApiRequest, NextApiResponse } from 'next'
import UserService from '../../../services/UserService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await UserService.getItem({ req, res })
      return res.status(200).json(users)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }
}

export default handler
