import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ButtonsForm, NewPlantelForm, Overlay } from '@siiges-ui/shared';
import {
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import theme from '../theme';

export default function NewPlantel() {
  return (
    <ThemeProvider theme={theme}>
      <Overlay />
      <Container>
        <Card sx={{ minWidth: 275, mt: 5 }}>
          <CardContent>
            <Typography variant="h3">Alta Plantel</Typography>
            <Divider
              sx={{ backgroundColor: 'orange', width: '30%', height: '3px' }}
            />
            <NewPlantelForm />
            <ButtonsForm />
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
