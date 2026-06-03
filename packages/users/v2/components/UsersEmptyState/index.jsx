import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import { Button } from '@siiges-ui/shared';

export default function UsersEmptyState({ canCreate, onCreate }) {
  return (
    <Box sx={{ padding: 3, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6">No hay usuarios registrados</Typography>
        <Typography variant="body2">
          Cuando agregues usuarios apareceran aqui.
        </Typography>
        {canCreate && (
          <Button text="Nuevo usuario" type="add" onClick={onCreate} align="center" />
        )}
      </Stack>
    </Box>
  );
}

UsersEmptyState.defaultProps = {
  canCreate: false,
  onCreate: () => {},
};

UsersEmptyState.propTypes = {
  canCreate: PropTypes.bool,
  onCreate: PropTypes.func,
};
