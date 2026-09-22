import {
  ButtonSimple, DataTable, getData,
  useUI,
} from '@siiges-ui/shared';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import columnsReporte from '../../../Tables/reporteTable';
import getFilePdf from '../../utils/getFilePdf';

export default function ReporteTable({
  alumnos, institucion, programa, cicloEscolar, plantel,
}) {
  const [downloading, setDownloading] = useState(false);
  const { setNoti } = useUI();

  const handleDownloadPdf = async () => {
    setDownloading(true);

    const params = new URLSearchParams();
    params.append('institucionId', institucion);
    params.append('cicloEscolarId', cicloEscolar);
    if (plantel) params.append('plantelId', plantel);
    if (programa) params.append('programaId', programa);

    const { statusCode, errorMessage } = await getFilePdf({
      endpoint: '/alumnos/matricula-extraordinaria/pdf',
      query: `?${params.toString()}`,
      fileName: 'reporte-matricula-extraordinaria.pdf',
    });

    if (statusCode !== 200) {
      setNoti({
        open: true,
        message: errorMessage || 'No fue posible descargar el reporte',
        type: 'success',
      });
    }

    setDownloading(false);
  };

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <Grid item xs={12}>
        <ButtonSimple
          text={downloading ? 'Descargando...' : 'Descargar reporte'}
          onClick={handleDownloadPdf}
          design="enviar"
          align="right"
          disabled={downloading}
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          rows={alumnos}
          columns={columnsReporte()}
          title="Tabla de alumnos"
        />
      </Grid>
    </Grid>
  );
}

ReporteTable.propTypes = {
  alumnos: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired,
  institucion: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  programa: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  plantel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cicloEscolar: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

ReporteTable.defaultProps = {
  programa: null,
  plantel: null,
};
