import { Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function LayoutHeader({ title, subtitle }) {
  if (title !== '') {
    return (
      <>
        <Typography variant="h3">{title}</Typography>
        <Divider
          sx={{
            backgroundColor: 'orange',
            width: '30%',
            height: '3px',
          }}
        />
        {subtitle !== '' && <Typography variant="p">{subtitle}</Typography>}
      </>
    );
  }
}

LayoutHeader.defaultProps = {
  title: '',
  subtitle: '',
};

LayoutHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
