import React, { ReactElement } from 'react'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from '../../styles/darkTheme'
import { TrackingSection } from '../../components/sections/tracking/tracking-section'
import { useRouter } from 'next/router'

const OrderDetailPage = (): ReactElement => {
  const router = useRouter()
  const { id } = router.query
  return (
    <ThemeProvider theme={darkTheme}>{id && <TrackingSection trackingId={id?.toString()} showTopBar />}</ThemeProvider>
  )
}

export default OrderDetailPage
