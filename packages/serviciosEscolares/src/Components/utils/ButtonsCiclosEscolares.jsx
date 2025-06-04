import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CiclosEscolaresModal from './CiclosEscolaresModal';

export default function ButtonsCiclosEscolares({ row, handleSuccess }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack direction="row" spacing={1}>
        {row && (
          <Tooltip title="Editar" placement="top">
            <IconButton
              aria-label="Ciclos Escolares Editar"
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <CiclosEscolaresModal
        open={open}
        setOpen={setOpen}
        onSuccess={handleSuccess}
        type="edit"
        data={row}
      />
    </>
  );
}

ButtonsCiclosEscolares.propTypes = {
  row: PropTypes.number.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};
