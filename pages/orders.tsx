import { Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactElement } from 'react'
import MenuAppBar from '../components/navbar'
import { PrivatePage } from '../components/routing/private-page'
import { Orders } from '../components/sections/orders'
import { SectionsType } from '../types/section.types'
import styled from 'styled-components'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const $Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 2.5rem;
  padding-left: 2.3rem;
  position: relative;

  & > h1 {
    font-weight: 700;
    font-size: 2.5rem;
    line-height: 2.9375rem;
    margin: 0 60px;
  }
`

const $SectionContent = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
`

const Dashboard = (): ReactElement => {
  return (
    <div>
      <PrivatePage>
        <ThemeProvider theme={darkTheme}>
          <MenuAppBar />
          <main>
            <$Container>
              <Typography variant="h1">{SectionsType.ORDERS}</Typography>
              <$SectionContent>
                <Orders />
              </$SectionContent>
            </$Container>
          </main>
        </ThemeProvider>
      </PrivatePage>
    </div>
  )
}

export default Dashboard
