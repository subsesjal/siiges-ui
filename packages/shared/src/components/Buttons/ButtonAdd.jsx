import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import '../../styles/buttons/ButtonAdd.css';

function ButtonAdd({ text, onClick, type }) {
  return (
    <ButtonUnstyled className="buttonAdd" onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {type === 'user' ? <PersonAddIcon /> : <AddIcon />}
        &nbsp;&nbsp;
        <Typography variant="body1">{text}</Typography>
      </div>
    </ButtonUnstyled>
  );
}

ButtonAdd.defaultProps = {
  onClick: () => {}, // Default empty function
  type: 'user',
};

ButtonAdd.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonAdd;
