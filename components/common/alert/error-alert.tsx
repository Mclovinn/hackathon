import * as React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import { AlertTitle, styled } from '@mui/material'
import { useState } from 'react'

const $Alert = styled(Alert)`
  position: fixed;
  top: 25px;
  background-color: #ed45459a;
  font-size: 16px;
  color: white;
`

export const ErrorAlert = () => {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <$Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle sx={{ fontSize: 22 }}>Transaction Error!</AlertTitle>
          Something went wrong...
        </$Alert>
      </Collapse>
    </Box>
  )
}
