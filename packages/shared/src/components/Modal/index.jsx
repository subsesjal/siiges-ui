import React from 'react';
import { Typography, Modal, Box } from '@mui/material';
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

export default function DefaultModal({ open, setOpen, children }) {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-confirmación"
      aria-describedby="modal-confirmación-asignación-inspectores"
    >
      <Box sx={style}>
        <Typography id="modal-confirmación" variant="h6" component="h2">
          <Title title="Confirmación" />
        </Typography>
        <Typography
          id="modal-confirmación-asignación-inspectores"
          sx={{ mt: 2 }}
        >
          {children}
        </Typography>
      </Box>
    </Modal>
  );
}

DefaultModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
