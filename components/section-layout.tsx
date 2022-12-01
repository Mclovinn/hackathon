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

const $Section = styled.div`
  width: 100%;
`
interface SectionLayoutProps {
  title: string
  children: ReactElement
}
export const SectionLayout = ({ title, children }: SectionLayoutProps): ReactElement => {
  return (
    <$Container>
      <$Title>{title}</$Title>
      <$Section>{children}</$Section>
    </$Container>
  )
}
