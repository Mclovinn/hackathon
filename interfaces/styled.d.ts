// styled.d.ts
import 'styled-components'
interface IPalette {
  main: string
  contrastText: string
}
declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      // Common colors
      colors: {
        heliotrope: string
        blueViolet: string
        purpleHeart: string
        blackcurrant: string
        zambezi: string
        nobel: string
        brightTurquoise: string
        turquoise: string
        psychedelicPurple: string
        white: string
        black: string
        smalt: string
        navyBlue: string
        kournikova: string
        emerald: string
        coralRed: string
        nero: string
        robinsEggBlue: string
        wisteria: string
      }

      // Theme colors (always prioritize using these over the common colors)
      // General theme
      primary: string
      secondary: string

      // Backgrounds

      background: string
      secondaryBackground: string

      // Buttons
      onHover: string
      secondaryOnHover: string

      // Texts
      text: string
      secondaryText: string

      // Status
    }
    status: {
      delivered: string
      inTransit: string
    }
    // Breakpoints for min-width
    breakpoints: {
      mobileS: '320px'
      mobileM: '375px'
      tablet: '426px'
      desktopS: '769px'
      desktop: '1440px'
      desktopL: '1920px'
    }

    borders: {
      primary: string
      secondary: string
    }

    shadows: {
      primary: string
      secondary: string
    }

    fonts: {
      primary: string
      secondary: string
    }
  }
}
