import React, { useState, ReactElement } from 'react'
import { SectionsType } from '../types/section.types'
import { Sidenav } from './common/sidenav'
import { SectionLayout } from './section-layout'
import { Orders } from './sections/orders'
import { TrackingPage } from './sections/tracking/tracking-page'

export const MainLayout = () => {
  const [section, setSection] = useState<SectionsType>(SectionsType.ORDERS)

  const renderSection = (): ReactElement => {
    if (section === SectionsType.ORDERS) return <Orders />
    else if (section === SectionsType.TRACKING) return <TrackingPage />
    else return <></>
  }

  return (
    <>
      <Sidenav setSection={setSection} section={section} />
      <SectionLayout title={section}>{renderSection()}</SectionLayout>
    </>
  )
}
