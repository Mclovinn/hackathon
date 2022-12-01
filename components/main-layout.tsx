import React, { useState, ReactElement } from 'react'
import { SectionsType } from '../types/section.types'
import { Sidenav } from './Common/sidenav'
import { SectionLayout } from './section-layout'
import { Orders } from './sections/orders'
import { Tracking } from './sections/tracking'

export const MainLayout = () => {
  const [section, setSection] = useState<SectionsType>(SectionsType.ORDERS)

  const renderSection = (): ReactElement => {
    if (section === SectionsType.ORDERS) return <Orders />
    else if (section === SectionsType.TRACKING) return <Tracking />
    else return <></>
  }

  return (
    <>
      <Sidenav setSection={setSection} section={section} />
      <SectionLayout title={section}>{renderSection()}</SectionLayout>
    </>
  )
}
