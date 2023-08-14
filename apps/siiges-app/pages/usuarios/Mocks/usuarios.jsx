import React, { useContext, useState } from 'react';
import {
  ActionButtons, ButtonStyled, DefaultModal, Context,
} from '@siiges-ui/shared';
import { Grid, Typography } from '@mui/material';
import deleteUser from '../utils/deleteUser';

function ModalState() {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
  };

  return {
    modal,
    showModal,
    hideModal,
  };
}

const columns = [
  { field: 'usuario', headerName: 'Usuario', width: 200 },
  { field: 'correo', headerName: 'Correo', width: 250 },
  { field: 'rol', headerName: 'Rol', width: 180 },
  {
    field: 'createdAt',
    headerName: 'Fecha',
    type: 'date',
    width: 180,
  },
  { field: 'estatus', headerName: 'Estatus', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => {
      const { modal, showModal, hideModal } = ModalState();
      const { session } = useContext(Context);
      return (
        <>
          <ActionButtons
            id={params.id}
            consultar={`/usuarios/consultarUsuario/${params.id}`}
            editar={`/usuarios/editarUsuario/${params.id}`}
            eliminar={showModal}
          />
          <DefaultModal open={modal} setOpen={hideModal}>
            <Typography>Desea eliminar este usuario?</Typography>
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
                    deleteUser(params.id, session.token);
                  }}
                >
                  Confirmar
                </ButtonStyled>
              </Grid>
            </Grid>
          </DefaultModal>
        </>
      );
    },
    sortable: false,
    filterable: false,
  },
];

export default columns;
