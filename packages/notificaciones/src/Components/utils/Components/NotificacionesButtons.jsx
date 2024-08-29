import { IconButton, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { NotificacionesModal } from '@siiges-ui/notificaciones';
import { getData } from '@siiges-ui/shared';

export default function NotificacionesButtons({ id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [notificacionData, setNotificacionData] = useState(null);

  const handleModalOpen = async () => {
    // Hacer la petición al endpoint cuando se abra el modal
    const { data, statusCode, errorMessage } = await getData({ endpoint: `/notificaciones/${id}` });

    if (statusCode === 200) {
      setNotificacionData({
        asunto: data.asunto,
        notificacion: data.data,
      });
      setModalOpen(true); // Abrir el modal solo cuando se tengan los datos
    } else {
      console.error(`Error fetching data: ${errorMessage}`);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNotificacionData(null); // Limpiar los datos cuando se cierre el modal
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="consultar" onClick={handleModalOpen}>
        <DescriptionIcon />
      </IconButton>

      {modalOpen && (
        <NotificacionesModal
          hideModal={handleModalClose}
          open={modalOpen}
          notificacionData={notificacionData} // Pasar los datos al modal
        />
      )}
    </Stack>
  );
}

NotificacionesButtons.propTypes = {
  id: PropTypes.number.isRequired,
};
