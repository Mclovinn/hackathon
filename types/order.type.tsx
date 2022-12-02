import { AddressType } from './address.type'
import { OrderStatus } from './order-status'

export type OrderType = {
  created: Date
  delivered: Date
  shipped: Date
  updated: Date
  destinationAddress: AddressType
  id: string
  manifestId: string
  sku: string
  sourceAddress: AddressType
  status: OrderStatus
  trackingId: string
}

export type UpdateOrdersResponseType = {
  orders: OrderType[]
  txHash: string
}
