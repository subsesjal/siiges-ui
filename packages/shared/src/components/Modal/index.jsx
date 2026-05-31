import React from 'react';
import { Modal, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Title } from '@siiges-ui/shared';

const SIZE_MAP = {
  sm: 500,
  md: 800,
  lg: 1000,
  xl: 1200,
};

export default function DefaultModal({
  open,
  setOpen,
  children,
  title,
  disableBackdropClick,
  size,
}) {
  const handleClose = (event, reason) => {
    if (!disableBackdropClick || reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: SIZE_MAP[size] || SIZE_MAP.md,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={disableBackdropClick ? handleClose : () => setOpen(false)}
      aria-labelledby="modal-confirmación"
      aria-describedby="modal-confirmación-asignación-inspectores"
    >
      <Box sx={style}>
        <div id="modal-confirmación">
          <Title title={title} />
        </div>
        <Box sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}

DefaultModal.defaultProps = {
  open: false,
  title: null,
  disableBackdropClick: false,
  size: 'md',
};

DefaultModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  disableBackdropClick: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};
