import styled from 'styled-components'
import { getOpacityInHex } from '../../styles/themes'

export const Input = styled.input`
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 2px;
  box-shadow: 0 6px 16px ${({ theme }) => theme.palette.colors.black + getOpacityInHex(12)};
  :focus-visible {
    outline: none;
  }
`
