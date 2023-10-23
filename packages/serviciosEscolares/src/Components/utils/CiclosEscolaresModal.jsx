import { Grid } from '@mui/material';
import {
  ButtonStyled,
  DefaultModal,
  Input,
  LabelData,
} from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';
import updateCiclosEscolares from '@siiges-ui/serviciosescolares/src/Components/utils/updateCiclosEscolares';

export default function CiclosEscolaresModal({
  open,
  setOpen,
  type,
  data,
}) {
  const title = type === 'new' ? 'Agregar Ciclo Escolar' : 'Editar Ciclo Escolar';
  const [form, setForm] = React.useState({
    id: data?.id,
    nombre: data?.nombre,
    descripcion: data?.descripcion,
  });

  const pathCiclosEscolares = async ({ id, ...body }) => {
    const dato = await updateCiclosEscolares({ id, dataBody: body });
    setForm({ ...form, nombre: dato.nombre, descripcion: dato.descripcion });
    setOpen(false);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <DefaultModal open={open} setOpen={setOpen} title={title}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <LabelData title="ID" subtitle={data?.id} />
        </Grid>
        <Grid item xs={3}>
          <LabelData title="Programa ID" subtitle={data?.programaId} />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={4}>
          <Input
            id="nombre"
            label="Nombre de ciclo escolar"
            name="nombre"
            auto="nombre"
            onchange={handleOnChange}
            value={form?.nombre}
          />
        </Grid>
        <Grid item xs={8}>
          <Input
            id="descripcion"
            label="Descripción"
            name="descripcion"
            auto="descripcion"
            onchange={handleOnChange}
            value={form?.descripcion}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <Grid item xs={2}>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={() => setOpen(false)}
          />
        </Grid>
        <Grid item xs={2}>
          <ButtonStyled
            text="Confirmar"
            alt="Confirmar"
            onclick={() => {
              pathCiclosEscolares(form);
            }}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

CiclosEscolaresModal.propTypes = {
  type: PropTypes.string.isRequired,
  setOpen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    programaId: PropTypes.number,
    turno: PropTypes.string,
    modalidad: PropTypes.string,
    periodo: PropTypes.string,
    creditos: PropTypes.string,
    objetivoGeneral: PropTypes.string,
    objetivosParticulares: PropTypes.string,
    fechaSurteEfecto: PropTypes.string,
    duracionPeriodos: PropTypes.string,
  }).isRequired,
};
