import { NextApiRequest, NextApiResponse } from 'next'
import UserService from '../../services/user.service'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user = await UserService.postUser(req.body)
      return res.status(200).json(user)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }
  if (req.method === 'PUT') {
    try {
      await UserService.updateUser(req.body)
      return res.status(200).json('')
    } catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }

  if (req.method === 'DELETE') {
    try {
      const user = await UserService.deleteUser(req.body)
      return res.status(200).json(user)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }

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
