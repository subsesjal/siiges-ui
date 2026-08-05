import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useUI } from '@siiges-ui/shared';
import PropTypes from 'prop-types';

const domain = process.env.NEXT_PUBLIC_URL;

export default function DocumentsStudents({
  archivoCertificadoUbicacion,
  archivoNacimientoUbicacion,
  archivoCurpUbicacion,
  archivoValidacionUbicacion,
}) {
  const { setNoti } = useUI();

  const handleVerDocumento = (ubicacion) => {
    if (!ubicacion) {
      setNoti({
        open: true,
        message: 'No se pudo obtener el documento',
        type: 'error',
      });
      return;
    }
    window.open(`${domain}${ubicacion}`, '_blank');
  };

  const documentos = [
    { key: 'certificado', label: 'Ver Cédula Profesional, Título o equivalente', ubicacion: archivoCertificadoUbicacion },
    { key: 'nacimiento', label: 'Ver Acta de Nacimiento', ubicacion: archivoNacimientoUbicacion },
    { key: 'curp', label: 'Ver CURP', ubicacion: archivoCurpUbicacion },
    { key: 'validacion', label: 'Ver archivo de Validación', ubicacion: archivoValidacionUbicacion },
  ];

  return (
    <Stack direction="row" spacing={1}>
      {documentos.map((doc) => (
        <Tooltip key={doc.key} title={doc.label} placement="top">
          <span>
            <IconButton
              onClick={() => handleVerDocumento(doc.ubicacion)}
              disabled={!doc.ubicacion}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </span>
        </Tooltip>
      ))}
    </Stack>
  );
}

DocumentsStudents.defaultProps = {
  archivoCertificadoUbicacion: null,
  archivoNacimientoUbicacion: null,
  archivoCurpUbicacion: null,
  archivoValidacionUbicacion: null,
};

DocumentsStudents.propTypes = {
  archivoCertificadoUbicacion: PropTypes.string,
  archivoNacimientoUbicacion: PropTypes.string,
  archivoCurpUbicacion: PropTypes.string,
  archivoValidacionUbicacion: PropTypes.string,
};
