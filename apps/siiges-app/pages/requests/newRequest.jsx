import {
  Card,
  CardContent,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { ButtonStyled, LoadCircle, Overlay } from '@siiges-ui/shared';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ThemeProvider } from 'styled-components';
import { InstitucionData } from '@siiges-ui/authentication';
import theme from '../theme';

const steps = [
  'Datos generales',
  'Programa de estudios',
  'Plantel',
  'Anexos',
  'Evaluacion curricular',
];

function newRequest() {
  return (
    <ThemeProvider theme={theme}>
      <Overlay />
      <Container>
        <Card sx={{ minWidth: 275, marginTop: 5 }}>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ width: '100%', mb: 3 }}>
                  <Stepper activeStep={0} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p" sx={{ fontWeight: 'bold' }}>
                  Tipo de solicitud:
                  <span>&nbsp;</span>
                </Typography>
                <Typography variant="p">Nueva Solicitud</Typography>
                <br />
                <Typography variant="p" sx={{ fontWeight: 'bold' }}>
                  Fecha de inicio:
                  <span>&nbsp;</span>
                </Typography>
                <Typography variant="p">22 de Agosto 2022</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right', alignItems: 'end' }}>
                <ButtonStyled
                  text="Terminar"
                  alt="Terminar solicitud"
                  type="success"
                />
                <span>&nbsp;&nbsp;</span>
                <ButtonStyled text="Salir" alt="Salir" type="success" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ mt: 3, mb: 3 }}>
          <CardContent>
            <Typography variant="h4">Datos generales</Typography>
            <Divider
              sx={{ backgroundColor: 'orange', width: '30%', height: '3px' }}
            />
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
              <Grid
                item
                xs={3}
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
      </Container>
    </ThemeProvider>
  );
}

export default newRequest;
