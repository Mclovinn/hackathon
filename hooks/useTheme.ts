import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import defaultTheme from '../styles/themes'

const useTheme = () => {
  const [theme] = useState(defaultTheme)

  return { theme, ThemeProvider }
}

export default useTheme
