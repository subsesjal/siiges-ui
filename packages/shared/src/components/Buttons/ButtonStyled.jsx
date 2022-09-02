import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import '../../styles/buttons/ButtonStyle.css';

export default function ButtonStyled({
  text,
  alt,
  type,
  onclick,
}) {
  return (
    <ButtonUnstyled className={`buttonaction button${type}`} onClick={onclick}>
      <span className="text">{text}</span>
      <span>{alt}</span>
    </ButtonUnstyled>
  );
}

ButtonStyled.defaultProps = {
  onclick: () => {},
  type: 'normal',
};

ButtonStyled.propTypes = {
  text: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  type: PropTypes.string,
  onclick: PropTypes.func,
};
