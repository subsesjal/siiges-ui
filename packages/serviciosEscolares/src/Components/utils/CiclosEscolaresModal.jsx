import { Grid } from '@mui/material';
import {
  DefaultModal,
  Input,
  Select,
  ButtonsForm,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React from 'react';
import updateCiclosEscolares from '@siiges-ui/serviciosescolares/src/Components/utils/updateCiclosEscolares';
import postCiclosEscolares from './PostCiclosEscolares';

const nombresCiclos = [
  { id: 1, nombre: '2015A' },
  { id: 2, nombre: '2015B' },
  { id: 3, nombre: '2015C' },
  { id: 4, nombre: '2016A' },
  { id: 5, nombre: '2016B' },
  { id: 6, nombre: '2016C' },
  { id: 7, nombre: '2017A' },
  { id: 8, nombre: '2017B' },
  { id: 9, nombre: '2017C' },
  { id: 10, nombre: '2018A' },
  { id: 11, nombre: '2018B' },
  { id: 12, nombre: '2018C' },
  { id: 13, nombre: '2019A' },
  { id: 14, nombre: '2019B' },
  { id: 15, nombre: '2019C' },
  { id: 16, nombre: '2020A' },
  { id: 17, nombre: '2020B' },
  { id: 18, nombre: '2020C' },
  { id: 19, nombre: '2021A' },
  { id: 20, nombre: '2021B' },
  { id: 21, nombre: '2021C' },
  { id: 22, nombre: '2022A' },
  { id: 23, nombre: '2022B' },
  { id: 24, nombre: '2022C' },
  { id: 25, nombre: '2023A' },
  { id: 26, nombre: '2023B' },
  { id: 27, nombre: '2023C' },
  { id: 28, nombre: '2024A' },
  { id: 29, nombre: '2024B' },
  { id: 30, nombre: '2024C' },
  { id: 31, nombre: '2025A' },
];

export default function CiclosEscolaresModal({
  open,
  setOpen,
  type,
  data,
  onSuccess,
}) {
  const title = type === 'new' ? 'Agregar Ciclo Escolar' : 'Modificar Ciclo Escolar';

  const [form, setForm] = React.useState({
    id: data?.id,
    nombre: data?.nombre,
    descripcion: data?.descripcion,
  });

  const pathCiclosEscolares = async ({ id, ...body }) => {
    if (type === 'new') {
      await postCiclosEscolares({ ...body, programaId: data?.programaId }, onSuccess);
      setOpen(false);
    } else {
      await updateCiclosEscolares({ id, dataBody: body }, onSuccess);
      setOpen(false);
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
            options={nombresCiclos || []}
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
