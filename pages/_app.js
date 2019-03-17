import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import getContext from 'lib/context';
import Header from 'components/Header';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function App(props) {
  const { Component } = props
  const pageContext = props.pageContext || getContext()
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  })

  return (
    <MuiThemeProvider
      theme={pageContext.theme}
      sheetsManager={pageContext.sheetsManager}
    >
      <CssBaseline />
      <div>
        <Header {...props} />
        <Component {...props} />
      </div>
    </MuiThemeProvider>
  )
}
App.getInitialProps = async({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // this exposes the query to the user
  pageProps.query = ctx.query;
  return pageProps
}

App.propTypes = {
  pageContext: PropTypes.object, // eslint-disable-line
};

App.defaultProps = {
  pageContext: null,
};

export default App
