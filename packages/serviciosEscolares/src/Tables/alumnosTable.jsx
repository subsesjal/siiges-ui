import React from 'react';
import ButtonsAlumnos from '../Components/utils/ButtonAlumnos';
import DocumentsStudents from '../Components/utils/DocumentsStudents';

const columnsAlumnos = (onDeleteSuccess) => [
  {
    field: 'id', headerName: 'ID', width: 50, hide: true,
  },
  { field: 'matricula', headerName: 'Matrícula', width: 150 },
  { field: 'apellidoPaterno', headerName: 'Primer Apellido', width: 200 },
  { field: 'apellidoMaterno', headerName: 'Segundo Apellido', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'situacion', headerName: 'Situación', width: 120 },
  { field: 'validacion', headerName: 'Validación', width: 120 },
  {
    field: 'documentos',
    headerName: 'Documentos',
    width: 220,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <DocumentsStudents id={params.id} />
    ),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 120,
    renderCell: (params) => (
      <ButtonsAlumnos
        id={params.id}
        url={`/serviciosEscolares/alumnos/${params.id}/EditarAlumno`}
        matricula={params.row.matricula}
        onDeleteSuccess={onDeleteSuccess}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsAlumnos;
