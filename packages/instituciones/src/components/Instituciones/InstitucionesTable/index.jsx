import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import {
  DataTable, DefaultModal, ButtonStyled, getData, deleteRecord,
} from '@siiges-ui/shared';
import institucionesColumns from '../../Tables/institucionesColumns';

const formattedRows = (instituciones) => instituciones.map((institucion) => ({
  id: institucion.id,
  nombre: institucion.nombre,
  razonSocial: institucion.razonSocial,
  claveIes: institucion.claveIes,
  actions: 'Actions Placeholder',
}));

function ModalState() {
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState();

  const showModal = (id) => {
    setModalId(id);
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
  };

  return {
    modal,
    showModal,
    hideModal,
    modalId,
  };
}

export default function InstitucionesTable({ instituciones, session }) {
  const { rol } = session;
  const [rows, setRows] = useState([]);

  const {
    modal, showModal, hideModal, modalId,
  } = ModalState();

  useEffect(() => {
    if (instituciones && instituciones.length) {
      const tableRows = formattedRows(instituciones, rol);
      setRows(tableRows);
    }
  }, [instituciones]);

  const handleDeleteClick = async (id) => {
    try {
      console.log(id);
      // Verificar si la institución tiene solicitudes activas
      const endpoint = '/solicitudes';
      const query = `?usuarioId=${id}&estatusSolicitudId=11`;
      const response = await getData({ endpoint, query });

      if (response.statusCode !== 200) {
        throw new Error(response.errorMessage || 'Error en la solicitud al servidor');
      }

      if (response.data.length > 0) {
        alert('No se puede eliminar la institución porque tiene solicitudes activas.');
        return; // No eliminar si tiene solicitudes activas
      }

      // Si no tiene solicitudes activas, proceder a eliminar
      const deleteEndpoint = `/instituciones/${id}`;
      await deleteRecord({ endpoint: deleteEndpoint });

      // Filtrar la fila eliminada del estado
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error al eliminar la institución:', error.message);
    }
  };

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        title="Tabla Instituciones"
        rows={rows}
        columns={institucionesColumns((id) => {
          showModal(id);
        })}
      />
      <DefaultModal open={modal} setOpen={hideModal} id={modalId} title="Eliminar Institución">
        <Typography>
          ¿Desea eliminar la institución
          {' '}
          ?
        </Typography>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <ButtonStyled
              text="Cancelar"
              alt="Cancelar"
              onclick={hideModal}
            >
              Cancelar
            </ButtonStyled>
          </Grid>
          <Grid item>
            <ButtonStyled
              text="Confirmar"
              alt="Confirmar"
              design="error"
              onclick={() => {
                hideModal();
                handleDeleteClick(instituciones[0]);
              }}
            >
              Confirmar
            </ButtonStyled>
          </Grid>
        </Grid>
      </DefaultModal>
    </Grid>
  );
}

InstitucionesTable.propTypes = {
  instituciones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      usuario: PropTypes.string.isRequired,
      correo: PropTypes.string.isRequired,
    }),
  ).isRequired,
  session: PropTypes.shape({
    rol: PropTypes.string.isRequired,
  }).isRequired,
};
