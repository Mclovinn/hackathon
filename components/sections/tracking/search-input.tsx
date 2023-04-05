import { alpha, Button, InputBase } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'

const $Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const $Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: alpha(theme.palette.colors.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.colors.white, 0.25),
  },
  marginLeft: 0,
  minWidth: '185px',
  width: 'auto',
  '& .MuiInputBase-root': {
    width: '100%',
  },
  marginRight: '21px',
}))

const $SearchIconWrapper = styled('div')(({}) => ({
  padding: '9px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const $StyledInputBase = styled(InputBase)(() => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '12px',
    paddingLeft: `40px`,
    width: '100%',
    '@media (min-width: 769px)': {
      width: '320px',
    },
  },
}))

const $StyledButton = styled(Button)(() => ({
  height: '47px',
}))

interface SearchInputProps {
  // eslint-disable-next-line no-unused-vars
  onInputChange: (value: string) => void
  trackingId: string
  onSubmit: () => void
}

export const SearchInput = ({ onInputChange, trackingId, onSubmit }: SearchInputProps) => {
  return (
    <$Container>
      <$Search>
        <$SearchIconWrapper>
          <SearchIcon />
        </$SearchIconWrapper>
        <$StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={e => onInputChange(e.target.value)}
          value={trackingId}
        />
      </$Search>

      <$StyledButton variant="contained" onClick={() => trackingId !== '' && onSubmit()}>
        SUBMIT
      </$StyledButton>
    </$Container>
  )
}
