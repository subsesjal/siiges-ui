import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import '../../styles/buttons/ButtonAdd.css';

export default function Button({
  text, onClick, type, disabled,
}) {
  const renderIcon = () => {
    switch (type) {
      case 'edit':
        return <EditIcon />;
      case 'user':
        return <PersonAddIcon />;
      case 'cancel':
        return <ArrowBackIosNewIcon />;
      default:
        return <AddIcon />;
    }
  };

  const buttonClass = `buttonAdd ${type === 'cancel' ? 'cancel' : ''}`;

  return (
    <ButtonUnstyled className={buttonClass} onClick={onClick} disabled={disabled}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {renderIcon()}
        &nbsp;&nbsp;
        <Typography variant="body1">{text}</Typography>
      </div>
    </ButtonUnstyled>
  );
}

Button.defaultProps = {
  onClick: () => {},
  type: 'user',
  disabled: false,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['user', 'add', 'edit']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
