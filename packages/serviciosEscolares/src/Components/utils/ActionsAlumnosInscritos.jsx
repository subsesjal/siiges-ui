import { Checkbox, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function ActionsAlumnosInscritos({
  id,
  selectedAsignaturas,
  onCheckboxChange,
}) {
  const [checked, setChecked] = useState(false);

  console.log(selectedAsignaturas);

  useEffect(() => {
    const isAsignaturaSelected = Array.isArray(selectedAsignaturas)
      && selectedAsignaturas.some((obj) => obj.asignaturaId === id);
    setChecked(isAsignaturaSelected);
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

ActionsAlumnosInscritos.propTypes = {
  id: PropTypes.number.isRequired,
  selectedAsignaturas: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};
