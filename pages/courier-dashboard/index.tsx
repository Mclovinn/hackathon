import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import styled from 'styled-components'
import { useStoreState } from '../../store/hooks'
import { PrivatePage } from '../../components/routing/private-page'
import router from 'next/router'
import QrReaderModal from '../../components/sections/courier-dashboard/qr-reader-modal'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import CardsDetail from '../../components/sections/courier-dashboard/cards-detail'
import MenuAppBar from '../../components/navbar'
import { ErrorRedAlert } from '../../components/common/alert/error-red-alert'

const $Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 60px 0;
  gap: 40px;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopS}) {
    justify-content: center;
    height: auto;
  }
`

const $Title = styled(Typography)`
  font-size: 1.3rem;
  align-self: flex-start;
  padding-left: 30px;
  font-weight: 200;
  span {
    font-weight: 500;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopS}) {
    align-self: center;
    justify-content: center;
    max-width: 800px;
    height: auto;
    padding-left: 0;
  }
`

const CourierDashboard = (): ReactElement => {
  const { sessionModel } = useStoreState(store => store)

  const [showScanner, setShowScanner] = useState<boolean>(false)
  const [qrCode, setCode] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    if (sessionModel.session.name) setUsername(sessionModel.session.name)
  }, [sessionModel.session.name])

  useEffect(() => {
    if (qrCode) {
      setShowScanner(false)
      router.push(qrCode)
    }
  }, [qrCode])

  return (
    <PrivatePage>
      <div>
        <Head>
          <title>Blockwise | Courier</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MenuAppBar />
        <$Container>
          <$Title variant="h5">
            Welcome
            {username && (
              <>
                , <span>{username}</span>
              </>
            )}
            !
          </$Title>

          <CardsDetail />

          {!qrCode ? (
            <Button variant="contained" onClick={() => setShowScanner(true)} startIcon={<QrCodeScannerIcon />}>
              QR ORDER DETAIL
            </Button>
          ) : (
            <CircularProgress />
          )}
          {errorMsg && (
            <ErrorRedAlert
              title="Error reading QR detail"
              subtitle={`Please try again. (${errorMsg})`}
              onClose={() => setErrorMsg('')}
            />
          )}
        </$Container>
        <QrReaderModal
          open={showScanner}
          onSubmit={setCode}
          onClose={() => setShowScanner(false)}
          onError={error => {
            setShowScanner(false)
            setErrorMsg(error)
          }}
        />
      </div>
    </PrivatePage>
  )
}

export default CourierDashboard
