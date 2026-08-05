import { Grid } from '@mui/material';
import { ButtonSimple, useAuth } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function ButtonsFoliosAdmin({
  observaciones,
  folios,
  estatus,
  tipoDocumento,
  isConsult,
  onFirmarClick,
}) {
  const router = useRouter();
  const { session } = useAuth();
  const { rol } = session;
  const userFirma = (rol === 'admin' || rol === 'folios_sicyt');
  const buttonFolios = estatus !== 3 ? 'Asignar Folio' : 'Envio Titulación';
  const shouldRenderButtonFolios = !(estatus === 3 && tipoDocumento === 'Certificado');

  const esCertificado = tipoDocumento === 'Certificado';
  const mostrarBotonFirma = esCertificado && (estatus === 9 || estatus === 10) && userFirma;

  return (
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
      {(!isConsult || mostrarBotonFirma) && (
        <Grid item xs={6}>
          <Grid container justifyContent="flex-end" spacing={2}>
            {estatus !== 3 && !mostrarBotonFirma && (
              <Grid item>
                <ButtonSimple text="Enviar observaciones" onClick={observaciones} />
              </Grid>
            )}
            {estatus !== 7 && shouldRenderButtonFolios && !mostrarBotonFirma && (
              <Grid item>
                <ButtonSimple
                  text={buttonFolios}
                  onClick={folios}
                />
              </Grid>
            )}
            {mostrarBotonFirma && (
              <Grid item>
                <ButtonSimple
                  text="Firmar Solicitud SICYT"
                  onClick={onFirmarClick}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

ButtonsFoliosAdmin.defaultProps = {
  isConsult: false,
  onFirmarClick: () => { },
};

ButtonsFoliosAdmin.propTypes = {
  observaciones: PropTypes.func.isRequired,
  folios: PropTypes.func.isRequired,
  estatus: PropTypes.number.isRequired,
  tipoDocumento: PropTypes.string.isRequired,
  isConsult: PropTypes.bool,
  onFirmarClick: PropTypes.func,
};
