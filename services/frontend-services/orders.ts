import axios from 'axios'
import { OrderStatus } from '../../types/order-status'
import { OrderType, UpdateOrdersResponseType } from '../../types/order.type'

export const getOrders = async (): Promise<OrderType[]> => {
  const response = await axios.get('/api/orders')
  return response.data as OrderType[]
}

export const getOrderByTrackingId = async (trackingId: string): Promise<OrderType> => {
  const response = await axios.get(`/api/orderByTracking/${trackingId}`)
  return response.data as OrderType
}

export const initializeOrders = async (orderIds: string[]): Promise<UpdateOrdersResponseType> => {
  const response = await axios.post('/api/orders/initialize', { orderIds: orderIds })
  return response.data as UpdateOrdersResponseType
}

export const setOrderAsDelivered = async (orderId: string): Promise<UpdateOrdersResponseType> => {
  const response = await axios.patch(`/api/orders/${orderId}`, { status: OrderStatus.DELIVERED })
  return response.data as UpdateOrdersResponseType
}
