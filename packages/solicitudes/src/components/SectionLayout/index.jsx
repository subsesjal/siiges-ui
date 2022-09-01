import React from 'react';
import { ButtonStyled, LoadCircle } from '@siiges-ui/shared';
import { Box, Grid, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function SectionLayout() {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid
        item
        xs={9}
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
            ml: 50,
            py: 1,
            px: 1,
            borderRadius: 20,
          }}
        >
          <LoadCircle state="11" />
          <Typography
            alignItems="center"
            variant="p"
            sx={{
              color: 'white',
              ml: 3,
            }}
          >
            1 de 9 completado
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3} sx={{ textAlign: 'right', alignItems: 'end', mt: 1 }}>
        <ButtonStyled text="Terminar" alt="Terminar solicitud" type="success" />
        <span>&nbsp;&nbsp;</span>
        <ButtonStyled
          text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
          alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
          type="success"
        />
      </Grid>
    </Grid>
  );
}
