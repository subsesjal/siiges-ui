import React from 'react';
import ButtonsAlumnos from '../Components/utils/ButtonAlumnos';

const columnsAsignaturas = [
  { field: 'clave', headerName: 'Clave', width: 100 },
  { field: 'seriacion', headerName: 'Seriación', width: 200 },
  { field: 'asignatura', headerName: 'Asignatura', width: 650 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsAlumnos
        id={params.id}
        url={`/serviciosEscolares/Asignaturas/${params.id}/EditarAlumno`}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsAsignaturas;
