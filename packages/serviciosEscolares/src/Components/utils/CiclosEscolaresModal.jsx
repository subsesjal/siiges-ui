import { Grid } from '@mui/material';
import {
  DefaultModal,
  Input,
  Select,
  ButtonsForm,
  Context,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import updateCiclosEscolares from '@siiges-ui/serviciosescolares/src/Components/utils/updateCiclosEscolares';
import postCiclosEscolares from './PostCiclosEscolares';
import nombresCiclos from '../../Utils/nombresCiclos';

export default function CiclosEscolaresModal({
  open,
  setOpen,
  type,
  data,
  onSuccess,
}) {
  const title = type === 'new' ? 'Agregar Ciclo Escolar' : 'Modificar Ciclo Escolar';
  const { setNoti } = useContext(Context);
  const ciclosFiltered = nombresCiclos;

  const [form, setForm] = React.useState({
    id: data?.id,
    nombre: data?.nombre,
    descripcion: data?.descripcion,
  });

  const pathCiclosEscolares = async ({ id, ...body }) => {
    try {
      if (type === 'new') {
        await postCiclosEscolares({ ...body, programaId: data?.programaId }, onSuccess);
        setOpen(false);
      } else {
        await updateCiclosEscolares({ id, dataBody: body }, onSuccess);
        setOpen(false);
      }
    } catch (error) {
      setNoti({
        open: true,
        message: `Error al ${type === 'new' ? 'crear' : 'actualizar'} el ciclo escolar: ${error.message}`,
        type: 'error',
      });
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <DefaultModal open={open} setOpen={setOpen} title={title}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Select
            title="Nombre"
            name="nombre"
            options={ciclosFiltered || []}
            textValue
            onChange={handleOnChange}
            value={form?.nombre}
          />
        </Grid>
        <Grid item xs={8}>
          <Input
            id="descripcion"
            label="Descripción"
            name="descripcion"
            auto="descripcion"
            onChange={handleOnChange}
            value={form?.descripcion}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <ButtonsForm
            confirm={() => {
              pathCiclosEscolares(form);
            }}
            cancel={() => setOpen(false)}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

CiclosEscolaresModal.propTypes = {
  type: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
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
