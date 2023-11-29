import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Grid>
  );
}
