import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button as SharedButton } from '@siiges-ui/shared';

export default function UsersToolbar({ canCreate, onCreate, onReload }) {
  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
        <Typography variant="h5">Usuarios V2</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
          <Button
            variant="text"
            onClick={onReload}
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none' }}
          >
            Actualizar
          </Button>
          {canCreate && (
            <SharedButton text="Nuevo usuario" type="add" onClick={onCreate} align="right" />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

UsersToolbar.defaultProps = {
  canCreate: false,
  onCreate: () => {},
};

UsersToolbar.propTypes = {
  canCreate: PropTypes.bool,
  onCreate: PropTypes.func,
  onReload: PropTypes.func.isRequired,
};
