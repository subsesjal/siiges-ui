import { Grid } from '@mui/material';
import { ButtonStyled, Input, Select } from '@siiges-ui/shared';
import Link from 'next/link';
import React, { useState } from 'react';

function NewRequest() {
  const [modalidad, setModalidad] = useState();
  const options = [
    {
      id: 'escolarizada',
      name: 'Escolarizada',
    },
    {
      id: 'noEscolarizada',
      name: 'No escolarizada',
    },
    {
      id: 'mixta',
      name: 'Mixta',
    },
    {
      id: 'dual',
      name: 'Dual',
    },
  ];
  const handleOnChange = (e) => {
    setModalidad(e.target.value);
  };
  return (
    <Grid item>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Select
            title="Modalidad"
            options={options}
            value={modalidad}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={5}>
          <Input label="Plantel" id="plantel" name="plantel" auto="plantel" />
        </Grid>
        <Grid item xs={2} sx={{ mt: 2, mb: 1 }}>
          <Link
            href={{
              pathname: '/solicitudes/nuevaSolicitud',
              query: { modalidad },
            }}
          >
            <div style={{ height: '100%' }}>
              <ButtonStyled text="Crear" alt="Nueva Solicitud" />
            </div>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NewRequest;
