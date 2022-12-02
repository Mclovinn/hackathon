import React, { ReactElement } from 'react'
import type { AppProps } from 'next/app'
// Styles and Theming
import GlobalStyle from '../styles/globalStyles'
import useTheme from '../hooks/useTheme'

import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const { theme, ThemeProvider } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
