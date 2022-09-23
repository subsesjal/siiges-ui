import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

export default function LoadCircle({ state }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={state} />
    </Box>
  );
}

LoadCircle.propTypes = {
  state: PropTypes.number.isRequired,
};
