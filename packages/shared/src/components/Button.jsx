import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function ButtonLogin({ type, color, text }) {
  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      color={color}
      sx={{
        mt: 3,
        mb: 2,
        textTransform: 'none',
        color: 'white',
        '&:hover': {
          backgroundColor: '#ffa34d',
        },
      }}
    >
      <b>{text}</b>
    </Button>
  );
}

ButtonLogin.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ButtonLogin;
