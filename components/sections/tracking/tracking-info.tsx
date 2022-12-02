import React from 'react'
import styled from 'styled-components'
import { OrderStatus } from '../../../types/order-status'

const $Container = styled.div`
  margin-top: 40px;
`
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
  margin-right: 12px;
`
const $Status = styled.div<{ orderStatus: OrderStatus }>`
  font-weight: bold;
  color: ${({ theme, orderStatus }) =>
    orderStatus === OrderStatus.InTransit ? theme.status.inTransit : theme.status.delivered};
`
interface InfoProps {
  trackingId: string
  orderStatus: OrderStatus
  showTrackingInfo: boolean
}
export const TrackingInfo = ({ trackingId, orderStatus }: InfoProps) => {
  return (
    <$Container>
      <$Wrapper>
        <$Label>Tracking ID: </$Label>
        <$Id>{trackingId}</$Id>
      </$Wrapper>
      <$Wrapper>
        <$Label>Status: </$Label>
        <$Status orderStatus={orderStatus}>
          {orderStatus === OrderStatus.Delivered ? 'Delivered' : orderStatus === OrderStatus.InTransit && 'In Transit'}
        </$Status>
      </$Wrapper>
    </$Container>
  )
}
