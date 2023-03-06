import React from 'react';
import { LoadCircle, Title } from '@siiges-ui/shared';
import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonSection from './ButtonSection';

export default function SectionLayout({
  children,
  sections,
  position,
  total,
  porcentage,
  sectionTitle,
  next,
  prev,
  nextModule,
}) {
  const values = {
    solicitudErrors: '',
    error: '',
    form: '',
    setNoti: '',
  };

  return (
    <>
      <Title title={sectionTitle} />
      <Grid container sx={{ mt: 3 }}>
        <Grid
          item
          xs={8}
          justifyContent="end"
          alignItems="center"
          sx={{ textAlign: 'left' }}
        >
          <Box
            alignItems="center"
            display="flex"
            sx={{
              backgroundColor: 'darkGray',
              width: 230,
              ml: 55,
              py: 1,
              px: 1,
              borderRadius: 20,
            }}
          >
            <LoadCircle state={porcentage} />
            <Typography
              alignItems="center"
              variant="p"
              sx={{
                color: 'white',
                ml: 3,
              }}
            >
              {sections}
              {' '}
              de
              {' '}
              {total}
              {' '}
              completado
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <ButtonSection
            position={position}
            next={next}
            prev={prev}
            nextModule={nextModule}
            values={values}
          />
        </Grid>
        {children}
        <Grid item xs={8} />
        <Grid item xs={4}>
          <ButtonSection
            position={position}
            next={next}
            prev={prev}
            nextModule={nextModule}
            values={values}
          />
        </Grid>
      </Grid>
    </>
  );
}

SectionLayout.propTypes = {
  sections: PropTypes.number.isRequired,
  sectionTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  porcentage: PropTypes.number.isRequired,
  nextModule: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};
