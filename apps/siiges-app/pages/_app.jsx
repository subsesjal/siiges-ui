/* eslint-disable */
import React from 'react';
import '../styles/globals.css';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@mui/material/styles';
import Context from '@siiges-ui/shared/src/utils/handlers/context';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </Context.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
