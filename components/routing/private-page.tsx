import React, { ReactElement, useEffect } from 'react'
import router from 'next/router'
import { useStoreState } from '../../store/hooks'
import { DASHBOARD_URL, HOME_URL, LOGIN_URL, COURIER_DASHBOARD_URL } from '../constant/url-routes'
import { UserRole } from '../../types/user.type'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from '../../styles/darkTheme'

type PublicPageProps = {
  children: ReactElement
}

export const PrivatePage = ({ children }: PublicPageProps): ReactElement => {
  const { sessionModel } = useStoreState(store => store)
  const { session } = sessionModel
  const { isAuthenticated } = session

  useEffect(() => {
    if (isAuthenticated) {
      if (session.role === UserRole.WAREHOUSE_OPERATOR) router.push(`${DASHBOARD_URL}`)
      else if (session.role === UserRole.COURIER) router.push(`${COURIER_DASHBOARD_URL}`)
      else router.push(`${HOME_URL}`)
    } else {
      router.push(`${LOGIN_URL}`)
    }
  }, [isAuthenticated, session.role])

  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
}
