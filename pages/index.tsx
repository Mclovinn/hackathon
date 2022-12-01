import Head from 'next/head'
import { ReactElement } from 'react'
import { MainLayout } from '../components/main-layout'

const Landing = (): ReactElement => {
  return (
    <div>
      <Head>
        <title>My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MainLayout />
      </main>
    </div>
  )
}

export default Landing
