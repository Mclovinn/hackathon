import { model, Schema } from 'dynamoose'
import { Item } from 'dynamoose/dist/Item'

export class OrderItem extends Item {
  id: string | undefined
  status: string | undefined
  sku: string | undefined
  destinationAddress: string | undefined
  trackingId: string | undefined
  manifestId: string | undefined
  created: string | undefined
  delivered: string | undefined
  shipped: string | undefined
}

export const OrderModel = model<OrderItem>(
  'Order',
  new Schema(
    {
      id: {
        type: String,
        hashKey: true,
      },
      sku: {
        type: String,
      },
      status: {
        type: String,
      },
      destinationAddress: {
        type: String,
      },
      trackingId: {
        type: String,
      },
      manifestId: {
        type: String,
      },
      delivered: {
        type: Number,
      },
      shipped: {
        type: Number,
      },
    },
    {
      timestamps: {
        createdAt: 'created',
        updatedAt: 'updated', // updatedAt will not be stored as part of the timestamp
      },
    }
  ),
  { throughput: 'ON_DEMAND' }
)
