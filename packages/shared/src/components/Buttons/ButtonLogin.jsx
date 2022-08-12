import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Link from 'next/link';
import '../../styles/Buttons/ButtonLogin.css';

function ButtonLogin({
  type,
  color,
  text,
  href,
  click,
}) {
  return (
    <Link href={href}>
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
    </Link>
  );
}

ButtonLogin.defaultProps = {
  click: () => {},
};

ButtonLogin.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  click: PropTypes.func,
};

export default ButtonLogin;
