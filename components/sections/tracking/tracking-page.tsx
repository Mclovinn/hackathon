import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SearchInput } from './search-input'
import { TrackingInfo } from './tracking-info'
import { TrackingTable } from './tracking-table'
import { Map } from './map/map'
import { getTrackingInfo } from '../../../services/frontend-services/tracking'
import { TrackingType } from '../../../types/tracking.type'
import { getDeliveredAndOrderedEvents } from '../../../utils/events'
//import QrCodeReader from 'react-qrcode-reader'
import Webcam from 'react-webcam'

const $Container = styled.div`
  margin-top: 40px;
`
export const TrackingPage = () => {
  const [showTrackingInfo, setShowTrackingInfo] = useState<boolean>(false)
  const [trackingId, setTrackingId] = useState<string>('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingType>()
  //const [qrRead, setQrRead] = React.useState<string>('')

  const onInputChange = (value: string) => {
    setTrackingId(value)
  }

  const $Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `

  const onSearchTrackingId = async () => {
    const response = await getTrackingInfo(trackingId)
    const deliveredEvents = getDeliveredAndOrderedEvents(response.events)
    setTrackingInfo({ currentStatus: response.currentStatus, events: deliveredEvents })
    setShowTrackingInfo(true)
  }

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(data => console.log(data))
  }, [])

  return (
    <$Container>
      <Webcam width={500} height={500} videoConstraints={{ facingMode: 'environment' }} />
      {/* <QrCodeReader delay={100} width={500} height={500} action={setQrRead} deviceId="environment" /> */}
      {/* <p>{qrRead}</p> */}
      <SearchInput onInputChange={onInputChange} trackingId={trackingId} onSubmit={onSearchTrackingId} />
      {showTrackingInfo && trackingInfo && (
        <>
          <TrackingInfo trackingId={trackingId} orderStatus={trackingInfo.currentStatus} />
          <$Wrapper>
            <Map markers={trackingInfo.events} />
            <TrackingTable events={trackingInfo.events} />
          </$Wrapper>
        </>
      )}
    </$Container>
  )
}
