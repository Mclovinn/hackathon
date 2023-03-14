import React from 'react'
import styled from 'styled-components'
import { OrderStatus } from '../../../types/order-status'

const $Container = styled.div``
const $Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;
  font-size: 18px;
`
const $Id = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.colors.zambezi};
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
}
export const TrackingInfo = ({ trackingId, orderStatus, shippingDate }: InfoProps) => {
  return (
    <$Container>
      <$Wrapper>
        <$Label>Tracking ID: </$Label>
        <$Id>{trackingId}</$Id>
      </$Wrapper>

      <$Wrapper>
        <$Label>Status: </$Label>
        {orderStatus && (
          <$Status orderStatus={orderStatus}>
            {orderStatus === OrderStatus.DELIVERED
              ? 'Delivered'
              : orderStatus === OrderStatus.IN_TRANSIT && 'In Transit'}
          </$Status>
        )}
      </$Wrapper>

      <$Wrapper>
        <$Label>Shipping Date: </$Label>
        {shippingDate && <$Id>{shippingDate}</$Id>}
      </$Wrapper>
    </$Container>
  )
}
