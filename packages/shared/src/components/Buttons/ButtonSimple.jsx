import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Button } from '@mui/material';
import '../../styles/buttons/ButtonAdd.css';

export default function ButtonSimple({
  text, onClick, align, design, children,
}) {
  const justifyContent = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }[align] || 'flex-start';

  return (
    <Grid container justifyContent={justifyContent}>
      <Grid item>
        <Button
          onClick={onClick}
          className={`buttonAdd ${design}`}
          variant="text"
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
};

ButtonSimple.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  design: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
};
