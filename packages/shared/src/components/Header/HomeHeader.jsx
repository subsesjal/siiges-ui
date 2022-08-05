import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function HomeHeader({ title, body }) {
  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        {title}
      </Typography>
      <Typography>
        {body}
      </Typography>
    </>
  );
}

HomeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
