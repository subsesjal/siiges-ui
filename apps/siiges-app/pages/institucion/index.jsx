import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Overlay } from '@siiges-ui/shared';
import { Institution, Planteles } from '@siiges-ui/institutions';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import theme from '../theme';

export default function InstitutionPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Overlay />
      <Container>
        <Card sx={{ minWidth: 275, marginTop: 5 }}>
          <CardContent>
            <Typography variant="h3">Institucion</Typography>
            <Divider
              sx={{ backgroundColor: 'orange', width: '30%', height: '3px' }}
            />
            <Grid container>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Datos de institucion" />
                  <Tab label="Planteles" />
                </Tabs>
              </Box>
              {value === 0 && <Institution />}
              {value === 1 && <Planteles />}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
