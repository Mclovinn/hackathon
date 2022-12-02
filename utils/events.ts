import { OrderStatus } from '../types/order-status'
import { EventType } from '../types/tracking.type'

export const getDeliveredAndOrderedEvents = (events: EventType[]) => {
  let parsedEvents: EventType[] = [events[0]]
  for (let index = 1; index < events.length; index++) {
    if (events[index].status === OrderStatus.DELIVERED) {
      parsedEvents.push(events[index])
    }
  }

  return parsedEvents
}
