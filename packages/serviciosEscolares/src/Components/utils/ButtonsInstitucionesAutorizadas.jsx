import Tooltip from '@mui/material/Tooltip';
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
          <Tooltip title="Planteles" placement="top">
            <IconButton aria-label="Planteles">
              <ApartmentIcon />
            </IconButton>
          </Tooltip>
        </Link>
      )}
      {claveIES && (
        <Link href={claveIES}>
          <Tooltip title="Clave IES" placement="top">
            <IconButton aria-label="clave IES">
              <KeyIcon />
            </IconButton>
          </Tooltip>
        </Link>
      )}
    </Stack>
  );
}

ButtonsInstitucionesAutorizadas.propTypes = {
  planteles: PropTypes.string.isRequired,
  claveIES: PropTypes.string.isRequired,
};
