import * as React from 'react'
import { useState, useEffect } from 'react'
import { EventType } from '../../../types/tracking.type'
import { getOrderAddress } from '../../../services/frontend-services/google-maps'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'
import styled from 'styled-components'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from '@mui/lab'
import moment from 'moment'
import { OrderStatus } from '../../../types/order-status'
import DeliveredOrderIcon from '../../../lib/icons/delivered-order-icon'
import CheckpointIcon from '../../../lib/icons/checkpoint-icon'

const $Container = styled.div`
  padding: 5px;
`

const $Address = styled.div`
  font-size: 15px;
`
const $Date = styled.div`
  font-size: 12px;
  opacity: 0.4;
`

interface TrackingTableProps {
  events: EventType[]
  orderStatus?: OrderStatus
}

export const TrackingEventsTimeline = ({ events, orderStatus }: TrackingTableProps) => {
  const [eventsParsed, setEventsParsed] = useState<EventType[]>()

  useEffect(() => {
    if (!events) return
    setOrders(events)
  }, [events])

  const setOrders = async (events: EventType[]) => {
    let newParsedOrders: EventType[] = []
    for (const event of events) {
      const address = await getOrderAddress(event.location.latitude, event.location.longitude)
      newParsedOrders.push({
        ...event,
        locationAddress: address,
      })
    }
    setEventsParsed(newParsedOrders)
  }

  const getIconStatus = (trackingStatus: EventType, index: number) => {
    switch (trackingStatus.status) {
      case OrderStatus.READY_TO_FULFILL:
        return <WarehouseOutlinedIcon />
      case OrderStatus.DELIVERED:
        return eventsParsed && index === eventsParsed.length - 1 && orderStatus === OrderStatus.DELIVERED ? (
          <DeliveredOrderIcon width={24} height={24} />
        ) : (
          <CheckpointIcon width={24} height={24} />
        )
      default:
        return !trackingStatus.orderId ? <WarehouseOutlinedIcon /> : <CheckpointIcon width={24} height={24} />
    }
  }

  return (
    <$Container>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {eventsParsed?.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot sx={{ width: 36, height: 36 }} color="primary">
                {getIconStatus(event, index)}
              </TimelineDot>
              {index < eventsParsed.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <$Address>{event.locationAddress}</$Address>
              <$Date>{moment.unix(event.timestamp).format('L')}</$Date>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </$Container>
  )
}
