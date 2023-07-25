import React from 'react';
import AsignaturasButtons from '../../../utils/Components/AsignaturasButtons';

const columns = () => [
  { field: 'nombre', headerName: 'Nombre', width: 170 },
  { field: 'tipoDocente', headerName: 'Tipo' },
  { field: 'formacion', headerName: 'Formacion profecional', width: 180 },
  { field: 'asignatura', headerName: 'Asignatura', width: 170 },
  { field: 'experienciaLaboral', headerName: 'Experiencia', width: 170 },
  {
    field: 'tipoContratacion',
    headerName: 'Contratacion y antiguedad',
    width: 220,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => <AsignaturasButtons id={params.id} />,
    sortable: false,
    filterable: false,
  },
];

export default columns;
