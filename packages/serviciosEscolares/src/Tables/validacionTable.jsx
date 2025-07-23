import React from 'react';
import ButtonsValidacion from '../Components/utils/ButtonValidacion';

const columnsValidacion = (programa, institucion) => [
  {
    field: 'id', headerName: 'ID', width: 100, hide: true,
  },
  { field: 'matricula', headerName: 'Matrícula', width: 150 },
  { field: 'apellidoPaterno', headerName: 'Primer Apellido', width: 200 },
  { field: 'apellidoMaterno', headerName: 'Segundo Apellido', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'situacion', headerName: 'Situación', width: 120 },
  { field: 'validacion', headerName: 'Validación', width: 120 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 100,
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
