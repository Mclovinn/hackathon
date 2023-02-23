import { createTheme, ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Button, Typography, TextField } from '@mui/material'
import styled from 'styled-components'

import '@fontsource/roboto/700.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/300.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    h1: {
      fontSize: 48,
      fontWeight: 700,
      lineHeight: '56.25px',
    },
    subtitle1: {
      fontSize: 32,
      fontWeight: 400,
      lineHeight: '37.5px',
    },
    button: {
      fontSize: 16,
      lineHeight: '26px',
      letterSpacing: '0.46px',
      minHeight: '57px',
    },
  },
})

const $Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    margin-top: -100px;
    width: 424px;
    height: 400px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    & > h1 {
      margin: 0 auto;
    }
    & > h6 {
      margin: 0 auto;
      margin-bottom: 62px;
    }

    & > div {
      margin-bottom: 32.5px;
    }
  }
`

const $Button = styled(Button)`
  background-color: ${({ theme }) => theme.palette.colors.smalt};
  color: ${({ theme }) => theme.palette.colors.white};
`

const Landing = (): ReactElement => {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Head>
          <title>My App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <$Container>
            <div>
              <Typography variant="h1">LOGIN</Typography>
              <Typography variant="subtitle1">TO CONTINUE</Typography>
              <TextField
                error
                id="standard-error-helper-text"
                label="Error"
                defaultValue="Email"
                helperText="Complete this field"
                variant="standard"
              />
              <TextField
                error
                id="standard-error-helper-text"
                label="Error"
                defaultValue="Password"
                helperText="Complete this field"
                variant="standard"
              />

              <$Button variant="contained">SIGN IN</$Button>
            </div>
          </$Container>
        </main>
      </ThemeProvider>
    </div>
  )
}

export default Landing
