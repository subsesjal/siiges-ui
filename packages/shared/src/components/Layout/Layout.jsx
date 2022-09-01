import { Card, CardContent, Container } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import MenuDrawer from '../Drawer/MenuDrawer';
import MainNavbar from '../Navbar/mainnavbar';
import Background from '../Resources/Background';
import LayoutHeader from './LayoutHeader';

export default function Overlay({
  children,
  title,
  subtitle,
  type,
}) {
  return (
    <>
      <Background />
      <MainNavbar />
      <MenuDrawer />
      <Container>
        {type ? (
          <Card sx={{ mt: 5 }}>
            <CardContent>
              <LayoutHeader title={title} subtitle={subtitle} />
              {children}
            </CardContent>
          </Card>
        ) : (
          <>
            <LayoutHeader title={title} subtitle={subtitle} />
            {children}
          </>
        )}
      </Container>
    </>
  );
}
Overlay.defaultProps = {
  type: true,
  title: '',
  subtitle: '',
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  type: PropTypes.bool,
  subtitle: PropTypes.string,
};
