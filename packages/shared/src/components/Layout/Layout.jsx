import { Card, CardContent, Container } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import MenuDrawer from '../Drawer/MenuDrawer';
import MainNavbar from '../Navbar/MainNavbar';
import Background from '../Resources/Background';
import Title from '../Title';
import useCheckMobileScreen from '../../utils/handlers/useCheckMobileScreen';

export default function Overlay({
  children, title, subtitle, type,
}) {
  return (
    <>
      <Background />
      <MainNavbar />
      {useCheckMobileScreen() ? <div /> : <MenuDrawer />}
      <Container>
        {type ? (
          <Card sx={{ mt: 13 }}>
            <CardContent>
              <Title title={title} subtitle={subtitle} />
              {children}
            </CardContent>
          </Card>
        ) : (
          <>
            <Title title={title} subtitle={subtitle} />
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
