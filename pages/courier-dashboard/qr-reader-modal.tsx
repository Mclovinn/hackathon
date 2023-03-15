import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'
import QrCodeReader from 'react-qrcode-reader'
import styled from 'styled-components'

interface QrReaderModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  onSubmit: (qrCode: string) => void
  onClose: () => void
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const $Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const QrReaderModal = ({ open, onSubmit, onClose }: QrReaderModalProps) => {
  const [qrCode, setCode] = useState<string>('')
  const [innerWidth, setInnerWidth] = useState<number>(0)

  useEffect(() => {
    if (window) {
      console.log(window.innerWidth)
      const availableWidth = window.innerWidth > 600 ? 600 : window.innerWidth
      setInnerWidth(availableWidth)
    }
  }, [])

  useEffect(() => {
    if (qrCode) onSubmit(qrCode)
  }, [onSubmit, qrCode])

  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Scan QR Code
          </Typography>
        </Toolbar>
      </AppBar>
      <$Container>
        <QrCodeReader
          delay={100}
          width={innerWidth}
          height={innerWidth}
          action={setCode}
          videoConstraints={{
            facingMode: 'environment',
            aspectRatio: 1.1,
          }}
        />
      </$Container>
    </Dialog>
  )
}
