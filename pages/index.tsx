import { ThemeProvider } from '@mui/material/styles'
import { ReactElement } from 'react'
import { PrivatePage } from '../components/routing/private-page'
import { darkTheme } from '../styles/darkTheme'

const Landing = (): ReactElement => {
  return (
    <ThemeProvider theme={darkTheme}>
      <PrivatePage>
        <>index Page</>
      </PrivatePage>
    </ThemeProvider>
  )
}

export default Landing
