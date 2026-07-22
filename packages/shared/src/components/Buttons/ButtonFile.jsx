import { Button } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonFile({ url, children, onClick }) {
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
      onClick={onClick || (() => window.open(url, '_blank'))}
      endIcon={<FileOpenIcon />}
    >
      {children}
    </Button>
  );
}

ButtonFile.defaultProps = {
  url: '',
  onClick: null,
};

ButtonFile.propTypes = {
  onClick: PropTypes.func,
  url: PropTypes.string,
  children: PropTypes.node.isRequired,
};
