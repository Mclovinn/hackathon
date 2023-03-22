import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactElement } from 'react'
import { MainLayout } from '../components/main-layout'
import MenuAppBar from '../components/navbar'
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
          <MenuAppBar />
          <main>
            <MainLayout />
          </main>
        </ThemeProvider>
      </PrivatePage>
    </div>
  )
}

export default Dashboard
