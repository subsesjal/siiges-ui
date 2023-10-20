import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3.25),
  justifyContent: 'flex-start',
  textAlign: 'left',
  width: '100%',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTypography-root': {
    color: theme.palette.grey[800],
    marginLeft: theme.spacing(1.25),
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.grey[800],
    marginRight: theme.spacing(1),
  },
}));

function DropdownButton({ icon, text, options }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={icon}
      >
        <Typography variant="body1">{text}</Typography>
      </StyledButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option.text} onClick={handleClose}>
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DropdownButton;

DropdownButton.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
