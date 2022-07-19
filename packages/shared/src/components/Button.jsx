import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Link from 'next/link';

function ButtonLogin({
  type,
  color,
  text,
  href,
}) {
  return (
    <Link href={href}>
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
          opacity: 1,
        }}
      >
        <b>{text}</b>
      </Button>
    </Link>
  );
}

ButtonLogin.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default ButtonLogin;
