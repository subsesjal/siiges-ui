import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import {
  DataTable, formattedDate, DefaultModal, ButtonStyled,
} from '@siiges-ui/shared';
import { commonColumns, adminColumns } from '../../Tables/usuariosTable';
import { deleteUsuario } from '../../../utils/usuarioHandler';

const statusMapping = { 0: 'Desactivado', 1: 'Activado' };

const formattedRows = (usuarios) => usuarios.map((usuario) => ({
  id: usuario.id,
  nombre: `${usuario.persona.nombre} ${usuario.persona.apellidoPaterno}`,
  usuario: usuario.usuario,
  correo: usuario.correo,
  rol: usuario.rol.descripcion,
  fecha: formattedDate(usuario.createdAt),
  estatus: statusMapping[usuario.estatus],
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

export default function UsuariosTable({ usuarios, session }) {
  const { rol } = session;
  const [rows, setRows] = useState([]);
  const router = useRouter();

  const {
    modal, showModal, hideModal, modalId,
  } = ModalState();

  useEffect(() => {
    if (usuarios && usuarios.length) {
      const tableRows = formattedRows(usuarios, rol);
      setRows(tableRows);
    }
  }, [usuarios]);

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        title="Tabla Usuarios"
        rows={rows}
        columns={rol === 'admin' ? adminColumns(showModal) : commonColumns(showModal)}
        buttonAdd
        buttonText="Agregar Usuario"
        buttonType="add"
        buttonClick={() => {
          router.push('/usuarios/crear');
        }}
      />
      <DefaultModal open={modal} setOpen={hideModal} id={modalId} title="Eliminar Usuario">
        <Typography>
          ¿Desea eliminar el usuario,
          {' '}
          {modalId && modalId.row.usuario}
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
                deleteUsuario(
                  modalId.id,
                  handleDeleteClick,
                );
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

UsuariosTable.propTypes = {
  usuarios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      usuario: PropTypes.string.isRequired,
      correo: PropTypes.string.isRequired,
    }),
  ).isRequired,

  session: PropTypes.shape({
    rol: PropTypes.string,
  }).isRequired,
};
