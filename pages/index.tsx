import { ThemeProvider } from '@mui/material/styles'
import { ReactElement } from 'react'
import MiddleLogoSpinner from '../components/common/middle-logo-spinner'
import { PrivatePage } from '../components/routing/private-page'
import { darkTheme } from '../styles/darkTheme'

const Landing = (): ReactElement => {
  return (
    <ThemeProvider theme={darkTheme}>
      <PrivatePage>
        <MiddleLogoSpinner loading />
      </PrivatePage>
    </ThemeProvider>
  )
}

export default Landing
