import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, Select } from '@mui/material';
import LogoWhite from '../Images/LogoWhite';
import MenuNavbar from './MenuNavbar';
import useCheckMobileScreen from '../../utils/handlers/useCheckMobileScreen';

export default function MainNavbar({ menuSwitch, section, setSection }) {
  const options = [
    { id: 1, nombre: 'Incorporación' },
    { id: 2, nombre: 'Servicios escolares' },
  ];

  const customSelectStyles = {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    outline: 'none',
    appearance: 'none',
    fontSize: '1rem',
    marginRight: '10px',
    '&:focus': {
      border: 'none',
      outline: 'none',
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {useCheckMobileScreen() && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={menuSwitch}
            >
              <MenuIcon />
            </IconButton>
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
          <div style={{ position: 'relative' }}>
            <Select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              sx={customSelectStyles}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nombre}
                </MenuItem>
              ))}
            </Select>
          </div>
          <MenuNavbar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

MainNavbar.propTypes = {
  menuSwitch: PropTypes.func.isRequired,
  section: PropTypes.number.isRequired,
  setSection: PropTypes.func.isRequired,
};
