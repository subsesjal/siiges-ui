import { Button } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonFile({ url, children }) {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{
        width: '100%',
        color: 'black',
        borderColor: 'black',
        '&:hover': {
          color: 'white',
          backgroundColor: 'black',
          borderColor: 'black',
        },
      }}
      onClick={() => window.open(url, '_blank')}
      endIcon={<FileOpenIcon />}
    >
      {children}
    </Button>
  );
}

// Prop validation
ButtonFile.propTypes = {
  url: PropTypes.string.isRequired, // url must be a string and is required
  children: PropTypes.node.isRequired,
};
