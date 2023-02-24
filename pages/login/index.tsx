import { createTheme, ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Button, Typography, TextField } from '@mui/material'
import styled from 'styled-components'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: '37.5px',
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '18.75px',
    },
    button: {
      fontSize: 13,
      fontWeight: 500,
      lineHeight: '26px',
      letterSpacing: '0.46px',
      minHeight: '34px',
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
    width: 100%;
    display: flex;
    margin: 0 66px 0 79px;
    justify-content: center;
    flex-direction: column;
    & > h1 {
      margin: 0 auto 20px auto;
    }
    & > h6 {
      margin: 0 auto;
      margin-bottom: 60px;
    }

    & > div {
      margin-bottom: 18.5px;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktopS}) {
    & > div {
      width: 424px;
      height: 400px;
      & > h1 {
        margin: 0 auto 10px auto;
        font-size: 3rem;
        line-height: 56.25px;
      }
      & > h6 {
        margin: 0 auto;
        margin-bottom: 62px;
        font-size: 2rem;
        line-height: 37.5px;
      }

      & > div {
        margin-bottom: 32.5px;
      }

      & > button {
        font-size: 1rem;
        min-height: 57px;
      }
    }
  }
`

const $Button = styled(Button)`
  background-color: ${({ theme }) => theme.palette.colors.smalt};
  color: ${({ theme }) => theme.palette.colors.white};
`

const Login = (): ReactElement => {
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

export default Login
