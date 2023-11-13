import { Input } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function FechaExtraordinario({ disabled }) {
  return (
    <div style={{ marginTop: -10, width: '100%' }}>
      <Input
        name="fechaExtraordinario"
        type="date"
        variant="standard"
        disabled={disabled}
      />
    </div>
  );
}

FechaExtraordinario.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
