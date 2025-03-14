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
        height: '40px',
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

ButtonFile.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
