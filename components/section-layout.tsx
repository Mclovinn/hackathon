import React, { ReactElement } from 'react'
import styled from 'styled-components'

const $Container = styled.div`
  margin-left: 40px;
  width: 100%;
  height: 100%;
`
const $Title = styled.div`
  margin-top: 60px;
  font-size: 32px;
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
