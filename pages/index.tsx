import Head from 'next/head'
import { ReactElement } from 'react'
import DummyMain from '../components/DummyMain'

const Landing = (): ReactElement => {
  return (
    <div>
      <Head>
        <title>My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DummyMain />
      </main>
    </div>
  )
}

export default Landing
