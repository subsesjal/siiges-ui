import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function ListTitle({ text }) {
  let textValue = text;
  if (textValue === '') {
    textValue = ' ';
  }
  return (
    <ListItem disablePadding>
      <ListItemText primary={textValue} sx={{ textAlign: 'right' }} />
    </ListItem>
  );
}

ListTitle.propTypes = {
  text: PropTypes.string.isRequired,
};
