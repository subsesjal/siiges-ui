import React from 'react';
import ButtonsAlumnosInscritos from '../Components/utils/ButtonsAlumnosInscritos';

const columnsAlumnosInscritos = (asignaturas, grupoId) => [
  { field: 'matricula', headerName: 'Matricula', width: 170 },
  {
    field: 'apellidoPaterno',
    headerName: 'Apellido Paterno',
    width: 260,
    valueGetter: (params) => params.row.persona.apellidoPaterno,
  },

  {
    field: 'apellidoMaterno',
    headerName: 'Apellido Materno',
    width: 260,
    valueGetter: (params) => params.row.persona.apellidoMaterno,
  },

  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 260,
    valueGetter: (params) => params.row.persona.nombre,
  },

  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsAlumnosInscritos
        id={params.id}
        grupoId={grupoId}
        asignaturas={asignaturas}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsAlumnosInscritos;
