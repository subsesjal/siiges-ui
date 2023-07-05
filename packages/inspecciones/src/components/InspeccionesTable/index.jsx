import { Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import React, { useState } from 'react';
import Link from 'next/link';
import { rows, columns } from '../Mocks/Inspecciones';

export default function InspeccionesTable() {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = searchText
    ? rows.filter((row) => Object.values(row).some(
      (value) => value
            && value.toString().toLowerCase().includes(searchText.toLowerCase()),
    ))
    : rows;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Inspecciones</Typography>
      </Grid>
      <Link href="./inspecciones/asignacionInspecciones">
        <Grid item xs={3}>
          <ButtonAdd text="agregar" />
        </Grid>
      </Link>
      <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          size="small"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Filtrar..."
        />
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
    </Grid>
  );
}
