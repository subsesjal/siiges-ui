import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import '../../styles/buttons/ButtonAdd.css';

export default function ButtonSimple({
  text, onClick, align, design,
}) {
  const justifyContent = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }[align] || 'flex-start';

  return (
    <Grid container justifyContent={justifyContent}>
      <Grid item>
        <ButtonUnstyled className={`buttonAdd ${design}`} onClick={onClick}>
          <Typography variant="body1">{text}</Typography>
        </ButtonUnstyled>
      </Grid>
    </Grid>
  );
}

ButtonSimple.defaultProps = {
  align: 'left',
  design: 'guardar',
  onClick: () => {},
};

ButtonSimple.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  design: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};
