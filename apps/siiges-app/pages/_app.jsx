/* eslint-disable */
import React, { useEffect } from 'react';
import '../styles/globals.css';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@mui/material/styles';
import Context from '@siiges-ui/shared/src/utils/handlers/context';
import theme from './theme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
