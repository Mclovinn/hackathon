import React from 'react'
import styled from 'styled-components'
import { EventType } from '../../../../types/tracking.type'
import { EventsDrawer } from '../events/events-drawer'
import { Map } from './map'

const $Container = styled.div`
  display: flex;
  justify-content: center;
`

interface EventsMapProps {
  markers?: EventType[]
}

export const EventsMap = ({ markers }: EventsMapProps) => {
  return (
    <$Container>
      <Map markers={markers} />
      <EventsDrawer events={markers} />
    </$Container>
  )
}
