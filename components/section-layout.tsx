import React, { ReactElement } from 'react'
import styled from 'styled-components'

const $Container = styled.div`
  margin-left: 200px;
  position: absolute;
`
const $Title = styled.div`
  margin-top: 60px;
  font-size: 32px;
`
interface SectionLayoutProps {
  title: string
  children: ReactElement
}
export const SectionLayout = ({ title, children }: SectionLayoutProps): ReactElement => {
  return (
    <$Container>
      <$Title>{title}</$Title>
      {children}
    </$Container>
  )
}
