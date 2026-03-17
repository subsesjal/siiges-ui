import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import AdminLayout from '../../components/admin/AdminLayout';

const modules = [
  {
    label: 'Cuentas',
    description: 'Administrar cuentas de acceso al sistema',
    path: '/admin/cuentas',
    icon: <PeopleIcon sx={{ fontSize: 48 }} />,
    color: '#1565c0',
  },
  {
    label: 'Centros',
    description: 'Gestionar instituciones educativas (IES)',
    path: '/admin/centros',
    icon: <BusinessIcon sx={{ fontSize: 48 }} />,
    color: '#2e7d32',
  },
  {
    label: 'Programas',
    description: 'Administrar programas académicos y carreras',
    path: '/admin/programas',
    icon: <SchoolIcon sx={{ fontSize: 48 }} />,
    color: '#e65100',
  },
  {
    label: 'Usuarios',
    description: 'Gestionar usuarios responsables de las IES',
    path: '/admin/usuarios',
    icon: <PersonIcon sx={{ fontSize: 48 }} />,
    color: '#6a1b9a',
  },
  {
    label: 'Documentos',
    description: 'Gestionar títulos electrónicos y expedientes',
    path: '/admin/documentos',
    icon: <DescriptionIcon sx={{ fontSize: 48 }} />,
    color: '#c62828',
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <AdminLayout title="Dashboard - Administración">
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Panel de Administración
      </Typography>

      <Grid container spacing={3}>
        {modules.map((mod) => (
          <Grid item xs={12} sm={6} md={4} key={mod.path}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                borderTop: `4px solid ${mod.color}`,
              }}
              onClick={() => router.push(mod.path)}
            >
              <Box sx={{ color: mod.color, mb: 2 }}>
                {mod.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {mod.label}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {mod.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </AdminLayout>
  );
}
