import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
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
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Logo } from '@siiges-ui/shared';

const DRAWER_WIDTH = 240;

const menuItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
  { label: 'Cuentas', path: '/admin/cuentas', icon: <PeopleIcon /> },
  { label: 'Centros', path: '/admin/centros', icon: <BusinessIcon /> },
  { label: 'Programas', path: '/admin/programas', icon: <SchoolIcon /> },
  { label: 'Usuarios', path: '/admin/usuarios', icon: <PersonIcon /> },
  { label: 'Documentos', path: '/admin/documentos', icon: <DescriptionIcon /> },
];

export default function AdminLayout({ children, title }) {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    router.push('/admin');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#1a237e',
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
            Admin Panel
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Títulos Electrónicos
          </Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={router.pathname === item.path}
              onClick={() => router.push(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                },
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
            backgroundColor: 'rgb(206, 209, 212)',
            py: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#3b4245' }}>
            &copy; 2026 Secretaría General de Gobierno - Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" sx={{ color: '#3b4245' }}>
            ADMIN - 2.0.0
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
