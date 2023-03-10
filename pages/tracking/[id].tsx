import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TrackingInfo } from '../../components/sections/tracking/tracking-info'
import { TrackingTable } from '../../components/sections/tracking/tracking-table'
import { Map } from '../../components/sections/tracking/map/map'
import { TrackingType } from '../../types/tracking.type'
import { getTrackingInfo } from '../../services/frontend-services/tracking'
import { getDeliveredAndOrderedEvents } from '../../utils/events'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from '../../styles/darkTheme'

const $Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`

const $Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const OrderDetailPage = (): ReactElement => {
  const router = useRouter()
  const { id } = router.query
  const [trackingId, setTrackingId] = useState<string>('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingType>()

  const onSearchTrackingId = async (trackingId: string) => {
    const response = await getTrackingInfo(trackingId)
    const deliveredEvents = getDeliveredAndOrderedEvents(response.events)
    setTrackingInfo({ currentStatus: response.currentStatus, events: deliveredEvents })
  }

  useEffect(() => {
    if (id) {
      setTrackingId(id.toString())
      onSearchTrackingId(id.toString())
    }
  }, [id])

  return (
    <ThemeProvider theme={darkTheme}>
      <$Container>
        <h1>QR Detail</h1>
        <TrackingInfo trackingId={trackingId} orderStatus={trackingInfo && trackingInfo.currentStatus} />
        {trackingInfo && (
          <$Wrapper>
            <TrackingTable events={trackingInfo.events} />
            <Map markers={trackingInfo.events} />
          </$Wrapper>
        )}
      </$Container>
    </ThemeProvider>
  )
}

export default OrderDetailPage
