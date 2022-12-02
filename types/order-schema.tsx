import Joi from 'joi'
import { OrderStatus } from './order-status'

const OrderSchema = Joi.object({
  sku: Joi.string().uuid(),
  status: Joi.string(),
  destinationAddress: Joi.string().valid(OrderStatus.DELIVERED, OrderStatus.IN_TRANSIT),
  trackingId: Joi.string().uuid(),
  manifestId: Joi.string().uuid(),
  created: Joi.date().timestamp(),
  delivered: Joi.date().timestamp(),
  shipped: Joi.date().timestamp(),
})
export default OrderSchema
