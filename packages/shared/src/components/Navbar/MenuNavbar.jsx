import React, { useContext, useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { Context } from '@siiges-ui/shared';
import setHandler from '../../utils/handlers/set-anchor';
import StyledBadge from '../../styles/Navbar/MenuNavbarStyle';
import { getData } from '../../utils/handlers/apiUtils';

export default function MenuNavbar() {
  const { removeAuth, session } = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [imageUrl, setImageUrl] = useState(null);

  const getProfilePhoto = async () => {
    try {
      const endpoint = '/files/';
      const query = `?tipoEntidad=PERSONA&entidadId=${session.id}&tipoDocumento=FOTOGRAFIA_PERSONA`;
      const response = await getData({ endpoint, query });
      if (response.statusCode === 200 && response.data) {
        let { url } = response.data;
        if (url) {
          if (!url.startsWith('http')) {
            url = `http://${url}`;
          }
          const response2 = await fetch(url);
          if (!response2.ok) {
            throw new Error('Network response was not ok');
          }
          const blob = await response2.blob();
          const imageObjectUrl = URL.createObjectURL(blob);
          setImageUrl(imageObjectUrl);
        } else {
          setImageUrl(undefined);
        }
      } else {
        setImageUrl(undefined);
      }
    } catch (error) {
      setImageUrl(undefined);
    }
  };

  useEffect(() => {
    getProfilePhoto();
  }, [session]);

  return (
    <>
      <IconButton
        onClick={(event) => setHandler(setAnchorEl, event.currentTarget)}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        data-testid="menu-test"
      >
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar
              alt={session.nombre}
              src={imageUrl}
            >
              TS
            </Avatar>
          </StyledBadge>
        </Stack>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => setHandler(setAnchorEl, null)}
        onClick={() => setHandler(setAnchorEl, null)}
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
        <Link href="/usuarios/perfilUsuario">
          <MenuItem>
            <Avatar
              alt={session.nombre}
              src={imageUrl}
            >
              TS
            </Avatar>
            {session.nombre}
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Ajustes
        </MenuItem>
        <Link href="/notificaciones">
          <MenuItem>
            <ListItemIcon>
              <MarkEmailUnreadOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Notificaciones
          </MenuItem>
        </Link>
        <Link href="/">
          <MenuItem onClick={() => removeAuth()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Cerrar sesión
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}
