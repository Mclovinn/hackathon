import React from 'react'
import styled from 'styled-components'
import { PrimaryButton } from '../../common/buttons/primary-button'
import { Input } from '../../common/input'

const $Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const $PrimaryButton = styled(PrimaryButton)`
  max-width: 100px;
`

const $Input = styled(Input)`
  margin-right: 15px;
`
interface SearchInputProps {
  // eslint-disable-next-line no-unused-vars
  onInputChange: (value: string) => void
  trackingId: string
  onSubmit: () => void
}

export const SearchInput = ({ onInputChange, trackingId, onSubmit }: SearchInputProps) => {
  return (
    <$Container>
      <$Input placeholder={'Search by ID...'} onChange={e => onInputChange(e.target.value)} value={trackingId} />
      <$PrimaryButton onClick={() => trackingId !== '' && onSubmit()}>Submit</$PrimaryButton>
    </$Container>
  )
}
