import { Grid } from '@mui/material';
import { ButtonSimple } from '@siiges-ui/shared';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ModalFirmaElectronica from '../../FoliosAsignados/FoliosTable/ModalFirmaElectronica';

export default function ButtonsFoliosAdmin({
  observaciones,
  folios,
  estatus,
  tipoDocumento,
  isConsult,
  alumnosData,
  solicitudData,
  onFirmaSuccess,
}) {
  const router = useRouter();
  const [openFirmaModal, setOpenFirmaModal] = useState(false);

  const buttonFolios = estatus !== 3 ? 'Generar Folios' : 'Envio Titulación';
  const shouldRenderButtonFolios = !(estatus === 3 && tipoDocumento === 'Certificado');
  const esCertificado = tipoDocumento === 'Certificado';

  const handleOpenFirmaModal = () => {
    setOpenFirmaModal(true);
  };

  const handleCloseFirmaModal = () => {
    setOpenFirmaModal(false);
  };

  const handleConfirmFirma = async (documentosPayload) => {
    if (onFirmaSuccess) {
      await onFirmaSuccess(documentosPayload);
    }
    handleCloseFirmaModal();
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <ButtonSimple
            text="Regresar"
            align="left"
            design="enviar"
            onClick={() => {
              router.back();
            }}
          />
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <ButtonSimple
              text="Firmar Solicitud"
              onClick={handleOpenFirmaModal}
            />
          </Grid>
        </Grid>

        {!isConsult && (
          <Grid item xs={esCertificado && estatus === 3 ? 12 : 6}>
            <Grid container justifyContent="flex-end" spacing={2}>
              {estatus !== 3 && (
                <Grid item>
                  <ButtonSimple text="Enviar observaciones" onClick={observaciones} />
                </Grid>
              )}

              {estatus !== 7 && shouldRenderButtonFolios && (
                <Grid item>
                  <ButtonSimple
                    text={buttonFolios}
                    onClick={folios}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>

      <ModalFirmaElectronica
        open={openFirmaModal}
        onClose={handleCloseFirmaModal}
        onConfirm={handleConfirmFirma}
        title="Firmar Certificados"
        alumnosData={alumnosData}
        solicitudData={solicitudData}
      />
    </>
  );
}

ButtonsFoliosAdmin.defaultProps = {
  isConsult: false,
  alumnosData: [],
  solicitudData: null,
  onFirmaSuccess: null,
};

ButtonsFoliosAdmin.propTypes = {
  observaciones: PropTypes.func.isRequired,
  folios: PropTypes.func.isRequired,
  estatus: PropTypes.number.isRequired,
  tipoDocumento: PropTypes.string.isRequired,
  isConsult: PropTypes.bool,
  alumnosData: PropTypes.arrayOf(PropTypes.shape()),
  solicitudData: PropTypes.shape(),
  onFirmaSuccess: PropTypes.func,
};
