import { Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import Logo from '../Images/logo';
import Navbar from '../Navbar/navbar';
import Background from '../Resources/Background';

function LoginLayout({ children }) {
  return (
    <>
      <Background />
      <Grid alignItems="center" justifyContent="center">
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Navbar />
          <Logo />
          <Header />
          {children}
        </Grid>
      </Grid>
    </>
  );
}

export default LoginLayout;

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
