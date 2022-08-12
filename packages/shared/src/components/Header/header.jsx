import React from 'react';
import { Typography } from '@mui/material';
import '../../styles/Header/HeaderLogin.css';

export default function Header() {
  return (
    <Typography component="h1" variant="h5" className="HeaderLogin">
      Sistema integral de información para la gestión de Educación Superior
    </Typography>
  );
}
