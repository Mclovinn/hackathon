import axios from 'axios'
import { OrderType } from '../../types/order.type'

export const getOrders = async (): Promise<OrderType[]> => {
  const response = await axios.get('/api/orders')
  return response.data as OrderType[]
}

export const initializeOrders = async (orderIds: string[]): Promise<OrderType[]> => {
  const response = await axios.post('/api/orders/initialize', { orderIds: orderIds })
  return response.data as OrderType[]
}
