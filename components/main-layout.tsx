import React, { useState, ReactElement } from 'react'
import styled from 'styled-components'
import { SectionsType } from '../types/section.types'
import { Sidenav } from './Common/sidenav'
import { SectionLayout } from './section-layout'
import { Orders } from './sections/orders'
import { TrackingPage } from './sections/tracking/tracking-page'

const $SectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`
export const MainLayout = () => {
  const [section, setSection] = useState<SectionsType>(SectionsType.ORDERS)

  const renderSection = (): ReactElement => {
    if (section === SectionsType.ORDERS) return <Orders />
    else if (section === SectionsType.TRACKING) return <TrackingPage />
    else return <></>
  }

  return (
    <$SectionsContainer>
      <Sidenav setSection={setSection} section={section} />
      <SectionLayout title={section}>{renderSection()}</SectionLayout>
    </$SectionsContainer>
  )
}
