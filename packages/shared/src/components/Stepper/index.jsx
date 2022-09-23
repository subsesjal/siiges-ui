import {
  Box,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function StepperComponent({ steps, position }) {
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Stepper activeStep={position} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

StepperComponent.propTypes = {
  position: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};
