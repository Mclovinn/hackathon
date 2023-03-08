import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
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
