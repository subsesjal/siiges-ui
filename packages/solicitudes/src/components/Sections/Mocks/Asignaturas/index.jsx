import React from 'react';
import AsignaturasButtons from '../../../utils/Components/AsignaturasButtons';

// Create a mapping of gradoId to nombre
const createGradoMap = (grados) => {
  const gradoMap = {};

  Object.values(grados).forEach((gradoArray) => {
    gradoArray.forEach((grado) => {
      gradoMap[grado.id] = grado.nombre;
    });
  });

  return gradoMap;
};

const columns = (grados, isDisabled) => {
  const gradoMap = createGradoMap(grados);

  return [
    {
      field: 'grado',
      headerName: 'Grado',
      width: 230,
      valueGetter: (params) => gradoMap[params.row.gradoId] || 'N/A',
    },
    { field: 'nombre', headerName: 'Nombre', width: 320 },
    { field: 'clave', headerName: 'Clave', width: 100 },
    { field: 'seriacion', headerName: 'Seriación', width: 170 },
    { field: 'creditos', headerName: 'Créditos' },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => <AsignaturasButtons id={params.id} isDisabled={isDisabled} />,
      sortable: false,
      filterable: false,
    },
  ];
};

export default columns;
