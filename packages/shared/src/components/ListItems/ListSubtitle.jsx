import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function ListSubtitle({ text, margin }) {
  let textValue = text;
  if (textValue === '') {
    textValue = '...';
  }
  return (
    <ListItem disablePadding>
      <ListItemText secondary={textValue} sx={{ mt: margin }} />
    </ListItem>
  );
}

ListSubtitle.defaultProps = {
  text: '',
  margin: 1,
};

ListSubtitle.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.number,
};
