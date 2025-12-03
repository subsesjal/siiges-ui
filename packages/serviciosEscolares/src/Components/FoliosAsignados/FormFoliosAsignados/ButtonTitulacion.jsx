import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Context,
  getToken,
  ButtonSimple,
} from '@siiges-ui/shared';

const apiUrl = process.env.NEXT_PUBLIC_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function ButtonTitulacion({
  tipoDocumento,
  libro,
  fojaInicio,
  fojaFin,
}) {
  const { setNoti } = useContext(Context);

  const handleClick = async () => {
    try {
      const endpoint = `${apiUrl}/api/v1/solicitudesFolios/reporteFolios/csv?fojaInicio=${fojaInicio}&fojaFin=${fojaFin}&libro=${libro}&tipoDocumento=${tipoDocumento}`;
      const token = getToken();

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          api_key: apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al generar el archivo');
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      const match = contentDisposition && contentDisposition.match(/filename="?(.+)"?/);
      const fileName = match ? match[1] : 'reporte-folios.csv';

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error al generar el reporte!',
        type: 'error',
      });
    }
  };

  return (
    <ButtonSimple
      onClick={handleClick}
      design="guardar"
      text="Descargar reporte"
    />
  );
}

ButtonTitulacion.propTypes = {
  tipoDocumento: PropTypes.string,
  libro: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fojaInicio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fojaFin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ButtonTitulacion.defaultProps = {
  tipoDocumento: '',
  libro: '',
  fojaInicio: '',
  fojaFin: '',
};
