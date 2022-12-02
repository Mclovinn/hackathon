import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { SectionsType } from '../../types/section.types'
import { TransparentButton } from './buttons/transparent-button'

const $SidenavContainer = styled.div`
  height: 100%;
  background: transparent;
  max-width: 220px;
`
const $ButtonWrapper = styled.div`
  margin-top: 200px;
`

interface $TransparentButtonProps {
  isActive: boolean
}

const $TransparentButton = styled(TransparentButton)<$TransparentButtonProps>`
  ${({ isActive, theme }) =>
    isActive &&
    `border-left: 3px solid ${theme.palette.colors.robinsEggBlue};
    color: ${theme.palette.colors.robinsEggBlue};`}
  justify-content: flex-start;
  margin: 15px;
  padding: 10px;
`
interface SidenavProps {
  section: SectionsType
  setSection: React.Dispatch<React.SetStateAction<SectionsType>>
}
export const Sidenav = ({ setSection, section }: SidenavProps): ReactElement => {
  return (
    <$SidenavContainer>
      <$ButtonWrapper>
        <$TransparentButton onClick={() => setSection(SectionsType.ORDERS)} isActive={section === SectionsType.ORDERS}>
          Orders
        </$TransparentButton>
        <$TransparentButton
          onClick={() => setSection(SectionsType.TRACKING)}
          isActive={section === SectionsType.TRACKING}
        >
          Tracking
        </$TransparentButton>
      </$ButtonWrapper>
    </$SidenavContainer>
  )
}
