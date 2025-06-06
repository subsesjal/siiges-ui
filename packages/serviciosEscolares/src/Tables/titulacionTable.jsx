import React from 'react';
import ButtonsTitulacion from '../Components/utils/ButtonsTitulacion';

const titulacionAlumnos = [
  {
    field: 'id', headerName: 'ID', width: 50, hide: true,
  },
  { field: 'matricula', headerName: 'Matrícula', width: 150 },
  { field: 'apellidoPaterno', headerName: 'Primer Apellido', width: 200 },
  { field: 'apellidoMaterno', headerName: 'Segundo Apellido', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'situacion', headerName: 'Situación', width: 200 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsTitulacion
        id={params.id}
        url={`/serviciosEscolares/titulacion/${params.id}/tituloAlumno`}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default titulacionAlumnos;
