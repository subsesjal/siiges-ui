import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link';
import LogoWhite from './logowhite';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <LogoWhite />
          </IconButton>
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
          <Link href="/signup">
            <Button
              variant="outlined"
              startIcon={<PersonAddIcon />}
              sx={{
                backgroundColor: 'rgba(233, 236, 239, 0.5)',
                textTransform: 'none',
                color: 'white',
                borderRadius: '2rem',
                '&:hover': {
                  background: '#fff',
                  color: '#0072ce',
                  m: 'auto',
                },
              }}
            >
              Pre-registro
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
