import React, { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import { DataTable, Select } from '@siiges-ui/shared';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

const tipoConsulta = [
  { id: 1, nombre: 'Revalidaciones' },
  { id: 2, nombre: 'Equivalencias' },
];

const getColumns = (handleConsultar) => [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'nombre', headerName: 'Nombre', width: 700 },
  { field: 'fecha', headerName: 'Fecha', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <IconButton
        onClick={() => handleConsultar(params.row)}
      >
        <SearchIcon />
      </IconButton>
    ),
  },
];

const mockRows = [
  {
    id: 1,
    nombre: 'Revalidación A',
    fecha: '2023-01-15',
    tipo: 'revalidacion',
  },
  {
    id: 2,
    nombre: 'Equivalencia B',
    fecha: '2023-02-20',
    tipo: 'equivalencia',
  },
  {
    id: 3,
    nombre: 'Revalidación C',
    fecha: '2023-03-10',
    tipo: 'revalidacion',
  },
  {
    id: 4,
    nombre: 'Equivalencia D',
    fecha: '2023-04-05',
    tipo: 'equivalencia',
  },
];

export default function RevalidacionEquivalencias() {
  const [tipoConsultaId, setTipoConsultaId] = useState();
  const router = useRouter();

  const handleTipoConsultaChange = (event) => {
    setTipoConsultaId(event.target.value);
  };

  const handleConsultar = (rowData) => {
    if (tipoConsultaId === 1) {
      router.push(`/serviciosEscolares/revalidacionEquivalencias/${rowData.id}/Equivalencias/consultar`);
    } else if (tipoConsultaId === 2) {
      router.push(`/serviciosEscolares/revalidacionEquivalencias/${rowData.id}/Revalidaciones/consultar`);
    }
  };

  const filteredRows = mockRows.filter((row) => {
    if (tipoConsultaId === 1) {
      return row.tipo === 'revalidacion';
    }
    if (tipoConsultaId === 2) {
      return row.tipo === 'equivalencia';
    }
    return [];
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Select
          name="tipoConsulta"
          options={tipoConsulta}
          title="Tipo de Consulta"
          onchange={handleTipoConsultaChange}
        />
      </Grid>
      {tipoConsultaId && (
        <Grid item xs={12}>
          <DataTable
            title={tipoConsultaId === 1 ? 'Revalidaciones' : 'Equivalencias'}
            rows={filteredRows}
            columns={getColumns(handleConsultar)}
          />
        </Grid>
      )}
    </Grid>
  );
}
