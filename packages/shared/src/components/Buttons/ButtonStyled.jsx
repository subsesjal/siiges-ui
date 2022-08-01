import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import '../../Styles/ButtonStyle.css';

export default function ButtonStyled({ text, alt }) {
  return (
    <ButtonUnstyled className="button-57">
      <span className="text">{text}</span>
      <span>{alt}</span>
    </ButtonUnstyled>
  );
}

ButtonStyled.propTypes = {
  text: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
