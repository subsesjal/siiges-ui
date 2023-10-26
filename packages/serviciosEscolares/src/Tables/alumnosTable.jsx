import React from 'react';
import ButtonsAlumnos from '../Components/utils/ButtonAlumnos';

const columnsAlumnos = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'matricula', headerName: 'Matricula', width: 150 },
  { field: 'apellidoPaterno', headerName: 'Apellido Paterno', width: 200 },
  { field: 'apellidoMaterno', headerName: 'Apellido Materno', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'situacion', headerName: 'Situación', width: 200 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsAlumnos
        id={params.id}
        url={`/serviciosEscolares/alumnos/${params.id}/EditarAlumno`}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsAlumnos;
