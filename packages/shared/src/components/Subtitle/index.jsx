import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function Subtitle({ children }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">{children}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
}

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
};
