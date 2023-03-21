import { LoadingButton } from '@mui/lab'
import { Alert, Button } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getOrderByTrackingId, setOrderAsDelivered } from '../../../services/frontend-services/orders'
import { getTrackingInfo } from '../../../services/frontend-services/tracking'
import { useStoreState } from '../../../store/hooks'
import { OrderStatus } from '../../../types/order-status'
import { OrderType } from '../../../types/order.type'
import { TrackingType } from '../../../types/tracking.type'
import { UserRole } from '../../../types/user.type'
import { getDeliveredAndOrderedEvents } from '../../../utils/events'
import { SimpleTopNav } from '../../common/simple-topbar'
import { COURIER_DASHBOARD_URL } from '../../constant/url-routes'
import { EventsMap } from './map/event-map'
import { TrackingInfo } from './tracking-info'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import CheckIcon from '@mui/icons-material/Check'

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

interface TrackingSectionProps {
  trackingId: string
  showTopBar?: boolean
}

export const TrackingSection = ({ trackingId, showTopBar }: TrackingSectionProps) => {
  const router = useRouter()
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
    if (!trackingId || !orderInfo?.id) return
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
    if (trackingId) {
      onSearchOrderTrackingId(trackingId)
    }
  }, [trackingId])

  return (
    <>
      {showEventsMap ? (
        <>
          {showTopBar && <SimpleTopNav title="Event Map" onBack={() => setShowEventsMap(false)} />}
          <EventsMap markers={trackingInfo?.events} />
        </>
      ) : (
        <>
          {showTopBar && <SimpleTopNav title="QR detail" onBack={() => router.push(`${COURIER_DASHBOARD_URL}`)} />}
          <$Container>
            <TrackingInfo
              trackingId={trackingId}
              orderStatus={trackingInfo && trackingInfo.currentStatus}
              shippingDate={orderInfo && orderInfo.shipped}
              manifestId={orderInfo?.manifestId}
              location={orderInfo?.destinationAddress}
            />

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <$ButtonsWrapper>
              {trackingId && orderInfo && sessionModel.session.role === UserRole.COURIER && (
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
    </>
  )
}
