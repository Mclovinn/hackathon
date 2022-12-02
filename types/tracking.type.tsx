import { AddressType } from './address.type'
import { OrderStatus } from './order-status'

export type EventType = {
  creatorAddress: string
  location: AddressType
  orderId: string
  status: OrderStatus
  timestamp: number
}

export type TrackingType = {
  currentStatus: OrderStatus
  events: EventType[]
}
