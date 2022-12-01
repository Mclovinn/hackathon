import { NextApiRequest, NextApiResponse } from 'next'
import * as dynamoose from 'dynamoose'
interface RequestParameters {
  tableName: string
  req: NextApiRequest
  res: NextApiResponse
}

class DynamoService {
  constructor() {
    // Create new DynamoDB instance
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: process.env.LOGISTICS_BACKEND_ACCESS_KEY || '',
        secretAccessKey: process.env.LOGISTICS_BACKEND_SECRET_KEY || '',
      },
      region: process.env.LOGISTICS_BACKEND_REGION || '',
    })
    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb)
  }

  async postItem({ res }: RequestParameters): Promise<void> {
    return res.status(201).json('')
  }

  async getItem({ res }: RequestParameters): Promise<void> {
    return res.status(200).json('')
  }

  async updateItem({ res }: RequestParameters): Promise<void> {
    return res.status(200).json('')
  }

  async deleteItem({ res }: RequestParameters): Promise<void> {
    return res.status(204).json({})
  }
}

const instance = new DynamoService()
Object.freeze(instance)

export default instance
