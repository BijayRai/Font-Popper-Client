import Document, { Head, Main, NextScript } from 'next/document'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import { ServerStyleSheet } from 'styled-components'
import { envConfig } from '../config/envConfigServer'

class MyDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()

    // Consider copying and pasting global stylesheets into jsx? Check the wiki when ready
    // https://github.com/zeit/next.js/wiki/Global-styles-and-layouts
    // <style jsx global>{``}</style>
    return (
      <html>
        <Head>
          <link
            rel='shortcut icon'
            type='image/png'
            href='/static/images/icons/doughnut.png'
        />
          <link href='/static/toastr.css' rel='stylesheet' type='text/css' />
          <link
            async
            href='//fonts.googleapis.com/css?family=Open+Sans'
            rel='stylesheet'
            type='text/css'
        />
          <title>{envConfig.WEBSITE_TITLE}</title>
          {styleTags}
          <link rel='stylesheet' type='text/css' href='/static/styles.css' />
        </Head>
        <body>
          {main}
          <NextScript />
        </body>
      </html>
    )
  }
}

export default withRedux(initStore)(MyDocument)
