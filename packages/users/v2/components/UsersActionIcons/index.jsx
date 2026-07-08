import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Stack, Tooltip } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UsersActionIcons({
  canEdit,
  canDelete,
  onView,
  onEdit,
  onDelete,
}) {
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
      {canDelete && (
        <Tooltip title="Eliminar" placement="top">
          <IconButton aria-label="eliminar" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}

UsersActionIcons.defaultProps = {
  canEdit: false,
  canDelete: false,
  onDelete: () => {},
};

UsersActionIcons.propTypes = {
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(UsersActionIcons);
