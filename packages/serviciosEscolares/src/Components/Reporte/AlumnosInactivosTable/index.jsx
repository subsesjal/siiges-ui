import React from 'react';
import { Grid } from '@mui/material';
import { ButtonSimple, DataTable, useUI } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import GetFilePdf from '../../utils/GetFilePdf';

const columns = [
  { field: 'nombre', headerName: 'Nombre', width: 350 },
  { field: 'curp', headerName: 'CURP', width: 250 },
  { field: 'fechaInicioAntecedentes', headerName: 'Fecha de Inicio de Antecedentes', width: 260 },
  { field: 'fechaFinAntecedentes', headerName: 'Fecha de Fin de Antecedentes', width: 260 },
  { field: 'fechaExpedicion', headerName: 'Fecha de Expedición', width: 200 },
  { field: 'fechaCreacion', headerName: 'Fecha de Creación', width: 200 },
  { field: 'tipoValidacion', headerName: 'Tipo de Validación', width: 250 },
];

export default function AlumnosInactivosTable({
  matriculas, institucionId, plantelId, programaId,
}) {
  const { setNoti, setLoading } = useUI();

  const rows = matriculas.map((validaciones) => ({
    ...validaciones,
    id: validaciones.id,
  }));

  const handleDescargar = async () => {
    setLoading(true);
    const params = { institucionId };
    if (plantelId) params.plantelId = plantelId;
    if (programaId) params.programaId = programaId;

    try {
      const objectUrl = await GetFilePdf('/alumnos/matricula-inactiva/pdf', params);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'reporte-alumnos-inactivos.pdf';
      link.click();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      setNoti({ open: true, message: '¡No se pudo generar el reporte!', type: 'warning' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      {matriculas.length > 0 && (
        <Grid item xs={12} sx={{ mt: 2 }}>
          <ButtonSimple align="right" design="enviar" text="Descargar Reporte" onClick={handleDescargar} />
        </Grid>
      )}
      <Grid item xs={12}>
        <DataTable title="Alumnos" columns={columns} rows={rows} />
      </Grid>
    </Grid>
  );
}

AlumnosInactivosTable.defaultProps = {
  matriculas: [],
  institucionId: '',
  plantelId: '',
  programaId: '',
};

AlumnosInactivosTable.propTypes = {
  matriculas: PropTypes.arrayOf(
    PropTypes.shape({
      validacionId: PropTypes.number.isRequired,
      tipoValidacion: PropTypes.string,
      institucion: PropTypes.string,
      totalAlumnos: PropTypes.number,
    }),
  ),
  institucionId: PropTypes.string,
  plantelId: PropTypes.string,
  programaId: PropTypes.string,
};
