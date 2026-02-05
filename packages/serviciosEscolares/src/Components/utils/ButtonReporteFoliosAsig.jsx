import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Stack, Tooltip, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import CreateIcon from '@mui/icons-material/Create';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Context, createRecord, getData } from '@siiges-ui/shared';
import ModalFirmaElectronica from '../FoliosAsignados/FoliosTable/ModalFirmaElectronica';

export default function ButtonsReporteFoliosAsig({
  id,
  tipoDocumento,
  solicitudFolioAlumnoId,
  estatusFirmado,
  onFirmaSuccess,
}) {
  const { setNoti } = useContext(Context);
  const [openFirmaModal, setOpenFirmaModal] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const esCertificado = tipoDocumento === 'Certificado';
  const firmadoExitoso = estatusFirmado === 'exitoso';

  const handleOpenFirmaModal = () => {
    setOpenFirmaModal(true);
  };

  const handleCloseFirmaModal = () => {
    setOpenFirmaModal(false);
  };

  const handleConfirmFirma = async ({ pkcs7, objetoPorFirmar }) => {
    try {
      const response = await createRecord({
        endpoint: `/solicitudesFolios/firmaDocumento?folioInterno=${objetoPorFirmar.folioInterno}`,
        data: {
          pkcs7,
          objetoPorFirmar,
          tipoDocumento: tipoDocumento.toLowerCase(),
        },
      });

      if (response.errorMessage) {
        setNoti({
          open: true,
          message: response.errorMessage,
          type: 'error',
        });
        return;
      }

      if (response.data?.estatusFirmado === 'exitoso') {
        setNoti({
          open: true,
          message: '¡Documento firmado exitosamente!',
          type: 'success',
        });

        if (onFirmaSuccess) {
          onFirmaSuccess(id);
        }

        handleCloseFirmaModal();
      } else if (response.data?.estatusFirmado === 'rechazado') {
        setNoti({
          open: true,
          message: 'La firma fue rechazada por el servicio',
          type: 'error',
        });
      } else {
        setNoti({
          open: true,
          message: 'Error al procesar la firma',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Error al firmar el documento',
        type: 'error',
      });
    }
  };

  const handleGenerarPDF = async () => {
    if (!id) {
      setNoti({
        open: true,
        message: 'No se encontró el ID del documento',
        type: 'error',
      });
      return;
    }

    setLoadingPdf(true);

    try {
      const response = await getData({
        endpoint: `/files?tipoEntidad=FOLIO_DOCUMENTO_ALUMNO&entidadId=${id}&tipoDocumento=CERTIFICADO_ELECTRONICO_PDF`,
      });

      if (response.errorMessage) {
        setNoti({
          open: true,
          message: response.errorMessage,
          type: 'error',
        });
        return;
      }

      if (response.data?.url) {
        window.open(response.data.url, '_blank');
      } else if (typeof response.data === 'string') {
        window.open(response.data, '_blank');
      } else {
        setNoti({
          open: true,
          message: 'No se pudo obtener el PDF',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Error al generar el PDF',
        type: 'error',
      });
    } finally {
      setLoadingPdf(false);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Tooltip title="Consultar" placement="top">
          <IconButton aria-label="Consultar Folio">
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Descargar" placement="top">
          <IconButton aria-label="Descargar Folio">
            <DownloadIcon />
          </IconButton>
        </Tooltip>

        {esCertificado && (
          <Tooltip
            title={firmadoExitoso ? 'Documento ya firmado' : 'Firmar Certificado'}
            placement="top"
          >
            <span>
              <IconButton
                aria-label="Firmar Certificado"
                onClick={handleOpenFirmaModal}
                disabled={firmadoExitoso}
                color={firmadoExitoso ? 'success' : 'default'}
              >
                <CreateIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}

        {esCertificado && (
          <Tooltip
            title={!firmadoExitoso ? 'Debe firmar primero' : 'Generar PDF'}
            placement="top"
          >
            <span>
              <IconButton
                aria-label="Generar PDF"
                onClick={handleGenerarPDF}
                disabled={!firmadoExitoso || loadingPdf}
                color={firmadoExitoso ? 'primary' : 'default'}
              >
                <PictureAsPdfIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Stack>

      <ModalFirmaElectronica
        open={openFirmaModal}
        onClose={handleCloseFirmaModal}
        onConfirm={handleConfirmFirma}
        title="Firmar Certificado"
        solicitudFolioAlumnoId={solicitudFolioAlumnoId}
      />
    </>
  );
}

ButtonsReporteFoliosAsig.defaultProps = {
  tipoDocumento: '',
  solicitudFolioAlumnoId: null,
  estatusFirmado: null,
  onFirmaSuccess: null,
};

ButtonsReporteFoliosAsig.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  tipoDocumento: PropTypes.string,
  solicitudFolioAlumnoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  estatusFirmado: PropTypes.string,
  onFirmaSuccess: PropTypes.func,
};
