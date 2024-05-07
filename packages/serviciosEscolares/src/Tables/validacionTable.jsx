import React from 'react';
import ButtonsValidacion from '../Components/utils/ButtonValidacion';

const columnsValidacion = (programa, institucion) => [
  { field: 'id', headerName: 'ID', width: 60 },
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
      <ButtonsValidacion
        id={params.id}
        url={`/serviciosEscolares/validacion/${params.id}/ValidarAlumno`}
        programa={programa}
        institucion={institucion}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsValidacion;
