import { Grid, Tab, Tabs } from '@mui/material'
import { DocumentosAlumno, FormAlumno } from '@siiges-ui/serviciosescolares'
import { Layout } from '@siiges-ui/shared'
import React from 'react'
import { useState } from 'react';

export default function EditarAlumno() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Layout title="Editar Alumno">
      <Grid container>
        <Grid item xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Información Personal" />
            <Tab label="Documentos" />
          </Tabs>
        </Grid>
        {value === 0 && <FormAlumno type="edit" />}
        {value === 1 && <DocumentosAlumno />}
      </Grid>
    </Layout>
  )
}
