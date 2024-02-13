import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import {
  DataTable, DefaultModal, ButtonStyled,
} from '@siiges-ui/shared';
import institucionesColumns from '../../Tables/institucionesColumns';
// import { deleteInstitucion } from '../../../utils/institucionHandler';

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

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        title="Tabla Instituciones"
        rows={rows}
        columns={institucionesColumns(showModal)}
      />
      <DefaultModal open={modal} setOpen={hideModal} id={modalId} title="Eliminar Institución">
        <Typography>
          Desea eliminar la institución
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
                /* deleteInstitucion(
                  modalId.id,
                  handleDeleteClick,
                ); */
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
  ),
  session: PropTypes.shape({
    rol: PropTypes.string,
  }).isRequired,
};

InstitucionesTable.defaultProps = {
  instituciones: [] || undefined,
};
