import React, { useContext, useState } from 'react';
import { Grid } from '@mui/material';
import {
  Select, InputNumber, ButtonSimple, getData,
  Context,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import ButtonTitulacion from './ButtonTitulacion';

export default function FormFoliosAsignados({ setFolios, folios }) {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [libro, setLibro] = useState('');
  const [fojaInicio, setFojaInicio] = useState('');
  const [fojaFin, setFojaFin] = useState('');
  const { setNoti } = useContext(Context);

  const documentos = [
    { id: 'titulo', nombre: 'Título' },
    { id: 'certificado', nombre: 'Certificado' },
  ];

  const isFormValid = tipoDocumento !== ''
    && Number(libro) > 0
    && Number(fojaInicio) > 0
    && Number(fojaFin) > 0;

  const handleBuscar = async () => {
    const query = `?fojaInicio=${fojaInicio}&fojaFin=${fojaFin}&libro=${libro}&tipoDocumento=${tipoDocumento}`;

    const { data } = await getData({
      endpoint: '/solicitudesFolios/reporteFolios',
      query,
    });

    if (Array.isArray(data) && data.length > 0) {
      setFolios(data);
    } else {
      setNoti({
        open: true,
        message: 'No se encontraron folios asignados.',
        type: 'error',
      });
      setFolios([]);
    }
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
      <Grid item xs={2}>
        <Select
          title="Tipo documento"
          name="tipoDocumento"
          value={tipoDocumento}
          options={documentos}
          onChange={(e) => setTipoDocumento(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <InputNumber
          id="libro"
          name="libro"
          label="Libro"
          value={libro}
          onChange={(e) => setLibro(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <InputNumber
          id="fojaInicio"
          name="fojaInicio"
          label="Foja Inicio"
          value={fojaInicio}
          onChange={(e) => setFojaInicio(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <InputNumber
          id="fojaFin"
          name="fojaFin"
          label="Foja Fin"
          value={fojaFin}
          onChange={(e) => setFojaFin(e.target.value)}
        />
      </Grid>
      {isFormValid && (
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <ButtonSimple
            design="buscar"
            text="Buscar"
            onClick={handleBuscar}
          />
        </Grid>
      )}
      {Array.isArray(folios) && folios.length > 0 && (
        <Grid item xs={12}>
          <ButtonTitulacion
            tipoDocumento={tipoDocumento}
            libro={libro}
            fojaInicio={fojaInicio}
            fojaFin={fojaFin}
          />
        </Grid>
      )}

    </Grid>
  );
}

FormFoliosAsignados.propTypes = {
  setFolios: PropTypes.func.isRequired,
  folios: PropTypes.arrayOf(PropTypes.shape({})),
};

FormFoliosAsignados.defaultProps = {
  folios: [],
};
