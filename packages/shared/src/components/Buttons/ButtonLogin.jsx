import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import '../../styles/buttons/ButtonLogin.css';

function ButtonLogin({
  type,
  color,
  text,
  click,
}) {
  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      color={color}
      onClick={click}
      className="buttonLogin"
    >
      <b>{text}</b>
    </Button>
  );
}

ButtonLogin.defaultProps = {
  click: () => {},
};

ButtonLogin.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  click: PropTypes.func,
};

export default ButtonLogin;
