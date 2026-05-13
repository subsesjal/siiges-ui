import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Stack, Typography,
} from '@mui/material';

export default function UsersErrorState({ message, onRetry }) {
  return (
    <Box sx={{ padding: 3, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6">Ocurrio un error</Typography>
        <Typography variant="body2">{message}</Typography>
        {onRetry && (
          <Button variant="contained" onClick={onRetry}>
            Reintentar
          </Button>
        )}
      </Stack>
    </Box>
  );
}

UsersErrorState.defaultProps = {
  onRetry: null,
};

UsersErrorState.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};
