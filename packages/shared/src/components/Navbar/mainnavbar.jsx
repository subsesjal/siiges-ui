import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import LogoWhite from '../Images/Logowhite';
import MenuNavbar from './MenuNavbar';
import MenuButton from '../Buttons/MenuButton';

export default function MainNavbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
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
          <MenuButton title="RVOE" />
          <MenuNavbar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
