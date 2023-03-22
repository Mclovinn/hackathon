import React, { ReactElement } from 'react'
import styled from 'styled-components'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { IconButton, Typography } from '@mui/material'

const $NavBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  height: 60px;
`

const $IconButton = styled(IconButton)`
  position: absolute !important;
  left: 15px;
`

const $Title = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 700;
  flex-grow: 1;
  text-align: center;
`

interface SimpleTopNavProps {
  title: string
  onBack: () => void
}

export const SimpleTopNav = ({ onBack, title }: SimpleTopNavProps): ReactElement => {
  return (
    <$NavBar>
      <$IconButton aria-label="delete" size="small" onClick={onBack}>
        <ArrowBackIosNewOutlinedIcon fontSize="inherit" />
      </$IconButton>
      <$Title variant="h5">{title}</$Title>
    </$NavBar>
  )
}
