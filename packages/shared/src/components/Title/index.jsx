import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function Title({ title, subtitle }) {
  if (title !== '') {
    return (
      <>
        <Typography variant="h3" sx={{ textDecoration: 'underline', textDecorationColor: 'orange' }}>{title}</Typography>
        {subtitle !== '' && <Typography variant="p">{subtitle}</Typography>}
      </>
    );
  }
}

Title.defaultProps = {
  title: '',
  subtitle: '',
};

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
