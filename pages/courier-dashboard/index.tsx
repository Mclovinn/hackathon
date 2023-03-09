import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
import styled from 'styled-components'
import { useStoreState } from '../../store/hooks'
import { PrivatePage } from '../../components/routing/private-page'
import QrCodeReader from '../../libs/qrcode-reader-alpha/dist/index.es'

const $Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
  gap: 50px;
`

const $Button = styled(Button)`
  background-color: ${({ theme }) => theme.palette.colors.smalt};
  color: ${({ theme }) => theme.palette.colors.white};
`

const Login = (): ReactElement => {
  const { sessionModel } = useStoreState(store => store)

  const [showScanner, setShowScanner] = useState<boolean>(false)
  const [qrCode, setCode] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    if (sessionModel.session.name) setUsername(sessionModel.session.name)
  }, [sessionModel.session.name])

  useEffect(() => {
    // TODO: redirect
    if (qrCode) console.log(qrCode)
  }, [qrCode])

  return (
    <PrivatePage>
      <div>
        <Head>
          <title>Blockwise | Courier</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <$Container>
          <Typography variant="h1">Welcome{username && `, ${username}`}!</Typography>

          {!qrCode ? (
            !showScanner ? (
              <$Button variant="contained" onClick={() => setShowScanner(!showScanner)}>
                SCAN QR
              </$Button>
            ) : (
              <QrCodeReader
                delay={100}
                width={400}
                height={400}
                action={setCode}
                videoConstraints={{
                  video: {
                    width: { ideal: 1024 },
                    height: { ideal: 576 },
                    facingMode: { exact: 'environment' },
                  },
                }}
              />
            )
          ) : (
            <CircularProgress />
          )}
        </$Container>
      </div>
    </PrivatePage>
  )
}

export default Login
