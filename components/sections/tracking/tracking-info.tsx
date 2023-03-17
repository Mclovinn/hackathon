import { Chip } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getOrderAddress } from '../../../services/frontend-services/google-maps'
import { AddressType } from '../../../types/address.type'
import { OrderStatus } from '../../../types/order-status'

const $Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;
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

interface InfoProps {
  trackingId: string
  orderStatus?: OrderStatus
  shippingDate?: Date
  manifestId?: string
  location?: AddressType
}
export const TrackingInfo = ({ trackingId, orderStatus, shippingDate, manifestId, location }: InfoProps) => {
  const [address, setAddress] = useState<string>('')

  const getAddress = async (location?: AddressType) => {
    if (location) setAddress(await getOrderAddress(location.latitude, location.longitude))
  }

  useEffect(() => {
    if (!location) return
    getAddress(location)
  }, [location])

  return (
    <>
      <$Wrapper>
        <$Label>
          Tracking ID: <$Id>{trackingId}</$Id>
        </$Label>
      </$Wrapper>

      <$Wrapper>
        <$Label>
          Status:
          {orderStatus && orderStatus === OrderStatus.DELIVERED ? (
            <$Chip label="Delivered" color="success" size="small" variant="outlined" />
          ) : (
            orderStatus === OrderStatus.IN_TRANSIT && <$Chip label="In Transit" size="small" variant="outlined" />
          )}
        </$Label>
      </$Wrapper>

      <$Wrapper>
        <$Label>Shipping date: {shippingDate && moment(shippingDate).format('L')}</$Label>
      </$Wrapper>

      <$Wrapper>
        <$Label>Shipping Address: {address || '-'}</$Label>
      </$Wrapper>

      <$Wrapper>
        <$Label>
          Manifest ID: <$Id>{manifestId}</$Id>
        </$Label>
      </$Wrapper>
    </>
  )
}
