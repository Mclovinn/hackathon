import * as uuid from 'uuid'
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || '',
    secretAccessKey: process.env.SECRET_KEY || '',
  },
  region: process.env.REGION,
})

export default async function newHandler(req: NextApiRequest, res: NextApiResponse, tableName: string) {
  if (req.method === 'PUT') {
    const Item = await client.send(
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

  if (req.method === 'GET') {
    const { Item } = await client.send(
      new GetItemCommand({
        TableName: tableName,
        Key: {
          id: { S: Array.isArray(req.query.id) ? req.query.id[0] : req.query.id },
        },
      })
    )

    return res.status(200).json(Item)
  }

  if (req.method === 'POST') {
    const { Attributes } = await client.send(
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

  if (req.method === 'DELETE') {
    await client.send(
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
