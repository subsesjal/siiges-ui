import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function ListSubtitle({ text }) {
  let textValue = text;
  if (textValue === '') {
    textValue = '...';
  }
  return (
    <ListItem disablePadding>
      <ListItemText secondary={textValue} sx={{ mt: 1 }} />
    </ListItem>
  );
}

ListSubtitle.propTypes = {
  text: PropTypes.string.isRequired,
};
