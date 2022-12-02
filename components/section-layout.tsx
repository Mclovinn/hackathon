import React, { ReactElement } from 'react'
import styled from 'styled-components'

const $Container = styled.div`
  margin-top: 100px;
  margin-left: 200px;
  width: 100%;
  max-width: 1000px;
  position: relative;
`
const $Title = styled.h1`
  color: ${({ theme }) => theme.palette.colors.wisteria};
  z-index: 1;
  position: absolute;
  padding: 0 30px;
`

const $SectionContent = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 100%;
`
interface SectionLayoutProps {
  title: string
  children: ReactElement
}
export const SectionLayout = ({ title, children }: SectionLayoutProps): ReactElement => {
  return (
    <$Container>
      <$Title>{title}</$Title>
      <$SectionContent>{children}</$SectionContent>
    </$Container>
  )
}
