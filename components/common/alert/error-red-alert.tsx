import * as React from 'react'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { AlertTitle, styled } from '@mui/material'

const $Alert = styled(Alert)`
  width: 90%;
  max-width: 600px;
  .MuiAlert-message {
    font-weight: lighter;
  }
`

interface ErrorRedAlertProps {
  title: string
  subtitle: string
  onClose: () => void
}

export const ErrorRedAlert = ({ title, subtitle, onClose }: ErrorRedAlertProps) => {
  return (
    <$Alert
      variant="filled"
      severity="error"
      action={
        <IconButton aria-label="close" color="inherit" size="small" onClick={() => onClose()}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {subtitle}
    </$Alert>
  )
}
