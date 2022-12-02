import axios from 'axios'

// TODO - REMOVE ANY
export const getTrackingInfo = async (trackingId: string): Promise<any> => {
  const response = await axios.get(`/api/orders/tracking/${trackingId}`)
  return response.data as any
}
