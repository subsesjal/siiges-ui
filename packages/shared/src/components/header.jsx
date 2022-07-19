import { React } from 'react';
import { Typography } from '@mui/material';

export default function Header() {
  return (
    <Typography component="h1" variant="h5" sx={{ color: 'gray', fontSize: '14px' }}>
      Sistema integral de información para la gestión de Educación Superior
    </Typography>
  );
}
