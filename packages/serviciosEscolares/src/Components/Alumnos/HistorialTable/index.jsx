import React, { useContext } from 'react';
import { DataTable, getData, Context } from '@siiges-ui/shared';
import { Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import historialColumns from '../../../Tables/historialAlumnosTable';

const url = process.env.NEXT_PUBLIC_URL;

export default function HistorialTable({ alumno }) {
  const { setNoti } = useContext(Context);
  const rows = alumno
    ?.sort((a, b) => a.asignaturaId - b.asignaturaId || a.tipo - b.tipo)
    .map((record) => ({
      id: record.id,
      ciclo: record.grupo.cicloEscolar.nombre,
      clave: record.asignatura.clave,
      seriacion: record.asignatura.seriacion || 'N/A',
      asignatura: record.asignatura.nombre,
      tipo: record.tipo === 1 ? 'Ordinario' : 'Extraordinario',
      calificacion: record.calificacion,
      fechaExamen: record.fechaExamen,
    })) || [];

  const downloadHistorialAcademico = async () => {
    try {
      const { alumnoId } = alumno[0];
      const response = await getData({ endpoint: `/files/?tipoEntidad=ALUMNO&entidadId=${alumnoId}&tipoDocumento=HISTORIAL_ACADEMICO` });

      if (response && response.data) {
        const { ubicacion } = response.data;
        if (ubicacion && typeof ubicacion === 'string') {
          const finalUrl = url + ubicacion;
          if (finalUrl && finalUrl !== 'undefined') {
            window.open(finalUrl, '_blank');
          } else {
            setNoti({
              open: true,
              message: '¡Url no válido, intente de nuevo!',
              type: 'error',
            });
          }
        } else {
          setNoti({
            open: true,
            message: '¡Error al descargar el archivo, intente de nuevo!.',
            type: 'error',
          });
        }
      } else {
        setNoti({
          open: true,
          message: '¡Error al descargar el archivo, intente de nuevo!.',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error al descargar el archivo!',
        type: 'error',
      });
    }
  };

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={downloadHistorialAcademico}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Descargar
        </Button>
      </Grid>
      <DataTable
        rows={rows}
        columns={historialColumns}
        title="Historial del Alumno"
      />
    </Grid>
  );
}

HistorialTable.propTypes = {
  alumno: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      alumnoId: PropTypes.number.isRequired,
      grupo: PropTypes.shape({
        cicloEscolar: PropTypes.shape({
          nombre: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      asignatura: PropTypes.shape({
        clave: PropTypes.string.isRequired,
        seriacion: PropTypes.string,
        nombre: PropTypes.string.isRequired,
      }).isRequired,
      tipo: PropTypes.number.isRequired,
      calificacion: PropTypes.string.isRequired,
      fechaExamen: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
