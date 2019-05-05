import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang='en' dir='ltr' className='interlink'>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          <meta property='og:image' content='/static/img/logo.png'/>
          <meta property='og:site_name' content='Internlink'/>
          <meta property='og:description' content='Internlink by Jasper Bernales' />
          <meta property='og:locale' content='en_US' />
          <meta name='robots' content='index, follow' />

          <meta name='theme-color' content='#000000' />

          <link rel='manifest' href='/static/manifest.json'/>
          <link rel='shortcut icon' href='/static/icons/favicon.ico'/>

          <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />
          <link rel='stylesheet' type='text/css' href='/static/css/react-md.indigo-pink.min.css' />
          <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' />
          <link rel='stylesheet' type='text/css' href='/static/css/materialIcons.css' />
          <link rel='stylesheet' type='text/css' href='/static/css/proxima.css' />
          <link rel='stylesheet' type='text/css' href='/static/css/react-draft-wysiwyg.css' />
          <link rel='stylesheet' type='text/css' href='/static/css/rangeslider.css' />
        </Head>
        <body>
          <a id='invisible-link'></a>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}