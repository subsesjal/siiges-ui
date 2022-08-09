import React from 'react';
import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Overlay, UserForm, UserInfo } from '@siiges-ui/shared';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import theme from '../theme';

export default function UserEdit() {
  return (
    <ThemeProvider theme={theme}>
      <Overlay />
      <Container>
        <Card sx={{ minWidth: 275, mt: 5, minHeight: 500 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} sx={{ marginTop: 7 }}>
                <UserInfo />
              </Grid>
              <UserForm />
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
