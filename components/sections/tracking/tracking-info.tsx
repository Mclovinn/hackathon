import { Chip } from '@mui/material'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { OrderStatus } from '../../../types/order-status'

const $Container = styled.div``
const $Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;
  font-size: 17px;
  font-weight: 400;
`

const $Label = styled.div`
  margin-right: 15px;
  margin-left: 15px;
`
const $Status = styled.div<{ orderStatus: OrderStatus }>`
  font-weight: bold;
  color: ${({ theme, orderStatus }) =>
    orderStatus === OrderStatus.IN_TRANSIT ? theme.status.inTransit : theme.status.delivered};
`
interface InfoProps {
  trackingId: string
  orderStatus?: OrderStatus
  shippingDate?: Date
  manifestId?: string
}
export const TrackingInfo = ({ trackingId, orderStatus, shippingDate, manifestId }: InfoProps) => {
  return (
    <$Container>
      <$Wrapper>
        <$Label>Tracking ID: </$Label>
        {trackingId}
      </$Wrapper>

      <$Wrapper>
        <$Label>Status: </$Label>
        {orderStatus && (
          <$Status orderStatus={orderStatus}>
            {orderStatus === OrderStatus.DELIVERED ? (
              <Chip label="Delivered" color="success" size="small" variant="outlined" />
            ) : (
              orderStatus === OrderStatus.IN_TRANSIT && <Chip label="In Transit" size="small" variant="outlined" />
            )}
          </$Status>
        )}
      </$Wrapper>

      <$Wrapper>
        <$Label>Shipping Date: </$Label>
        {shippingDate && moment(shippingDate).format('L')}
      </$Wrapper>

      <$Wrapper>
        <$Label>Shipping Address: -</$Label>
      </$Wrapper>

      <$Wrapper>
        <$Label>Manifest ID: </$Label>
        {manifestId}
      </$Wrapper>
    </$Container>
  )
}
