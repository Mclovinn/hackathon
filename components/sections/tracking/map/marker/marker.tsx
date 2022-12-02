import React, { ReactElement } from 'react'
import styled from 'styled-components'

const $Marker = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${({ theme }) => theme.palette.colors.smalt};
  border: 1px solid ${({ theme }) => theme.palette.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.palette.text};
  font-size: 1rem;
`

interface MarkerProps {
  number: number
  lat: number
  lng: number
}

export const Marker = ({ number }: MarkerProps): ReactElement => {
  return <$Marker>{number}</$Marker>
}
