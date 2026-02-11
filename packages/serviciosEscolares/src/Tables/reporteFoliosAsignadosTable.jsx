import React from 'react';
import ButtonsReporteFoliosAsig from '../Components/utils/ButtonReporteFoliosAsig';

const columnsReporteFoliosAsignados = (onFirmaSuccess) => [
  {
    field: 'Nombre',
    headerName: 'Alumno',
    width: 350,
    valueGetter: (params) => `${params.row.Nombre ?? ''} ${params.row.Apellido_Paterno ?? ''} ${params.row.Apellido_Materno ?? ''}`,
  },
  { field: 'Folio_Documento', headerName: 'Folio', width: 150 },
  { field: 'Fecha_Elaboracion', headerName: 'Fecha elaboración', width: 150 },
  { field: 'Libro', headerName: 'Libro', width: 150 },
  { field: 'Foja', headerName: 'Foja', width: 150 },
  { field: 'Fecha_Registro', headerName: 'Fecha registro', width: 150 },
  { field: 'RVOE', headerName: 'RVOE', width: 150 },
  { field: 'Nivel_Estudio_Nombre', headerName: 'Grado académico', width: 150 },
  { field: 'Nombre_Carrera', headerName: 'Plan de Estudios', width: 150 },
  { field: 'Tipo_Certificado', headerName: 'Tipo Documento', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 200,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const { row } = params;
      return (
        <ButtonsReporteFoliosAsig
          id={row.id}
          tipoDocumento={row.Tipo_Documento}
          libro={row.Libro}
          foja={row.Foja}
          estatusFirmado={row.Estatus_Firmado}
          solicitudFolioAlumnoId={row.Solicitud_Folio_Alumno_Id}
          onFirmaSuccess={onFirmaSuccess}
        />
      );
    },
  },
];

export default columnsReporteFoliosAsignados;
