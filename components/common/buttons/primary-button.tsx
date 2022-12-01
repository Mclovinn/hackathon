import styled from 'styled-components'
import { getOpacityInHex } from '../../../styles/themes'
import { TransparentButton } from './transparent-button'

export const PrimaryButton = styled(TransparentButton)`
  border-radius: 12px;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.colors.smalt};
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: 16px;
  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.colors.smalt + getOpacityInHex(95)};
  }
  :disabled {
    background-color: ${({ theme }) => theme.palette.colors.nobel};
  }
`
