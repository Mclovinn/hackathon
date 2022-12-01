import React, { useState, ReactElement } from 'react'
import styled from 'styled-components'
import { SectionsType } from '../types/section.types'
import { Sidenav } from './common/sidenav'
import { SectionLayout } from './section-layout'
import { Orders } from './sections/orders'
import { Tracking } from './sections/tracking/tracking'

const $SectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const MainLayout = () => {
  const [section, setSection] = useState<SectionsType>(SectionsType.ORDERS)

  const renderSection = (): ReactElement => {
    if (section === SectionsType.ORDERS) return <Orders />
    else if (section === SectionsType.TRACKING) return <Tracking />
    else return <></>
  }

  return (
    <$SectionsContainer>
      <Sidenav setSection={setSection} section={section} />
      <SectionLayout title={section}>{renderSection()}</SectionLayout>
    </$SectionsContainer>
  )
}
