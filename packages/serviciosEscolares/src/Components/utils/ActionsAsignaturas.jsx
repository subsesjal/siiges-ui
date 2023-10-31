import { Checkbox, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

export default function ActionsAsignaturas({
  id,
  onCheckboxChange,
  selectedAsignaturas,
}) {
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    if (selectedAsignaturas) {
      setChecked(selectedAsignaturas.includes(id));
    }
  }, [selectedAsignaturas, id]);

  return (
    <Stack direction="row" spacing={1}>
      {id && (
        <Checkbox
          onChange={(e) => onCheckboxChange(id, e.target.checked)}
          checked={checked}
        />
      )}
    </Stack>
  );
}

ActionsAsignaturas.propTypes = {
  id: PropTypes.number.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  selectedAsignaturas: PropTypes.arrayOf(PropTypes.number).isRequired,
};
