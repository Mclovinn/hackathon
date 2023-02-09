import React, { useState, ReactElement } from 'react'
import styled from 'styled-components'
import { SectionsType } from '../types/section.types'
import { Sidenav } from './common/sidenav'
import { SectionLayout } from './section-layout'
import { Orders } from './sections/orders'
import { TrackingPage } from './sections/tracking/tracking-page'
import { QRCodeSVG } from 'qrcode.react'

const $SectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`
const $SectionCode = styled.div`
  margin-top: 50px;
`

export const MainLayout = () => {
  const [section, setSection] = useState<SectionsType>(SectionsType.ORDERS)

  const renderSection = (): ReactElement => {
    if (section === SectionsType.ORDERS) return <Orders />
    else if (section === SectionsType.TRACKING)
      return (
        <>
          <TrackingPage />
          <$SectionCode>
            <QRCodeSVG value="https://www.google.com/" size={200} includeMargin={true} level={'Q'} />
          </$SectionCode>
        </>
      )
    else return <></>
  }

  return (
    <$SectionsContainer>
      <Sidenav setSection={setSection} section={section} />
      <SectionLayout title={section} section={section}>
        {renderSection()}
      </SectionLayout>
    </$SectionsContainer>
  )
}
