import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import '../../styles/buttons/ButtonAdd.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography } from '@mui/material';

export default function ButtonAdd({ text }) {
  return (
    <ButtonUnstyled className="buttonAdd">
      <PersonAddIcon sx={{ verticalAlign: 'middle' }} />
      &nbsp;&nbsp;
      <Typography variant="p" sx={{ verticalAlign: 'middle' }}>{text}</Typography>
    </ButtonUnstyled>
  );
}

ButtonAdd.propTypes = {
  text: PropTypes.string.isRequired,
};
