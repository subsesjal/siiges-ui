import { Card, CardContent, Container } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuDrawer from '../Drawer/MenuDrawer';
import MainNavbar from '../Navbar/MainNavbar';
import useCheckMobileScreen from '../../utils/handlers/useCheckMobileScreen';
import Title from '../Title';

export default function Overlay({
  children, title, subtitle, type,
}) {
  const [open, setOpen] = useState(false);
  const onClickChange = () => {
    setOpen(!open);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let localtype = type;
  if (useCheckMobileScreen()) {
    localtype = false;
  }
  return (
    <div
      style={{
        backgroundImage: 'url(/Fondo.png)',
        backgroundSize: 'cover',
        position: 'fixed',
        overflow: 'auto',
        zIndex: -1,
        height: '100%',
        width: '100%',
      }}
    >
      <MainNavbar menuSwitch={() => onClickChange()} />
      <MenuDrawer
        open={open}
        openFunction={() => handleDrawerOpen()}
        closeFunction={() => handleDrawerClose()}
      />
      <Container
        sx={{
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        {localtype ? (
          <Card>
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
    </div>
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
