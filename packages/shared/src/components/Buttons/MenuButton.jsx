import React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import StyledMenu from '../../styles/Navbar/MenuButtonStyle';
import setHandler from '../../utils/handlers/set-anchor';

export default function MenuButton({ title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        id="menu-button"
        aria-controls={open ? 'styled-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={(event) => setHandler(setAnchorEl, event.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {title}
      </Button>
      <StyledMenu
        id="styled-menu"
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setHandler(setAnchorEl, null)}
      >
        <MenuItem onClick={() => setHandler(setAnchorEl, null)} disableRipple>
          <BusinessIcon />
          Mi institución
        </MenuItem>
        <MenuItem onClick={() => setHandler(setAnchorEl, null)} disableRipple>
          <DescriptionIcon />
          Mis solicitudes
        </MenuItem>
        <MenuItem onClick={() => setHandler(setAnchorEl, null)} disableRipple>
          <PersonIcon />
          Mis usuarios
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

MenuButton.propTypes = {
  title: PropTypes.string.isRequired,
};
