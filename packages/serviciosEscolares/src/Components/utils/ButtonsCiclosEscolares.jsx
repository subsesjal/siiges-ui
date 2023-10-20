import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CiclosEscolaresModal from './CiclosEscolaresModal';

export default function ButtonsCiclosEscolares({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Stack direction="row" spacing={1}>
        {id && (
          <IconButton
            aria-label="Ciclos Escolares Editar"
            onClick={() => {
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Stack>
      <CiclosEscolaresModal open={open} setOpen={setOpen} type="edit" />
    </>
  );
}

ButtonsCiclosEscolares.propTypes = {
  id: PropTypes.number.isRequired,
};
