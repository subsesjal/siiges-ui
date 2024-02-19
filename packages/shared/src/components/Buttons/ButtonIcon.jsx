import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

const CustomButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: `1px solid ${'#0072CE'}`,
  borderRadius: '20px',
  color: '#0072CE',
  textTransform: 'none',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: '#0072CE',
    color: '#ffffff',
    '& .MuiSvgIcon-root': {
      fill: '#ffffff',
    },
  },
  '&.Mui-disabled': {
    borderColor: theme.palette.grey[400],
  },
}));

function ButtonIcon({
  onClick, text, icon, disabled,
}) {
  return (
    <CustomButtonStyled
      sx={{ marginTop: 1 }}
      startIcon={icon}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </CustomButtonStyled>
  );
}

export default ButtonIcon;

ButtonIcon.defaultProps = {
  onClick: () => {},
  disabled: false,
};

ButtonIcon.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
