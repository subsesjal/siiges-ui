import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Stack, Tooltip } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditIcon from '@mui/icons-material/Edit';

function UsersActionIcons({ canEdit, onView, onEdit }) {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Consultar" placement="top">
        <IconButton aria-label="consultar" onClick={onView}>
          <VisibilityOutlinedIcon />
        </IconButton>
      </Tooltip>
      {canEdit && (
        <Tooltip title="Editar" placement="top">
          <IconButton aria-label="editar" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}

UsersActionIcons.defaultProps = {
  canEdit: false,
};

UsersActionIcons.propTypes = {
  canEdit: PropTypes.bool,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default React.memo(UsersActionIcons);
