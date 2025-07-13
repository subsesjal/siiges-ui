import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Select, InputNumber } from '@siiges-ui/shared';
import ButtonTitulacion from './ButtonTitulacion';

export default function FormFoliosAsignados() {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [libro, setLibro] = useState('');
  const [fojaInicio, setFojaInicio] = useState('');
  const [fojaFin, setFojaFin] = useState('');

  const documentos = [
    { id: 'titulo', nombre: 'Título' },
    { id: 'certificado', nombre: 'Certificado' },
  ];

  const isFormValid = tipoDocumento !== ''
  && Number(libro) > 0
  && Number(fojaInicio) > 0
  && Number(fojaFin) > 0;

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={3}>
        <Select
          title="Tipo de Documento"
          name="tipoDocumento"
          value={tipoDocumento}
          options={documentos}
          onChange={(e) => setTipoDocumento(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <InputNumber
          id="libro"
          name="libro"
          label="Libro"
          value={libro}
          onChange={(e) => setLibro(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <InputNumber
          id="fojaInicio"
          name="fojaInicio"
          label="Foja Inicio"
          value={fojaInicio}
          onChange={(e) => setFojaInicio(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <InputNumber
          id="fojaFin"
          name="fojaFin"
          label="Foja Fin"
          value={fojaFin}
          onChange={(e) => setFojaFin(e.target.value)}
        />
      </Grid>
      {isFormValid && (
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
