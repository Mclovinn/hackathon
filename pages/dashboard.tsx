import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactElement } from 'react'
import { MainLayout } from '../components/main-layout'
import { PrivatePage } from '../components/routing/private-page'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const Dashboard = (): ReactElement => {
  return (
    <div>
      <PrivatePage>
        <ThemeProvider theme={darkTheme}>
          <main>
            <MainLayout />
          </main>
        </ThemeProvider>
      </PrivatePage>
    </div>
  )
}

export default Dashboard
