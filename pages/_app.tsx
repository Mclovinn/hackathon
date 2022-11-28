import React, { ReactElement } from 'react'
import type { AppProps } from 'next/app'
// Styles and Theming
import GlobalStyle from '../styles/globalStyles'
import useTheme from '../hooks/useTheme'

// Internationalization
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import usei18n from '../hooks/usei18n'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const { theme, ThemeProvider } = useTheme()

  const [locale, translates] = usei18n()
  i18n.load(locale, translates)
  i18n.activate(locale)

  return (
    <I18nProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default MyApp
