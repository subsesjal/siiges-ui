import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  Tooltip,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from '@siiges-ui/shared';

const DRAWER_WIDTH = 240;
const DRAWER_COLLAPSED = 64;
const BRAND_COLOR = '#74c8d2';
const menuItems = [
  {
    label: 'Dashboard', path: '/admin-app/dashboard', icon: <DashboardIcon />,
  },
  {
    label: 'Cuentas', path: '/admin-app/cuentas', icon: <PeopleIcon />,
  },
  {
    label: 'Centros', path: '/admin-app/centros', icon: <BusinessIcon />,
  },
  {
    label: 'Programas', path: '/admin-app/programas', icon: <SchoolIcon />,
  },
  {
    label: 'Usuarios', path: '/admin-app/usuarios', icon: <PersonIcon />,
  },
  {
    label: 'Documentos', path: '/admin-app/documentos', icon: <DescriptionIcon />,
  },
];

export default function AdminLayout({ children, title }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const drawerWidth = open ? DRAWER_WIDTH : DRAWER_COLLAPSED;

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin-app');
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    router.push('/admin-app');
  };

  return (
    <Box sx={{
      display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5',
    }}
    >
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          transition: 'width 0.25s ease',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: BRAND_COLOR,
            color: 'white',
            overflowX: 'hidden',
            transition: 'width 0.25s ease',
          },
        }}
      >
        {/* Header del sidebar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            p: open ? 2 : 1,
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            minHeight: 64,
          }}
        >
          {open && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                Admin Panel
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Títulos Electrónicos
              </Typography>
            </Box>
          )}
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{ color: 'white' }}
            size="small"
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* Menu items */}
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => {
            const isSelected = router.pathname === item.path;
            const button = (
              <ListItemButton
                key={item.path}
                selected={isSelected}
                onClick={() => router.push(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: open ? 2.5 : 2,
                  borderLeft: isSelected ? '4px solid white' : '4px solid transparent',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
                  },
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'white',
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItemButton>
            );

            if (!open) {
              return (
                <Tooltip title={item.label} placement="right" key={item.path}>
                  {button}
                </Tooltip>
              );
            }
            return button;
          })}
        </List>
      </Drawer>

      {/* Main content */}
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column',
      }}
      >
        {/* Header */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Logo />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {title || 'Administración - Títulos Electrónicos'}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Paper>

        {/* Content */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          {children}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'rgb(206, 209, 212)',
            py: 2,
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography variant="body2" style={{ color: '#3b4245' }}>
            &copy; 2026 Secretaría General de Gobierno - Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" style={{ color: '#3b4245' }}>
            Edificio MIND Av. Faro #2350 , Colonia: Verde Valle , CP: 44540, Guadalajara, Jalisco
            Lunes a Viernes de 09:00:00 a 17:00:00 horas
          </Typography>
          <Typography variant="body2" style={{ color: '#3b4245' }}>
            <Link
              href="https://transparenciasitgej.jalisco.gob.mx/api/api/archivos/1908/download?inline=true"
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              Avisos de privacidad
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

AdminLayout.defaultProps = {
  title: '',
};
