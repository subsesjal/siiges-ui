import React, { useState } from 'react';
import {
  ActionButtons, ButtonStyled, DataTable, DefaultModal,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

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
    renderCell: (params) => {
      const { modal, showModal, hideModal } = ModalState();
      return (
        <>
          <ActionButtons
            id={params.id}
            consultar={`/institucion/${params.row.institucion}/consultarPlantel/${params.id}`}
            editar={`/institucion/${params.row.institucion}/editarPlantel/${params.id}`}
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
                  onclick={() => {}}
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

export default function Planteles({ data, institucion }) {
  const rows = data.map((value) => ({
    institucion,
    id: value.id,
    domicilio: `${value.domicilio.calle} #${value.domicilio.numeroExterior}`,
    colonia: value.domicilio.colonia,
    municipio: value.domicilio.municipio.nombre,
    codigoPostal: value.domicilio.codigoPostal,
    claveCentroTrabajo: value.claveCentroTrabajo,
  }));

  return (
    <Grid container>
      <Grid item xs={9} sx={{ mt: '20px' }}>
        <Link href="/institucion/nuevoPlantel">
          <div>
            <ButtonStyled
              text="Nuevo Plantel"
              alt="Agregar Plantel"
              type="success"
            />
          </div>
        </Link>
      </Grid>
      <DataTable rows={rows} columns={columns} title="Planteles" />
    </Grid>
  );
}

Planteles.propTypes = {
  institucion: PropTypes.number.isRequired,
  data: PropTypes.arrayOf({
    id: PropTypes.number,
    nombre: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
  }).isRequired,
};
