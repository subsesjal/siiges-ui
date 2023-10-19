import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

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

const ButtonIcon = ({ onClick, text, icon, disabled }) => {
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
};

export default ButtonIcon;
