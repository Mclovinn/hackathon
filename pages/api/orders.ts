import { NextApiRequest, NextApiResponse } from 'next'
import DynamoService from '../../services/DynamoService'

const TABLE_NAME = 'Orders'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return DynamoService.postItem({ tableName: TABLE_NAME, req, res })
  }

  if (req.method === 'GET') {
    return DynamoService.getItem({ tableName: TABLE_NAME, req, res })
  }

  if (req.method === 'PUT') {
    return DynamoService.updateItem({ tableName: TABLE_NAME, req, res })
  }

  if (req.method === 'DELETE') {
    return DynamoService.deleteItem({ tableName: TABLE_NAME, req, res })
  }
}
