import {
  Box,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function StepperComponent({ steps, position, onStepClick }) {
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Stepper activeStep={position} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              onClick={() => onStepClick(index)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

StepperComponent.propTypes = {
  position: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  onStepClick: PropTypes.func.isRequired,
};
