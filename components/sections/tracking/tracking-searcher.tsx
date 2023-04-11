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
  const [showTrackingInfo, setShowTrackingInfo] = useState<boolean>()
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

  const $EmptyScreen = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 465px);
    & > .title {
      font-size: 2rem;
      font-weight: 500;
    }

    & > .text {
      font-size: 1rem;
      font-weight: 300;
      padding-top: 10px;
    }
  `
  const onSearchTrackingId = async () => {
    try {
      const response = await getTrackingInfo(trackingId)
      const deliveredEvents = getDeliveredAndOrderedEvents(response.events)
      setTrackingInfo({ currentStatus: response.currentStatus, events: deliveredEvents })
      setShowTrackingInfo(true)
    } catch (error: unknown) {
      setShowTrackingInfo(false)
      console.error(error)
    }
  }

  return (
    <$Container>
      {console.log('tos', showTrackingInfo)}
      <SearchInput onInputChange={onInputChange} trackingId={trackingId} onSubmit={onSearchTrackingId} />
      {showTrackingInfo === undefined ? (
        <$ContainerInfo />
      ) : showTrackingInfo && trackingInfo ? (
        <$ContainerInfo>
          <TrackingInfoDesktop trackingId={trackingId} orderStatus={trackingInfo && trackingInfo.currentStatus} />

          <$Wrapper>
            <TrackingEventsTimeline events={trackingInfo.events} />
            <Map markers={trackingInfo.events} />
          </$Wrapper>
        </$ContainerInfo>
      ) : (
        <$EmptyScreen>
          <div className="title">No Results</div>
          <div className="text">Try searching for a tracking number</div>
        </$EmptyScreen>
      )}
    </$Container>
  )
}
