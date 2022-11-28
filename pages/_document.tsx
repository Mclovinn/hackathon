import { AppPropsType, AppType } from 'next/dist/shared/lib/utils'
import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import { NextRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: AppType) => (props: PropsWithChildren<AppPropsType<NextRouter>>) =>
            styledComponentsSheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: styledComponentsSheet.getStyleElement(),
      }
    } finally {
      styledComponentsSheet.seal()
    }
  }
}
