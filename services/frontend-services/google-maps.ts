import axios from 'axios'
import { config } from '../../config/env.config'

export const getOrderAddress = async (lat: number, long: number): Promise<string> => {
  const apiKey = config.googleCloudConfig.apiKey
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=street_address&key=${apiKey}`
  const response = await axios.get(URL)
  return response.data.results[0].formatted_address as string
}
