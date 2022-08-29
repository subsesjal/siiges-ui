import { Card, CardContent, Container } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import MenuDrawer from '../Drawer/MenuDrawer';
import MainNavbar from '../Navbar/mainnavbar';
import Background from './Background';

export default function Overlay({ children }) {
  return (
    <>
      <Background />
      <MainNavbar />
      <MenuDrawer />
      <Container>
        <Card sx={{ minWidth: 275, mt: 5 }}>
          <CardContent>{children}</CardContent>
        </Card>
      </Container>
    </>
  );
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};
