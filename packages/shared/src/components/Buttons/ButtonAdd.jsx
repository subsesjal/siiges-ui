import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import '../../styles/buttons/ButtonAdd.css';

function ButtonAdd({
  text, onClick, type, disabled,
}) {
  return (
    <ButtonUnstyled className="buttonAdd" onClick={onClick} disabled={disabled}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {type === 'user' ? <PersonAddIcon /> : <AddIcon />}
        &nbsp;&nbsp;
        <Typography variant="body1">{text}</Typography>
      </div>
    </ButtonUnstyled>
  );
}

ButtonAdd.defaultProps = {
  onClick: () => {},
  type: 'user',
  disabled: false,
};

ButtonAdd.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ButtonAdd;
