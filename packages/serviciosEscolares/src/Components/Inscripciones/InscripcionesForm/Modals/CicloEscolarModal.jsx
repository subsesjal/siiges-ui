import { Grid } from '@mui/material';
import {
  ButtonsForm,
  Context,
  DefaultModal,
  Input,
  Select,
  createRecord,
} from '@siiges-ui/shared';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

export default function CicloEscolarModal({
  open,
  setOpen,
  formCicloEscolar,
  setFormCicloEscolar,
  fetchCiclosEscolares,
}) {
  const { setNoti } = useContext(Context);
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
  ];

  const handleFormCicloOnChange = (event) => {
    const { name, value } = event.target;
    setFormCicloEscolar((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCicloSubmit = () => {
    createRecord({
      data: formCicloEscolar,
      endpoint: '/ciclosEscolares',
    })
      .then((response) => {
        if (response.statusCode === 201) {
          setNoti({
            open: true,
            message: '¡Ciclo escolar creado exitosamente!',
            type: 'success',
          });
          setFormCicloEscolar({ programaId: formCicloEscolar.programaId });
          fetchCiclosEscolares(formCicloEscolar.programaId);
          setOpen(false);
        } else {
          setNoti({
            open: true,
            message: 'Error al crear ciclo escolar',
            type: 'error',
          });
        }
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `Error al crear ciclo escolar: ${error.message}`,
          type: 'error',
        });
      });
  };
  return (
    <DefaultModal title="Crear ciclo escolar" open={open} setOpen={setOpen}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Select
            title="Nombre"
            name="nombre"
            options={nombresCiclos || []}
            value=""
            textValue
            onchange={handleFormCicloOnChange}
          />
        </Grid>
        <Grid item xs={8}>
          <Input
            id="descripcion"
            label="Descripción"
            name="descripcion"
            onchange={handleFormCicloOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm
            confirm={handleCicloSubmit}
            cancel={() => {
              setOpen(false);
            }}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

CicloEscolarModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  formCicloEscolar: PropTypes.shape({
    programaId: PropTypes.number.isRequired,
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
  }).isRequired,
  setFormCicloEscolar: PropTypes.func.isRequired,
  fetchCiclosEscolares: PropTypes.func.isRequired,
};
