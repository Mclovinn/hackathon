import Head from 'next/head'
import { cloneElement, ReactElement, useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import styled from 'styled-components'
import { useStoreState } from '../../store/hooks'
import { PrivatePage } from '../../components/routing/private-page'
import router from 'next/router'
import QrReaderModal from './qr-reader-modal'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import CheckIcon from '@mui/icons-material/Check'

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
  padding-left: 40px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopS}) {
    align-self: center;
    justify-content: center;
    max-width: 800px;
    height: auto;
    padding-left: 0;
  }
`

const $CardTitle = styled(Typography)`
  display: flex;
  align-items: center;
  svg {
    width: 50px;
  }
`

const CourierDashboard = (): ReactElement => {
  const { sessionModel } = useStoreState(store => store)

  const [showScanner, setShowScanner] = useState<boolean>(false)
  const [qrCode, setCode] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    if (sessionModel.session.name) setUsername(sessionModel.session.name)
  }, [sessionModel.session.name])

  function generate(element: ReactElement) {
    return [0, 1, 2].map(value =>
      cloneElement(element, {
        key: value,
      })
    )
  }

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
        <$Container>
          <$Title variant="h5">Welcome{username && `, ${username}`}!</$Title>

          <Card
            sx={{
              width: {
                xs: 0.8,
                md: 600,
              },
            }}
            variant="outlined"
          >
            <CardContent>
              <$CardTitle gutterBottom variant="h6">
                <DescriptionOutlinedIcon />
                Active Orders
              </$CardTitle>
              <List dense>
                {generate(
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: {
                xs: 0.8,
                md: 600,
              },
            }}
          >
            <CardContent>
              <$CardTitle gutterBottom variant="h6">
                <CheckIcon />
                Orders Delivered
              </$CardTitle>
              <List dense>
                {generate(
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>

          {!qrCode ? (
            <Button variant="contained" onClick={() => setShowScanner(true)} startIcon={<QrCodeScannerIcon />}>
              QR ORDER DETAIL
            </Button>
          ) : (
            <CircularProgress />
          )}
        </$Container>
        <QrReaderModal open={showScanner} onSubmit={setCode} onClose={() => setShowScanner(false)} />
      </div>
    </PrivatePage>
  )
}

export default CourierDashboard
