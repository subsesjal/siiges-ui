import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';

import '../../styles/buttons/ButtonAdd.css';

export default function ButtonBaseIcons({
  text, onClick, type, disabled, align,
}) {
  const justifyContent = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }[align];

  const renderIcon = () => {
    switch (type) {
      case 'edit':
        return <EditIcon />;
      case 'user':
        return <PersonAddIcon />;
      case 'cancel':
        return <ArrowBackIosNewIcon />;
      case 'people':
        return <PeopleIcon />;
      case 'download':
        return <DownloadIcon />;
      case 'consult':
        return <SearchIcon />;
      default:
        return <AddIcon />;
    }
  };

  const buttonClass = `buttonAdd ${type === 'cancel' ? 'cancel' : ''}`;

  return (
    <Grid container justifyContent={justifyContent}>
      <Grid item>
        <Button
          className={buttonClass}
          onClick={onClick}
          disabled={disabled}
          variant="text"
          startIcon={renderIcon()}
        >
          <Typography
            variant="body1"
            style={{ textTransform: 'none' }}
          >
            {text}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

ButtonBaseIcons.defaultProps = {
  onClick: () => {},
  type: 'user',
  disabled: false,
  align: 'left',
};

ButtonBaseIcons.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};
