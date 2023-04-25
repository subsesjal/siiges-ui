import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import LogoWhite from '../Images/LogoWhite';
import MenuNavbar from './menuNavbar';
import useCheckMobileScreen from '../../utils/handlers/useCheckMobileScreen';

export default function MainNavbar({ menuSwitch }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {useCheckMobileScreen() ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={menuSwitch}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div />
          )}
          <Link href="/home">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <LogoWhite />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              fontSize: '1rem',
            }}
          >
            <b>SIIGES</b>
          </Typography>
          <MenuNavbar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

MainNavbar.propTypes = {
  menuSwitch: PropTypes.func.isRequired,
};
