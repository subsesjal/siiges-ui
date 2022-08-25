import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import React from 'react';

const columns = [
  { field: 'educationDegree', headerName: 'Nivel Educativo' },
  { field: 'educatioName', headerName: 'Nombre de los estudios' },
  { field: 'institutionName', headerName: 'Nombre de la institucion' },
  { field: 'document', headerName: 'Documento que lo acredita' },
  { field: 'actions', headerName: 'Acciones' },
];

const rows = [
  {
    id: 1,
    educationDegree: 'Doctorado',
    educatioName: 'Doctor',
    institutionName: 'SchoolArt',
    document: 'Titulo',
    actions: 'iconos',
  },
  {
    id: 2,
    educationDegree: 'Maestria',
    educatioName: 'Maestro',
    institutionName: 'SchoolArt',
    document: 'Titulo',
    actions: 'iconos',
  },
  {
    id: 3,
    educationDegree: 'Maestria',
    educatioName: 'Maestro',
    institutionName: 'SchoolArt',
    document: 'Titulo',
    actions: 'iconos',
  },
  {
    id: 4,
    educationDegree: 'Maestria',
    educatioName: 'Maestro',
    institutionName: 'SchoolArt',
    document: 'Titulo',
    actions: 'iconos',
  },
  {
    id: 5,
    educationDegree: 'Maestria',
    educatioName: 'Maestro',
    institutionName: 'SchoolArt',
    document: 'Titulo',
    actions: 'iconos',
  },
  {
    id: 6,
    educationDegree: 'Maestria',
    educatioName: 'Maestro',
    institutionName: 'SchoolArt',
    document: 'Titulo',
    actions: 'iconos',
  },
  {
    id: 7,
    educationDegree: 'Maestria',
    educatioName: 'Maestro',
    institutionName: 'SchoolArt',
    document: 'Titulo',
    actions: 'iconos',
  },
  {
    id: 8,
    educationDegree: 'Maestria',
    educatioName: 'Maestro',
    institutionName: 'SchoolArt',
    document: 'Titulo',
    actions: 'iconos',
  },
  {
    id: 9,
    educationDegree: 'Maestria',
    educatioName: 'Maestro',
    institutionName: 'SchoolArt',
    document: 'Titulo',
    actions: 'iconos',
  },
];

function DirectorData() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <ButtonAdd text="agregar" />
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default DirectorData;
