import React from 'react'
import styled from 'styled-components'
import { SearchInput } from './search-input'

const $Container = styled.div`
  margin-top: 40px;
`
export const Tracking = () => {
  const handleSubmit = () => {
    console.log('searching...')
  }
  return (
    <$Container>
      <SearchInput onSubmit={handleSubmit} />
    </$Container>
  )
}
