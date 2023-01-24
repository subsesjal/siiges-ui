import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import '../../styles/buttons/ButtonStyle.css';

export default function ButtonStyled({
  text, alt, type, design, onclick,
}) {
  return (
    <ButtonUnstyled
      className={`buttonaction button${design}`}
      onClick={onclick}
      type={type}
    >
      <span className="text">{text}</span>
      <span>{alt}</span>
    </ButtonUnstyled>
  );
}

ButtonStyled.defaultProps = {
  onclick: () => {},
  design: 'normal',
  type: 'button',
};

ButtonStyled.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  type: PropTypes.string,
  design: PropTypes.string,
  onclick: PropTypes.func,
};
