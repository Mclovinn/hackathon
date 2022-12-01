import * as uuid from 'uuid'
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'

interface RequestParameters {
  tableName: string
  req: NextApiRequest
  res: NextApiResponse
}

class DynamoService {
  client: DynamoDBClient
  constructor() {
    this.client = new DynamoDBClient({
      credentials: {
        accessKeyId: process.env.LOGISTICS_BACKEND_ACCESS_KEY || '',
        secretAccessKey: process.env.LOGISTICS_BACKEND_SECRET_KEY || '',
      },
      region: process.env.LOGISTICS_BACKEND_REGION,
    })
  }

  async postItem({ tableName, res, req }: RequestParameters): Promise<void> {
    const Item = await this.client.send(
      new PutItemCommand({
        TableName: tableName,
        Item: {
          id: { S: uuid.v4() },
          content: { S: req.body.content },
        },
      })
    )

    return res.status(201).json(Item)
  }

  async getItem({ tableName, res, req }: RequestParameters): Promise<void> {
    const { Item } = await this.client.send(
      new GetItemCommand({
        TableName: tableName,
        Key: {
          id: { S: Array.isArray(req.query.id) ? req.query.id[0] : req.query.id },
        },
      })
    )

    return res.status(200).json(Item)
  }

  async updateItem({ tableName, res, req }: RequestParameters): Promise<void> {
    const { Attributes } = await this.client.send(
      new UpdateItemCommand({
        TableName: tableName,
        Key: {
          id: { S: req.body.id },
        },
        UpdateExpression: 'set content = :c',
        ExpressionAttributeValues: {
          ':c': { S: req.body.content },
        },
        ReturnValues: 'ALL_NEW',
      })
    )

    return res.status(200).json(Attributes)
  }

  async deleteItem({ tableName, res, req }: RequestParameters): Promise<void> {
    await this.client.send(
      new DeleteItemCommand({
        TableName: tableName,
        Key: {
          id: { S: req.body.id },
        },
      })
    )
    return res.status(204).json({})
  }
}

const instance = new DynamoService()
Object.freeze(instance)

export default instance
