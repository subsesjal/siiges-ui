import React from 'react';
import AsignaturasButtons from '../../../utils/AsignaturasButtons';

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

const columns = (
  grados,
  programaId,
  asignaturasList,
  setAsignaturasList,
  cicloId,
  setLoading,
  setNoti,
  rol,
) => {
  const gradoMap = createGradoMap(grados);

  return [
    {
      field: 'grado',
      headerName: 'Grado',
      width: 230,
      valueGetter: (params) => gradoMap[params.row.gradoId] || 'N/A',
    },
    { field: 'nombre', headerName: 'Asignatura', width: 320 },
    {
      field: 'tipo',
      headerName: 'Tipo de asignaturas',
      width: 200,
      valueGetter: (params) => {
        if (params.row.tipo === 1) return 'Normal';
        if (params.row.tipo === 2) return 'Formación Electiva';
        return 'N/A';
      },
    },
    { field: 'clave', headerName: 'Clave', width: 100 },
    { field: 'seriacion', headerName: 'Seriación', width: 170 },
    { field: 'creditos', headerName: 'Créditos' },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <AsignaturasButtons
          id={params.id}
          programaId={programaId}
          asignaturasList={asignaturasList}
          setAsignaturasList={setAsignaturasList}
          cicloId={cicloId}
          setLoading={setLoading}
          setNoti={setNoti}
          rol={rol}
        />
      ),
      sortable: false,
      filterable: false,
    },
  ];
};

export default columns;
