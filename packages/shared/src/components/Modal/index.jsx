import React from 'react';
import { Modal, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Title } from '@siiges-ui/shared';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function DefaultModal({
  open,
  setOpen,
  children,
  title,
  disableBackdropClick,
}) {
  const handleClose = (event, reason) => {
    if (!disableBackdropClick || reason !== 'backdropClick') {
      setOpen(false);
    }
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
};

DefaultModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  disableBackdropClick: PropTypes.bool,
};
