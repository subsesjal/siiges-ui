import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function ButtonVisibility({ showPassword, onPress, onMouse }) {
  return (
    <IconButton
      aria-label="mostrar/ocultar contraseña"
      edge="end"
      onClick={onPress}
      onMouseDown={onMouse}
      data-testid="visButton"
    >
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  );
}

ButtonVisibility.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onMouse: PropTypes.func.isRequired,
};

export default ButtonVisibility;
