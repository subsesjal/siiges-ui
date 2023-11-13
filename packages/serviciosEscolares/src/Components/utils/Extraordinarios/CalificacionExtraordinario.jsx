import { Input } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function CalificacionExtraordinario({ disabled }) {
  return (
    <div style={{ marginTop: -10 }}>
      <Input name="calificacionExtraordinario" variant="standard" disabled={disabled} />
    </div>
  );
}

CalificacionExtraordinario.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
