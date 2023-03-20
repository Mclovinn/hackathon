import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TrackingInfo } from '../../components/sections/tracking/tracking-info'
import { TrackingType } from '../../types/tracking.type'
import { getTrackingInfo } from '../../services/frontend-services/tracking'
import { getDeliveredAndOrderedEvents } from '../../utils/events'
import { Alert, Button, ThemeProvider } from '@mui/material'
import { darkTheme } from '../../styles/darkTheme'
import axios from 'axios'
import { getOrderByTrackingId, setOrderAsDelivered } from '../../services/frontend-services/orders'
import { OrderType } from '../../types/order.type'
import { OrderStatus } from '../../types/order-status'
import { useStoreState } from '../../store/hooks'
import { UserRole } from '../../types/user.type'
import { useQuery } from 'react-query'
import BackgroundCard from '../../components/common/background-card'
import { LoadingButton } from '@mui/lab'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import CheckIcon from '@mui/icons-material/Check'
import { EventsMap } from '../../components/sections/tracking/map/event-map'
import { SimpleTopNav } from '../../components/common/simple-topbar'
import { COURIER_DASHBOARD_URL } from '../../components/constant/url-routes'

const $Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
  margin-top: 20px;
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
  const [showEventsMap, setShowEventsMap] = useState<boolean>(false)
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
    if (transactionHash || trackingInfo?.currentStatus == OrderStatus.DELIVERED) return
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
      {showEventsMap ? (
        <>
          <SimpleTopNav title="Event Map" onBack={() => setShowEventsMap(false)} />
          <EventsMap markers={trackingInfo?.events} />
        </>
      ) : (
        <>
          <SimpleTopNav title="QR detail" onBack={() => router.push(`${COURIER_DASHBOARD_URL}`)} />
          <$Container>
            <BackgroundCard title={`Tracking Info`}>
              <TrackingInfo
                trackingId={trackingId}
                orderStatus={trackingInfo && trackingInfo.currentStatus}
                shippingDate={orderInfo && orderInfo.shipped}
                manifestId={orderInfo?.manifestId}
                location={orderInfo?.destinationAddress}
              />
            </BackgroundCard>

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <$ButtonsWrapper>
              {id && orderInfo && sessionModel.session.role === UserRole.COURIER && (
                <LoadingButton
                  color={
                    !transactionHash && trackingInfo?.currentStatus !== OrderStatus.DELIVERED ? 'primary' : 'success'
                  }
                  onClick={() => deliverOrder()}
                  loading={loadingTransaction}
                  loadingPosition="start"
                  variant="contained"
                  startIcon={
                    transactionHash || trackingInfo?.currentStatus == OrderStatus.DELIVERED ? (
                      <CheckIcon />
                    ) : (
                      <LocalShippingOutlinedIcon />
                    )
                  }
                >
                  <span>
                    {transactionHash || trackingInfo?.currentStatus == OrderStatus.DELIVERED
                      ? 'DELIVERED'
                      : loadingTransaction
                      ? 'Saving'
                      : 'MARK AS DELIVERED'}
                  </span>
                </LoadingButton>
              )}
              <Button variant="contained" onClick={() => setShowEventsMap(true)}>
                SHOW MAP
              </Button>
            </$ButtonsWrapper>
            {txError && <Alert severity="error">{txError}</Alert>}
          </$Container>
        </>
      )}
    </ThemeProvider>
  )
}

export default OrderDetailPage
