/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Paper,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Carousel({ children, isLoading }) {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const maxSteps = children?.length || 0;
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
        <IconButton onClick={handleBack} disabled={activeStep === 0 || isLoading}>
          <ArrowBackIosIcon />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid container spacing={2}>
          {isLoading ? (
            // Renderiza Skeletons si isLoading es true
            Array.from(new Array(itemsToShow)).map((_, index) => (
              <Grid item xs={12 / itemsToShow} key={index}>
                <Skeleton variant="rectangular" width="100%" height={288} />
              </Grid>
            ))
          ) : (
            // Renderiza children si isLoading es false
            children
              ?.slice(
                activeStep * itemsToShow,
                activeStep * itemsToShow + itemsToShow,
              )
              .map((child) => (
                <Grid item xs={12 / itemsToShow} key={child.key}>
                  <Paper elevation={3}>{child}</Paper>
                </Grid>
              ))
          )}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton
          onClick={handleNext}
          disabled={activeStep === totalSteps - 1 || isLoading}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

Carousel.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool, // Añade isLoading como prop para indicar si los datos están cargándose
};

Carousel.defaultProps = {
  children: null,
  isLoading: false, // Por defecto, isLoading es false
};

export default Carousel;
