import { model } from 'dynamoose'
import { Item } from 'dynamoose/dist/Item'
import { Geopoint } from './geopoint.type'

export class OrderItem extends Item {
  id: string | undefined
  status: string | undefined
  sku: string | undefined
  destinationAddress: Geopoint | undefined
  sourceAddress: Geopoint | undefined
  trackingId: string | undefined
  manifestId: string | undefined
  created: string | undefined
  delivered: string | undefined
  shipped: string | undefined
}

export const OrderModel = model<OrderItem>(
  'Order',
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
      type: Object,
      schema: {
        latitude: String,
        longitude: String,
      },
    },
    sourceAddress: {
      type: Object,
      schema: {
        latitude: String,
        longitude: String,
      },
    },
    trackingId: {
      type: String,
    },
    manifestId: {
      type: String,
    },
    created: {
      type: String,
    },
    delivered: {
      type: String,
    },
    shipped: {
      type: String,
    },
  },
  { throughput: 'ON_DEMAND' }
)
