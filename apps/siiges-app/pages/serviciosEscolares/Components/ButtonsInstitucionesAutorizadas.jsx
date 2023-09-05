import { IconButton, Stack } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import KeyIcon from '@mui/icons-material/Key';
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

export default function ButtonsInstitucionesAutorizadas({ planteles, claveIES }) {
  return (
    <Stack direction="row" spacing={1}>
      {planteles && (
        <Link href={planteles}>
          <IconButton aria-label="Planteles">
            <ApartmentIcon />
          </IconButton>
        </Link>
      )}
      {claveIES && (
        <Link href={claveIES}>
          <IconButton aria-label="clave IES">
            <KeyIcon />
          </IconButton>
        </Link>
      )}
    </Stack>
  );
}

ButtonsInstitucionesAutorizadas.propTypes = {
  planteles: PropTypes.string.isRequired,
  claveIES: PropTypes.string.isRequired,
};
