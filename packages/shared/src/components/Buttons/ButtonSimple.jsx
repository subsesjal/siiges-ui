import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import '../../styles/buttons/ButtonAdd.css';

export default function ButtonSimple({ text, onClick, align }) {
  const justifyContent = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }[align];

  return (
    <Grid container justifyContent={justifyContent}>
      <Grid item>
        <ButtonUnstyled className="buttonAdd guardar" onClick={onClick}>
          <Typography variant="body1">{text}</Typography>
        </ButtonUnstyled>
      </Grid>
    </Grid>
  );
}

ButtonSimple.defaultProps = {
  align: 'left',
};

ButtonSimple.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};
