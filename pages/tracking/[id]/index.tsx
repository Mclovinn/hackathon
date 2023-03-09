import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TrackingInfo } from '../../../components/sections/tracking/tracking-info'
import { TrackingTable } from '../../../components/sections/tracking/tracking-table'
import { Map } from '../../../components/sections/tracking/map/map'
import { TrackingType } from '../../../types/tracking.type'
import { getTrackingInfo } from '../../../services/frontend-services/tracking'

const $Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
  gap: 50px;
`

const $Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const OrderDetailPage = (): ReactElement => {
  const router = useRouter()
  const { id } = router.query
  const [trackingId, setTrackingId] = useState<string>('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingType>()

  const onSearchTrackingId = async (trackingId: string) => {
    const response = await getTrackingInfo(trackingId)
    console.log(response)
    //const deliveredEvents = getDeliveredAndOrderedEvents(response.events)
    //setTrackingInfo({ currentStatus: response.currentStatus, events: deliveredEvents })
    //setShowTrackingInfo(true)
  }

  useEffect(() => {
    if (id) {
      setTrackingId(id.toString())
      onSearchTrackingId(id.toString())
      setTrackingInfo(undefined)
    }
  }, [id])

  return (
    <$Container>
      <h1>Order detail {id}</h1>
      {trackingInfo && (
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

export default OrderDetailPage
