import * as React from 'react'
import { useState, useEffect } from 'react'
import { EventType } from '../../../types/tracking.type'
import { getOrderAddress } from '../../../services/frontend-services/google-maps'
import CheckIcon from '@mui/icons-material/Check'
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

const $Container = styled.div`
  padding: 5px;
`

const $Address = styled.div`
  font-size: 18px;
`
const $Date = styled.div`
  font-size: 15px;
  color: #ffffff80;
  font-weight: 300;
`

interface TrackingTableProps {
  events: EventType[]
}

export const TrackingEventsTimeline = ({ events }: TrackingTableProps) => {
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
              <TimelineDot color="primary">
                <CheckIcon />
              </TimelineDot>
              {event.status !== OrderStatus.DELIVERED && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <$Address>
                {event.locationAddress}
                {event.status}
              </$Address>
              <$Date>{moment.unix(event.timestamp).format('L')}</$Date>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </$Container>
  )
}
