import React, { useState } from 'react'
import styled from 'styled-components'
import { AddressType } from '../../../types/address.type'
import { OrderStatus } from '../../../types/order-status'
import { SearchInput } from './search-input'
import { TrackingInfo } from './tracking-info'
import { TrackingTable } from './tracking-table'
import { Map } from './map/map'

const $Container = styled.div`
  margin-top: 40px;
`
export const TrackingPage = () => {
  const [showTrackingInfo, setShowTrackingInfo] = useState<boolean>(false)
  const [trackingId, setTrackingId] = useState<string>('')
  const onInputChange = (value: string) => {
    setTrackingId(value)
  }

  const hardcodedMarkers: AddressType[] = [
    {
      latitude: -31.38397,
      longitude: -64.180263,
    },
    {
      latitude: -31.403872,
      longitude: -64.206361,
    },
    {
      latitude: -31.428227,
      longitude: -64.18532,
    },
    {
      latitude: -31.449065,
      longitude: -64.17536,
    },
  ]

  const $Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `
  return (
    <$Container>
      <SearchInput onInputChange={onInputChange} trackingId={trackingId} setShowTrackingInfo={setShowTrackingInfo} />
      {showTrackingInfo ? (
        <>
          <TrackingInfo
            trackingId={trackingId}
            orderStatus={OrderStatus.Delivered}
            showTrackingInfo={showTrackingInfo}
          />
          <$Wrapper>
            <Map markers={hardcodedMarkers} />

            <TrackingTable />
          </$Wrapper>
        </>
      ) : null}
    </$Container>
  )
}
