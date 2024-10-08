import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import LoadCircle from '../Resources/LoadCircle';

export default function PositionDisplay({ currentPosition, totalPositions }) {
  const completionPercentage = (currentPosition / totalPositions) * 100;

  return (
    <Grid container justifyContent="flex-end">
      <Box
        display="flex"
        alignItems="center"
        sx={{
          backgroundColor: 'darkGray',
          width: 'fit-content',
          py: 1,
          px: 1,
          borderRadius: 20,
        }}
      >
        <LoadCircle state={completionPercentage} />
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            mx: 3,
          }}
        >
          {currentPosition}
          {' '}
          de
          {' '}
          {totalPositions}
          {' '}
          completado
        </Typography>
      </Box>
    </Grid>
  );
}

PositionDisplay.propTypes = {
  currentPosition: PropTypes.number.isRequired,
  totalPositions: PropTypes.number.isRequired,
};
