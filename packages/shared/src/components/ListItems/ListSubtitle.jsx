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

ListSubtitle.defaultProps = {
  text: '',
};

ListSubtitle.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
