import React, { useState } from 'react';
import { ActionButtons, ButtonSimple, DefaultModal } from '@siiges-ui/shared';
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
      return (
        <>
          <ActionButtons
            id={params.id}
            consultar={`/usuarios/consultarUsuario/${params.id}`}
            editar={`/usuarios/editarUsuario/${params.id}`}
            eliminar={showModal}
          />
          <DefaultModal open={modal} setOpen={hideModal}>
            <Typography>¿Desea eliminar este usuario?</Typography>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <ButtonSimple
                  text="Cancelar"
                  design="cancel"
                  onClick={hideModal}
                />
              </Grid>
              <Grid item>
                <ButtonSimple
                  text="Confirmar"
                  onClick={() => {
                    deleteUser(params.id);
                  }}
                />
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
