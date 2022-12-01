import React from 'react'
import styled from 'styled-components'
import { PrimaryButton } from '../../common/buttons/primary-button'
import { Input } from '../../common/input'

const $Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items center;
`
const $Input = styled(Input)`
  margin-right: 15px;
`
interface SearchInputProps {
  onSubmit: () => void
}

export const SearchInput = ({ onSubmit }: SearchInputProps) => {
  return (
    <$Container>
      <$Input placeholder={'Search by ID...'} type="text" />
      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
    </$Container>
  )
}
