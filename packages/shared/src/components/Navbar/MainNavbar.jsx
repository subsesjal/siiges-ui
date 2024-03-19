import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoWhite from '../Images/LogoWhite';
import MenuNavbar from './MenuNavbar';
import useCheckMobileScreen from '../../utils/handlers/useCheckMobileScreen';
import { Context } from '../../utils/handlers/context';

export default function MainNavbar({ menuSwitch, section, setSection }) {
  const { session } = useContext(Context);
  const options = [
    { id: 1, nombre: 'Incorporación' },
    { id: 2, nombre: 'Servicios escolares' },
    { id: 3, nombre: "OPD'S" },
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (typeof value === 'number') {
      setSection(value);
    }
    setAnchorEl(null);
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
          {session.rol === 'admin' && (
            <div style={{ position: 'relative' }}>
              <IconButton color="inherit" onClick={handleClick}>
                <Typography variant="subtitle1">
                  {options.find((opt) => opt.id === section)?.nombre || 'Areas'}
                </Typography>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.id}
                    onClick={() => handleClose(option.id)}
                  >
                    {option.nombre}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
          <MenuNavbar />
        </Toolbar>
      </AppBar>
      <style jsx>
        {`
          .select-container {
            position: relative;
          }
        `}
      </style>
    </Box>
  );
}

MainNavbar.propTypes = {
  menuSwitch: PropTypes.func.isRequired,
  section: PropTypes.number.isRequired,
  setSection: PropTypes.func.isRequired,
};
