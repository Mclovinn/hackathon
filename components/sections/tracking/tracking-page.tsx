import React from 'react'
import { Map } from './map/map'
import styled from 'styled-components'
import { AddressType } from '../../../types/address.type'
import { SearchInput } from './search-input'

const $TemporaryContainer = styled.div`
  width: calc(100% - 300px);
  height: 100%;
`

const $Container = styled.div`
  margin-top: 40px;
`

// Map TODO - Fetch and send ordered markers array as prop to map
const hardcodedMarkers: AddressType[] = [
  {
    latitude: -31.38397,
    longitude: -64.180263,
  },
  {
    latitude: -31.403872,
    longitude: -64.206361,
  },
  {
    latitude: -31.428227,
    longitude: -64.18532,
  },
  {
    latitude: -31.449065,
    longitude: -64.17536,
  },
]

export const TrackingPage = () => {
  const handleSubmit = () => {
    console.log('searching...')
  }

  return (
    <$Container>
      <SearchInput onSubmit={handleSubmit} />
      <Map markers={hardcodedMarkers} />
    </$Container>
  )
}
