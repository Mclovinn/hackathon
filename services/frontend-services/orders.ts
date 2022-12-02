import axios from 'axios'
import { OrderType } from '../../types/order.type'

export const getOrders = async (): Promise<OrderType[]> => {
  const response = await axios.get('/api/orders')
  return response.data as OrderType[]
}
