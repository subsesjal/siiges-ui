import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Button } from '@mui/material';
import '../../styles/buttons/ButtonAdd.css';

export default function ButtonSimple({
  text, onClick, align, design, children, disabled, fullWidth,
}) {
  const justifyContent = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }[align] || 'flex-start';

  return (
    <Grid container justifyContent={justifyContent}>
      <Grid item sx={{ width: fullWidth ? '100%' : 'auto' }}>
        <Button
          onClick={onClick}
          className={`buttonAdd ${design}`}
          variant="text"
          disabled={disabled}
          fullWidth={fullWidth}
        >
          <Typography variant="body1" style={{ textTransform: 'none' }}>
            {text}
          </Typography>
          {children}
        </Button>
      </Grid>
    </Grid>
  );
}

ButtonSimple.defaultProps = {
  align: 'left',
  design: 'guardar',
  onClick: () => {},
  children: null,
  disabled: false,
  fullWidth: false,
};

ButtonSimple.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  design: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
};
