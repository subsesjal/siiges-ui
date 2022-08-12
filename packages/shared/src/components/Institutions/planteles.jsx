import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonStyled } from '@siiges-ui/shared';
import { Grid, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

const columns = [
  { field: 'user', headerName: 'Usuario', width: 200 },
  { field: 'email', headerName: 'Correo', width: 250 },
  { field: 'rol', headerName: 'Rol', width: 180 },
  {
    field: 'date',
    headerName: 'Fecha',
    type: 'date',
    width: 180,
  },
  { field: 'status', headerName: 'Estatus', width: 150 },
  { field: 'actions', headerName: 'Acciones', width: 150 },
];

const rows = [
  {
    id: 1,
    user: 'Jon Snow',
    email: 'juannieves@gmail.com',
    rol: 'jefe',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 2,
    user: 'Cersei Lannister',
    email: 'cerseilannister@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 3,
    user: 'Jaime Lannister',
    email: 'jaimelannister@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 4,
    user: 'Arya Stark',
    email: 'aryastark@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 5,
    user: 'Daenerys Targaryen',
    email: 'daenerystargaryen@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 6,
    user: 'Melisandre',
    email: 'melisandre@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 7,
    user: 'Ferrara Clifford',
    email: 'ferraraclifford@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 8,
    user: 'Rossini Frances',
    email: 'rossinifrances@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 9,
    user: 'Harvey Roxie',
    email: 'harveyroxie@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
];

export default function Planteles() {
  return (
    <>
      <Grid container>
        <Grid item xs={9} sx={{ mt: '20px' }}>
          <Link href="/users/newUser">
            <div>
              <ButtonStyled
                text="Nuevo Plantel"
                alt="Agregar Plantel"
                type="success"
              />
            </div>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <TextField
            margin="normal"
            fullWidth
            id="filter"
            label="Filtrar"
            type="text"
            name="filter"
            autoComplete="filter"
            autoFocus
            size="small"
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton position="end">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%', marginTop: 15 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
}
