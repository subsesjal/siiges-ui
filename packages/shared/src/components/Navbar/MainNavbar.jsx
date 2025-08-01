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
import { getOptionsRoles } from '@siiges-ui/shared/src/components/Drawer/utils/menuUsers';
import LogoWhite from '../Images/LogoWhite';
import MenuNavbar from './MenuNavbar';
import useCheckMobileScreen from '../../utils/handlers/useCheckMobileScreen';
import { Context } from '../../utils/handlers/context';

export default function MainNavbar({ menuSwitch, section, setSection }) {
  const { session } = useContext(Context);
  const options = getOptionsRoles(session.rol);
  const menuDown = options.some(({ roles }) => roles.includes(session.rol));

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
          />
          {menuDown && (
            <div style={{ position: 'relative' }}>
              <IconButton
                color="inherit"
                onClick={handleClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  px: 2,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: '#fff', mr: 1 }}
                >
                  {options.find((opt) => opt.id === section)?.nombre || 'Áreas'}
                </Typography>
                <span style={{
                  borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '6px solid white', display: 'inline-block',
                }}
                />
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
                  option.externalLink ? (
                    <MenuItem
                      key={option.id}
                      component="a"
                      href={option.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setAnchorEl(null)}
                    >
                      {option.nombre}
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={option.id}
                      onClick={() => handleClose(option.id)}
                    >
                      {option.nombre}
                    </MenuItem>
                  )
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
