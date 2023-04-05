import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchInput } from './search-input'
import { TrackingInfoDesktop } from './tracking-info-desktop'
import { TrackingEventsTimeline } from './tracking-timeline'
import { Map } from './map/map'
import { getTrackingInfo } from '../../../services/frontend-services/tracking'
import { TrackingType } from '../../../types/tracking.type'
import { getDeliveredAndOrderedEvents } from '../../../utils/events'

const $Container = styled.div`
  background: ${({ theme }) => theme.palette.colors.nero};
  border-radius: 19px;
  margin: 40px 37px;
  padding: 39px 36px;
  min-height: calc(100vh - 265px);
`
export const TrackingSearcher = () => {
  const [showTrackingInfo, setShowTrackingInfo] = useState<boolean>(false)
  const [trackingId, setTrackingId] = useState<string>('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingType>()

  const onInputChange = (value: string) => {
    setTrackingId(value)
  }

  const $ContainerInfo = styled.div`
    @media (min-width: ${({ theme }) => theme.breakpoints.desktopS}) {
      margin: 47px 38px 20px 0;
    }
  `

  const $Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 25px;
    @media (min-width: ${({ theme }) => theme.breakpoints.desktopS}) {
      align-items: flex-start;
    }
  `

  const onSearchTrackingId = async () => {
    const response = await getTrackingInfo(trackingId)
    const deliveredEvents = getDeliveredAndOrderedEvents(response.events)
    setTrackingInfo({ currentStatus: response.currentStatus, events: deliveredEvents })
    setShowTrackingInfo(true)
  }

  return (
    <$Container>
      <SearchInput onInputChange={onInputChange} trackingId={trackingId} onSubmit={onSearchTrackingId} />
      {showTrackingInfo && trackingInfo && (
        <$ContainerInfo>
          <TrackingInfoDesktop trackingId={trackingId} orderStatus={trackingInfo && trackingInfo.currentStatus} />

          <$Wrapper>
            <TrackingEventsTimeline events={trackingInfo.events} />
            <Map markers={trackingInfo.events} />
          </$Wrapper>
        </$ContainerInfo>
      )}
    </$Container>
  )
}
