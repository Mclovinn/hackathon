import React, { ReactElement } from 'react'
import type { AppProps } from 'next/app'
// Styles and Theming
import GlobalStyle from '../styles/globalStyles'
import useTheme from '../hooks/useTheme'
import { StoreProvider } from 'easy-peasy'
import store from '../store'

import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const { theme, ThemeProvider } = useTheme()

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Blockwise</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MyApp
