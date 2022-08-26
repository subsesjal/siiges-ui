import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ButtonsForm, Overlay } from '@siiges-ui/shared';
import { NewUserForm } from '@siiges-ui/users';
import {
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import theme from '../../theme';

export default function NewUser() {
  return (
    <ThemeProvider theme={theme}>
      <Overlay />
      <Container>
        <Card sx={{ minWidth: 275, mt: 5 }}>
          <CardContent>
            <Typography variant="h3">Nuevo Usuario</Typography>
            <Divider
              sx={{ backgroundColor: 'orange', width: '30%', height: '3px' }}
            />
            <Typography variant="p">Llena los siguientes datos</Typography>
            <Divider sx={{ mt: 5 }} />
            <Typography variant="p" sx={{ fontWeight: 'medium' }}>
              Datos Generales
            </Typography>
            <NewUserForm />
            <ButtonsForm />
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
