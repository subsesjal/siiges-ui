import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

export default function LoadCircle({ state }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={state} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${state}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LoadCircle.propTypes = {
  state: PropTypes.number.isRequired,
};
