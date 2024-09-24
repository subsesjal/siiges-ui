import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import { Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import '../../styles/buttons/ButtonAdd.css';

export default function Button({
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
      default:
        return <AddIcon />;
    }
  };

  const buttonClass = `buttonAdd ${type === 'cancel' ? 'cancel' : ''}`;

  return (
    <Grid container justifyContent={justifyContent}>
      <Grid item>
        <ButtonUnstyled
          className={buttonClass}
          onClick={onClick}
          disabled={disabled}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {renderIcon()}
            &nbsp;&nbsp;
            <Typography variant="body1">{text}</Typography>
          </div>
        </ButtonUnstyled>
      </Grid>
    </Grid>
  );
}

Button.defaultProps = {
  onClick: () => {},
  type: 'user',
  disabled: false,
  align: 'left',
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['user', 'add', 'edit']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  align: PropTypes.string,
};
