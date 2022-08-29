import {
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import MenuDrawer from '../Drawer/MenuDrawer';
import MainNavbar from '../Navbar/mainnavbar';
import Background from '../Resources/Background';

export default function Overlay({ children, title, subtitle }) {
  return (
    <>
      <Background />
      <MainNavbar />
      <MenuDrawer />
      <Container>
        <Card sx={{ minWidth: 275, mt: 5 }}>
          <CardContent>
            {title !== '' && (
              <>
                <Typography variant="h3">{title}</Typography>
                <Divider
                  sx={{
                    backgroundColor: 'orange',
                    width: '30%',
                    height: '3px',
                  }}
                />
                {subtitle !== '' && (
                  <Typography variant="p">{subtitle}</Typography>
                )}
              </>
            )}
            {children}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

Overlay.defaultProps = {
  title: '',
  subtitle: '',
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
