import { DefaultTheme } from 'styled-components'
import {
  BLACK,
  WHITE,
  HELIOTROPE,
  BRIGHT_TURQUOISE,
  BLACKCURRANT,
  BLUE_VIOLET,
  NOBEL,
  PSYCHEDELIC_PURPLE,
  PURPLE_HEART,
  TURQUOISE,
  ZAMBEZI,
  EMERALD,
  CORAL_RED,
} from './variables'

// Recieves alpha as %, and transforms it to hex
export const getOpacityInHex = (opacity: number): string => {
  opacity /= 100
  let hexOpacity = Math.round(opacity * 255).toString(16)

  if (hexOpacity.length === 1) {
    hexOpacity = '0' + hexOpacity
  }

  return hexOpacity
}

export const defaultTheme: DefaultTheme = {
  palette: {
    // Common colors
    colors: {
      heliotrope: HELIOTROPE,
      blueViolet: BLUE_VIOLET,
      purpleHeart: PURPLE_HEART,
      blackcurrant: BLACKCURRANT,
      zambezi: ZAMBEZI,
      nobel: NOBEL,
      brightTurquoise: BRIGHT_TURQUOISE,
      turquoise: TURQUOISE,
      psychedelicPurple: PSYCHEDELIC_PURPLE,
      white: WHITE,
      black: BLACK,
    },

    // Theme colors (always prioritize using these over the common colors)
    // General theme
    primary: BLUE_VIOLET,
    secondary: BRIGHT_TURQUOISE,

    // Backgrounds
    background: BLACKCURRANT,
    secondaryBackground: BLUE_VIOLET + getOpacityInHex(40),

    // Buttons
    onHover: HELIOTROPE,
    secondaryOnHover: BRIGHT_TURQUOISE,

    // Texts
    text: WHITE,
    secondaryText: PURPLE_HEART,

    // Status
    success: EMERALD,
    error: CORAL_RED,
  },

  // Breakpoints for min-width
  breakpoints: {
    mobileS: '320px',
    mobileM: '375px',
    tablet: '426px',
    desktopS: '769px',
    desktop: '1440px',
    desktopL: '1920px',
  },

  borders: {
    primary: `1px solid ${WHITE + getOpacityInHex(25)}`,
    secondary: `2px solid ${BLUE_VIOLET + getOpacityInHex(40)}`,
  },

  shadows: {
    primary: `inset 0px 4px 4px ${BLACK}`,
    secondary: `inset 0px 4px 4px ${BLACK + getOpacityInHex(80)}`,
  },

  fonts: {
    primary: 'sans-serif',
    secondary: 'Arial',
  },
}

export default defaultTheme
