import React from 'react';
import ButtonsValidacion from '../Components/utils/ButtonValidacion';
import DocumentosValidacion from '../Components/utils/DocumentosValidacion';

const columnsValidacion = (programa, institucion, onSituacionValidacionUpdated) => [
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
    field: 'tipo',
    headerName: 'Método',
    width: 450,
  },
  {
    field: 'documentos',
    headerName: 'Documentos',
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <DocumentosValidacion id={params.id} />
    ),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 120,
    renderCell: (params) => (
      <ButtonsValidacion
        id={params.id}
        url={`/serviciosEscolares/validacion/${params.id}/ValidarAlumno`}
        programa={programa}
        institucion={institucion}
        situacionValidacionId={params.row.situacionValidacionId}
        onUpdated={onSituacionValidacionUpdated}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsValidacion;
