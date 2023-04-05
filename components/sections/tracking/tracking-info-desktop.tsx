import { Chip } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getOrderAddress } from '../../../services/frontend-services/google-maps'
import { getOrderByTrackingId } from '../../../services/frontend-services/orders'
import { AddressType } from '../../../types/address.type'
import { OrderStatus } from '../../../types/order-status'
import { OrderType } from '../../../types/order.type'
import BackgroundCard from '../../common/background-card'

const $Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-weight: 400;
`

const $Label = styled.div`
  margin-right: 15px;
  margin-left: 15px;
`

const $Id = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.desktopS}) {
    font-size: 12px;
    font-weight: 200;
  }
`
const $Chip = styled(Chip)`
  margin-left: 10px;
`

const $Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 15px;
  margin-top: 10px;
`

interface InfoProps {
  trackingId: string
  orderStatus?: OrderStatus
}
export const TrackingInfoDesktop = ({ trackingId, orderStatus }: InfoProps) => {
  const [address, setAddress] = useState<string>('')
  const [orderInfo, setOrderInfo] = useState<OrderType>()
  const onSearchOrderTrackingId = async (trackingId: string) => {
    try {
      const data = await getOrderByTrackingId(trackingId)
      if (data) setOrderInfo(data)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  const getAddress = async (location?: AddressType) => {
    if (location) setAddress(await getOrderAddress(location.latitude, location.longitude))
  }

  onSearchOrderTrackingId(trackingId)
  useEffect(() => {
    if (!orderInfo?.destinationAddress) return
    getAddress(orderInfo?.destinationAddress)
  }, [orderInfo])

  return (
    <BackgroundCard title={`Tracking ID: ${trackingId}`}>
      <$Container>
        <$Wrapper>
          <$Label>
            Status:
            {orderStatus && orderStatus === OrderStatus.DELIVERED ? (
              <$Chip label="Delivered" color="success" size="small" />
            ) : (
              orderStatus === OrderStatus.IN_TRANSIT && (
                <$Chip label="In Transit" size="small" color="success" variant="outlined" />
              )
            )}
          </$Label>
        </$Wrapper>

        <$Wrapper>
          <$Label>Shipping date: {orderInfo?.shipped && moment(orderInfo.shipped).format('L')}</$Label>
        </$Wrapper>

        <$Wrapper>
          <$Label>Shipping Address: {address || '-'}</$Label>
        </$Wrapper>

        <$Wrapper>
          <$Label>
            Manifest ID: <$Id>{orderInfo?.manifestId}</$Id>
          </$Label>
        </$Wrapper>
      </$Container>
    </BackgroundCard>
  )
}
