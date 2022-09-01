import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ButtonStyled } from '@siiges-ui/shared';
import InstitucionData from './Sections/institucionData';
import SectionLayout from '../../../SectionLayout';

export default function DatosGenerales() {
  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h4">Datos generales</Typography>
        <Divider
          sx={{ backgroundColor: 'orange', width: '30%', height: '3px' }}
        />
        <SectionLayout />
        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Typography variant="h6">Datos de institucion</Typography>
          </Grid>
          <Grid item sx={{ ml: 15, width: '100%' }}>
            <InstitucionData />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ textAlign: 'right', alignItems: 'end', mt: 1 }}
          >
            <ButtonStyled
              text="Terminar"
              alt="Terminar solicitud"
              type="success"
            />
            <span>&nbsp;&nbsp;</span>
            <ButtonStyled
              text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
              type="success"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
