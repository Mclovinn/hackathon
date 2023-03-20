import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#42A5F5',
      contrastText: '#FFFFFF',
    },
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
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: '#FFFFFF',
        },
      },
    },
  },
})
