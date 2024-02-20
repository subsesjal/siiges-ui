import React from 'react';
import DocentesButtons from '../../../utils/Components/DocentesButtons';

const columns = (docentesList, setDocentesList) => [
  { field: 'nombre', headerName: 'Nombre', width: 170 },
  { field: 'tipoDocente', headerName: 'Tipo' },
  { field: 'formacion', headerName: 'Formacion profecional', width: 180 },
  { field: 'asignatura', headerName: 'Asignatura', width: 170 },
  { field: 'experiencia', headerName: 'Experiencia', width: 170 },
  {
    field: 'tipoContratacion',
    headerName: 'Contratacion y antiguedad',
    width: 220,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <DocentesButtons
        id={params.id}
        docentesList={docentesList}
        setDocentesList={setDocentesList}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columns;
