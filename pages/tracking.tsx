import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactElement } from 'react'
import MenuAppBar from '../components/navbar'
import { PrivatePage } from '../components/routing/private-page'
import { TrackingSearcher } from '../components/sections/tracking/tracking-searcher'
import { SectionsType } from '../types/section.types'
import styled from 'styled-components'
import { Typography } from '@mui/material'

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
  position: relative;

  & > h1 {
    font-weight: 700;
    font-size: 2.5rem;
    line-height: 2.9375rem;
    padding-left: 68px;
    padding-top: 74px;
  }
`

const $SectionContent = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin-left: 37px;
`

const Dashboard = (): ReactElement => {
  return (
    <div>
      <PrivatePage>
        <ThemeProvider theme={darkTheme}>
          <MenuAppBar />
          <main>
            <$Container>
              <Typography variant="h1">{SectionsType.TRACKING}</Typography>
              <$SectionContent>
                <TrackingSearcher />
              </$SectionContent>
            </$Container>
          </main>
        </ThemeProvider>
      </PrivatePage>
    </div>
  )
}

export default Dashboard
