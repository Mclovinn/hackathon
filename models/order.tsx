import { model } from 'dynamoose'
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

export const PersonaModel = model<OrderItem>(
  'Order',
  {
    id: {
      type: String,
      hashKey: true,
    },
    sku: {
      type: String,
      // validate: val => val.toString().trim().length > 0 && val.toString().trim().length <= 30,
    },
    status: {
      type: String,
      // validate: val => val.toString().trim().length >= 0 && val.toString().trim().length <= 250,
    },
    destinationAddress: {
      type: String,
      // validate: val => val.toString().trim().length >= 0 && val.toString().trim().length <= 250,
    },
    trackingId: {
      type: String,
      // validate: val => val.toString().trim().length >= 0 && val.toString().trim().length <= 250,
    },
    manifestId: {
      type: String,
      // validate: val => val.toString().trim().length >= 0 && val.toString().trim().length <= 250,
    },
    created: {
      type: String,
      // validate: val => val.toString().trim().length >= 0 && val.toString().trim().length <= 250,
    },
    delivered: {
      type: String,
      // validate: val => val.toString().trim().length >= 0 && val.toString().trim().length <= 250,
    },
    shipped: {
      type: String,
      // validate: val => val.toString().trim().length >= 0 && val.toString().trim().length <= 250,
    },
    // settings: {
    //   type: Object,
    //   schema: {
    //     availableOnSearch: Boolean,
    //     receiveContactRequest: Boolean,
    //     showStatus: Boolean,
    //   },
    // },
    // deleted: Boolean,
    // user: {
    //   type: String,
    //   index: {
    //     name: 'userIndex',
    //     global: true,
    //   },
    // },
    // avatar: String,
  },
  { throughput: 'ON_DEMAND' }
)
