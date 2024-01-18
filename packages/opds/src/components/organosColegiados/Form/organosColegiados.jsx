import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import {
  DataTable,
  InputFile,
  LabelData,
  ButtonsForm,
} from '@siiges-ui/shared';
import { ModalAcuerdos, columnsAcuerdos, rowsAcuerdos } from '@siiges-ui/opds';
import PropTypes from 'prop-types';

export default function OrganosColegiados({ type }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (type === 'editar') {
      console.log(type);
    }
  }, [type]);

  useEffect(() => {
    setRows(rowsAcuerdos);
  }, [rowsAcuerdos]);

  const handleButtonClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Typography variant="h7">
        Centro Universitario Enrique Díaz de León
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs="3">
          <LabelData title="Tipo de Periodo" subtitle="882" />
        </Grid>
        <Grid item xs="3">
          <LabelData title="Tipo de Sesión" subtitle="Primer Semestre" />
        </Grid>
        <Grid item xs="6" />
        <Grid item xs="4">
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
        <Grid item xs="4">
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
        <Grid item xs="4">
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
        <Grid item xs="12">
          <DataTable
            buttonAdd
            buttonText="Crear Nuevo Acuerdo"
            buttonClick={handleButtonClick}
            rows={rows}
            columns={columnsAcuerdos}
          />
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={3}>
          <ButtonsForm />
        </Grid>
      </Grid>
      <ModalAcuerdos open={open} setOpen={setOpen} title="Capturar Acuerdo" />
    </>
  );
}
OrganosColegiados.defaultProps = {
  type: '',
};

OrganosColegiados.propTypes = {
  type: PropTypes.string,
};
