import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import {
  DataTable,
  InputFile,
  LabelData,
  ButtonsForm,
} from '@siiges-ui/shared';
import { ModalAcuerdos, columnsAcuerdos } from '@siiges-ui/opds';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useApi from '@siiges-ui/shared/src/utils/hooks/useApi';

export default function OrganosColegiados({ type }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    id, institucion, periodo, sesion,
  } = router.query;
  const numericId = parseInt(id, 10);
  const [url, setUrl] = useState();
  const [reloadData, setReloadData] = useState(false);

  const { data } = useApi({
    endpoint: `api/v1/acuerdos/orgColegiados/${id}`,
    reload: reloadData, // Usa reloadData como una dependencia para recargar
  });

  useEffect(() => {
    if (type === 'editar') {
      console.log(type);
    }
    if (reloadData) {
      setReloadData(false);
    }
  }, [type, reloadData]);

  const handleButtonClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Typography variant="h7">{institucion}</Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={3}>
          <LabelData title="Tipo de Periodo" subtitle={periodo} />
        </Grid>
        <Grid item xs={3}>
          <LabelData title="Tipo de Sesión" subtitle={sesion} />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={4}>
          <InputFile
            label="Convocatoria"
            id={1}
            tipoEntidad="CONVOCATORIA"
            tipoDocumento="CONVOCATORIA"
            url={url}
            setUrl={setUrl}
            disabled={false}
          />
        </Grid>
        <Grid item xs={4}>
          <InputFile
            label="Orden del Día"
            id={1}
            tipoEntidad="ORDEN_DIA"
            tipoDocumento="ORDEN_DIA"
            url={url}
            setUrl={setUrl}
            disabled={false}
          />
        </Grid>
        <Grid item xs={4}>
          <InputFile
            label="Acta"
            id={1}
            tipoEntidad="ACTA"
            tipoDocumento="ACTA"
            url={url}
            setUrl={setUrl}
            disabled={false}
          />
        </Grid>

        <Grid item xs={12}>
          <DataTable
            buttonAdd
            buttonType="add"
            buttonText="Crear Nuevo Acuerdo"
            buttonClick={handleButtonClick}
            rows={data || []}
            columns={columnsAcuerdos}
          />
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={3}>
          <ButtonsForm
            cancel={() => router.back()}
            confirm={() => console.log('hola')}
          />
        </Grid>
      </Grid>
      <ModalAcuerdos
        open={open}
        setOpen={setOpen}
        setReloadData={setReloadData} // Cambio aquí
        title="Capturar Acuerdo"
        id={numericId}
      />
    </>
  );
}
OrganosColegiados.defaultProps = {
  type: '',
};

OrganosColegiados.propTypes = {
  type: PropTypes.string,
};
