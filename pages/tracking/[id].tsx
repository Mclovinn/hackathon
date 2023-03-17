import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TrackingInfo } from '../../components/sections/tracking/tracking-info'
import { TrackingTable } from '../../components/sections/tracking/tracking-table'
import { Map } from '../../components/sections/tracking/map/map'
import { TrackingType } from '../../types/tracking.type'
import { getTrackingInfo } from '../../services/frontend-services/tracking'
import { getDeliveredAndOrderedEvents } from '../../utils/events'
import { Alert, Button, CircularProgress, ThemeProvider, Typography } from '@mui/material'
import { darkTheme } from '../../styles/darkTheme'
import axios from 'axios'
import { getOrderByTrackingId, setOrderAsDelivered } from '../../services/frontend-services/orders'
import { OrderType } from '../../types/order.type'
import { OrderStatus } from '../../types/order-status'
import { useStoreState } from '../../store/hooks'
import { UserRole } from '../../types/user.type'
import { useQuery } from 'react-query'
import BackgroundCard from '../../components/common/background-card'

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

const $Title = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 700;
  align-self: center;
  justify-content: center;
  padding: 20px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopS}) {
    height: auto;
    padding-left: 0;
  }
`

const $ButtonsWrapper = styled.div`
  display: flex;
  gap: 50px;
`

const OrderDetailPage = (): ReactElement => {
  const router = useRouter()
  const { id } = router.query
  const [trackingId, setTrackingId] = useState<string>('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingType>()
  const [orderInfo, setOrderInfo] = useState<OrderType>()
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false)
  const [txError, setTxError] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const { sessionModel } = useStoreState(store => store)

  const {
    data: order,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['get-order', trackingId, transactionHash],
    queryFn: () => getTrackingInfo(trackingId),
    enabled: !!trackingId,
    retry: false,
  })

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data.error || 'Request Error')
      } else setErrorMsg('Error! See console logs.')
      console.error(error)
    }
    if (!order) return
    const deliveredEvents = getDeliveredAndOrderedEvents(order.events)
    setTrackingInfo({ currentStatus: order.currentStatus, events: deliveredEvents })
  }, [order, isError, error])

  const onSearchOrderTrackingId = async (trackingId: string) => {
    try {
      const data = await getOrderByTrackingId(trackingId)
      console.log(data)
      if (data) setOrderInfo(data)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  const deliverOrder = async () => {
    setTxError('')
    setLoadingTransaction(true)
    if (!id || !orderInfo?.id) return
    try {
      const data = await setOrderAsDelivered(orderInfo?.id)
      setTransactionHash(data.txHash)
      refetch()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setTxError(error.response?.data || 'Request Error')
      } else setErrorMsg('Error! See console logs.')
      console.error(error)
    } finally {
      setLoadingTransaction(false)
    }
  }

  useEffect(() => {
    if (id) {
      const trackingId = id.toString()
      setTrackingId(trackingId)
      onSearchOrderTrackingId(trackingId)
    }
  }, [id])

  return (
    <ThemeProvider theme={darkTheme}>
      <$Container>
        <$Title variant="h5">QR detail</$Title>

        <BackgroundCard title={`Tracking Info`}>
          <TrackingInfo
            trackingId={trackingId}
            orderStatus={trackingInfo && trackingInfo.currentStatus}
            shippingDate={orderInfo && orderInfo.shipped}
            manifestId={orderInfo?.manifestId}
            location={orderInfo?.destinationAddress}
          />
        </BackgroundCard>

        {trackingInfo && (
          <$Wrapper>
            <TrackingTable events={trackingInfo.events} />
            <Map markers={trackingInfo.events} />
          </$Wrapper>
        )}
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <$ButtonsWrapper>
          {!loadingTransaction ? (
            id &&
            orderInfo &&
            sessionModel.session.role === UserRole.COURIER &&
            trackingInfo?.currentStatus !== OrderStatus.DELIVERED &&
            !transactionHash && (
              <Button variant="contained" onClick={() => deliverOrder()}>
                DELIVERED
              </Button>
            )
          ) : (
            <CircularProgress />
          )}
          <Button variant="contained" onClick={() => deliverOrder()}>
            SHOW MAP
          </Button>
        </$ButtonsWrapper>
        {txError && <Alert severity="error">{txError}</Alert>}
        {transactionHash && <Alert severity="success">DELIVERED! Tx: {transactionHash}</Alert>}
      </$Container>
    </ThemeProvider>
  )
}

export default OrderDetailPage
