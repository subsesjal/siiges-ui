/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/globals.css';
// TODO check if this file is useful if not delete it
function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
