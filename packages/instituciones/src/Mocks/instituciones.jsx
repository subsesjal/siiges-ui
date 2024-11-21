import React, { useState } from 'react';
import { ActionButtons, ButtonSimple, DefaultModal } from '@siiges-ui/shared';
import { Grid, Typography } from '@mui/material';
import deleteInstitucion from '../utils/deleteInstitucion';

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
  { field: 'nombre', headerName: 'Nombre', width: 300 },
  { field: 'razonSocial', headerName: 'Razón Social', width: 320 },
  {
    field: 'createdAt',
    headerName: 'Fecha',
    type: 'date',
    width: 180,
  },
  { field: 'claveIes', headerName: 'Clave Ies', width: 150 },
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
            consultar={`/institucion/${params.id}/consultarInstitucion`}
            editar={`/institucion/${params.id}/editarInstitucion`}
            eliminar={showModal}
          />
          <DefaultModal open={modal} setOpen={hideModal}>
            <Typography>¿Desea eliminar esta institución?</Typography>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <ButtonSimple
                  text="Cancelar"
                  design="cancel"
                  onClick={hideModal}
                >
                  Cancelar
                </ButtonSimple>
              </Grid>
              <Grid item>
                <ButtonSimple
                  text="Confirmar"
                  onClick={() => {
                    deleteInstitucion(params.id);
                  }}
                >
                  Confirmar
                </ButtonSimple>
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
