import React, { useState } from 'react';
import {
  Paper,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Carousel({ children }) {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const maxSteps = children.length;
  const itemsToShow = isMobile ? 1 : 4;
  const totalSteps = Math.ceil(maxSteps / itemsToShow);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % totalSteps);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + totalSteps) % totalSteps,
    );
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <IconButton onClick={handleBack} disabled={activeStep === 0}>
          <ArrowBackIosIcon />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid container spacing={2}>
          {children
            .slice(
              activeStep * itemsToShow,
              activeStep * itemsToShow + itemsToShow,
            )
            .map((child) => (
              <Grid item xs={12 / itemsToShow} key={child.key}>
                <Paper elevation={3}>{child}</Paper>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton
          onClick={handleNext}
          disabled={activeStep === totalSteps - 1}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired, // 'children' is expected to be any renderable React node(s)
};

export default Carousel;
