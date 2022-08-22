import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { ButtonStyled, Overlay } from '@siiges-ui/shared';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import theme from '../theme';

function newRequest() {
  return (
    <ThemeProvider theme={theme}>
      <Overlay />
      <Container>
        <Card sx={{ minWidth: 275, marginTop: 5 }}>
          <CardContent>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="p" sx={{ fontWeight: 'bold' }}>
                  Tipo de solicitud:
                  <span>&nbsp;</span>
                </Typography>
                <Typography variant="p">Nueva Solicitud</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <ButtonStyled
                  text="Terminar"
                  alt="Terminar solicitud"
                  type="success"
                />
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
