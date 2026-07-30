import React from 'react';
import { Typography } from '@mui/material';
import ButtonsValidacion from '../Components/utils/ButtonValidacion';
import DocumentsStudents from '../Components/utils/DocumentsStudents';

const OBSERVACIONES_COLOR = '#ed6c02';

const renderColoredCell = (value, hasObservaciones) => (
  <Typography
    variant="body2"
    sx={{ color: hasObservaciones ? OBSERVACIONES_COLOR : 'inherit' }}
  >
    {value}
  </Typography>
);

const columnsValidacion = (programa, institucion, onSituacionValidacionUpdated) => [
  {
    field: 'id', headerName: 'ID', width: 100, hide: true,
  },
  {
    field: 'matricula',
    headerName: 'Matrícula',
    width: 150,
    renderCell: (params) => renderColoredCell(
      params.row.matricula,
      Boolean(params.row.observaciones),
    ),
  },
  {
    field: 'apellidoPaterno',
    headerName: 'Primer Apellido',
    width: 200,
    renderCell: (params) => renderColoredCell(
      params.row.apellidoPaterno,
      Boolean(params.row.observaciones),
    ),
  },
  {
    field: 'apellidoMaterno',
    headerName: 'Segundo Apellido',
    width: 200,
    renderCell: (params) => renderColoredCell(
      params.row.apellidoMaterno,
      Boolean(params.row.observaciones),
    ),
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 200,
    renderCell: (params) => renderColoredCell(
      params.row.nombre,
      Boolean(params.row.observaciones),
    ),
  },
  {
    field: 'situacion',
    headerName: 'Situación',
    width: 120,
    renderCell: (params) => renderColoredCell(
      params.row.situacion,
      Boolean(params.row.observaciones),
    ),
  },
  {
    field: 'validacion',
    headerName: 'Validación',
    width: 120,
    renderCell: (params) => renderColoredCell(
      params.row.validacion,
      Boolean(params.row.observaciones),
    ),
  },
  {
    field: 'tipo',
    headerName: 'Método',
    width: 450,
    renderCell: (params) => renderColoredCell(
      params.row.tipo,
      Boolean(params.row.observaciones),
    ),
  },
  {
    field: 'documentos',
    headerName: 'Documentos',
    width: 220,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <DocumentsStudents
        archivoCertificadoUbicacion={params.row.archivoCertificadoUbicacion}
        archivoNacimientoUbicacion={params.row.archivoNacimientoUbicacion}
        archivoCurpUbicacion={params.row.archivoCurpUbicacion}
        archivoValidacionUbicacion={params.row.archivoValidacionUbicacion}
      />
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
