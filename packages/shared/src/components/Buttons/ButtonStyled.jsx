import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import '../../styles/ButtonStyle.css';

export default function ButtonStyled({ text, alt, type }) {
  return (
    <ButtonUnstyled className={`buttonaction button${type}`}>
      <span className="text">{text}</span>
      <span>{alt}</span>
    </ButtonUnstyled>
  );
}

ButtonStyled.defaultProps = {
  type: 'normal',
};

ButtonStyled.propTypes = {
  text: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  type: PropTypes.string,
};
