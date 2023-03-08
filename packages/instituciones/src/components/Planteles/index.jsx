import React, { useState } from 'react';
import {
  ActionButtons,
  ButtonStyled,
  DataTable,
  DefaultModal,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import deletePlantel from '../utils/deletePlantel';

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

export default function Planteles({ data, institucion }) {
  const router = useRouter();
  const {
    modal, showModal, hideModal, modalId,
  } = ModalState();

  const [rows, setRows] = useState(
    data.map((value) => ({
      institucion,
      id: value.id,
      domicilio: `${value.domicilio.calle} #${value.domicilio.numeroExterior}`,
      colonia: value.domicilio.colonia,
      municipio: value.domicilio.municipio.nombre,
      codigoPostal: value.domicilio.codigoPostal,
      claveCentroTrabajo: value.claveCentroTrabajo,
    })),
  );

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: 'domicilio', headerName: 'Domicilio', width: 240 },
    { field: 'colonia', headerName: 'Colonia', width: 240 },
    { field: 'municipio', headerName: 'Municipio', width: 140 },
    { field: 'codigoPostal', headerName: 'Codigo Postal', width: 130 },
    {
      field: 'claveCentroTrabajo',
      headerName: 'Clave centro de trabajo',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.claveCentroTrabajo ? (
            <ActionButtons
              id={params.id}
              consultar={`/institucion/${params.row.institucion}/consultarPlantel/${params.id}`}
            />
          ) : (
            <ActionButtons
              id={params.id}
              consultar={`/institucion/${params.row.institucion}/consultarPlantel/${params.id}`}
              editar={`/institucion/${params.row.institucion}/editarPlantel/${params.id}`}
              eliminar={() => showModal(params.id)}
            />
          )}
          <DefaultModal open={modal} setOpen={hideModal} id={modalId}>
            <Typography>Desea eliminar este plantel?</Typography>
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
                    deletePlantel(
                      params.row.institucion,
                      modalId,
                      handleDeleteClick,
                    );
                  }}
                >
                  Confirmar
                </ButtonStyled>
              </Grid>
            </Grid>
          </DefaultModal>
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Grid container>
      <Grid item xs={9} sx={{ mt: '20px' }}>
        <ButtonStyled
          text="Nuevo Plantel"
          alt="Agregar Plantel"
          type="success"
          onclick={() => {
            router.push(`/institucion/${institucion}/nuevoPlantel`);
          }}
        />
      </Grid>
      <DataTable rows={rows} columns={columns} title="Planteles" />
    </Grid>
  );
}

Planteles.propTypes = {
  institucion: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      claveCentroTrabajo: PropTypes.string,
      domicilio: PropTypes.shape({
        id: PropTypes.number,
        calle: PropTypes.string,
        numeroExterior: PropTypes.string,
        colonia: PropTypes.string,
        codigoPostal: PropTypes.number,
        municipio: PropTypes.shape({
          id: PropTypes.number,
          nombre: PropTypes.string,
        }),
      }),
    }),
  ).isRequired,
};
