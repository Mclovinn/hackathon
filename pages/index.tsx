import { createTheme, ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { ReactElement } from 'react'
import { MainLayout } from '../components/main-layout'
import OrdersTable from '../components/OrdersTable'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const Landing = (): ReactElement => {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Head>
          <title>My App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <MainLayout />
          <OrdersTable />
        </main>
      </ThemeProvider>
    </div>
  )
}

export default Landing
