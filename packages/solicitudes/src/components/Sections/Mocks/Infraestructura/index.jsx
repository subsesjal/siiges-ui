import React from 'react';
import InfraestructurasButtons from '../../../utils/Components/InfraestructurasButtons';

const columns = (programaId, type, isDisabled) => [
  { field: 'tipoInstalacion', headerName: 'Tipo', width: 200 },
  { field: 'instalacion', headerName: 'Nombre', width: 200 },
  { field: 'capacidad', headerName: 'Capacidad (alumnos)', width: 200 },
  { field: 'metros', headerName: 'M²', width: 100 },
  { field: 'recursos', headerName: 'Recursos materiales', width: 200 },
  { field: 'ubicacion', headerName: 'Ubicación', width: 150 },
  { field: 'asignaturas', headerName: 'Asignaturas', width: 250 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <InfraestructurasButtons
        id={params.id}
        programaId={programaId}
        type={type}
        isDisabled={isDisabled}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columns;
