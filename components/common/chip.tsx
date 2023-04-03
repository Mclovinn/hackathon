import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Chip, ChipProps } from '@mui/material'
import { OrderStatus } from '../../types/order-status'

const $StyledChip = styled((props: ChipProps) => <Chip {...props} />)(({ theme }) => ({
  width: '100%',
  fontFamily: 'Lato',

  fontWeight: 400,
  fontSize: '0.813rem',

  '&.READY_TO_FULFILL': {
    background: theme.palette.colors.warningMain,
  },

  '&.DELIVERED': {
    background: theme.palette.colors.greenLight,
    color: theme.palette.colors.white,
  },

  '&.IN_TRANSIT': {
    borderColor: theme.palette.colors.greenLight,
    color: theme.palette.colors.white,
  },
}))

interface StatusChipsProps {
  status: OrderStatus
}

export const StatusChips = ({ status }: StatusChipsProps): ReactElement => {
  return (
    <$StyledChip
      label={status.replace(/_/g, ' ')}
      variant={status === OrderStatus.IN_TRANSIT ? 'outlined' : 'filled'}
      className={status}
    />
  )
}
