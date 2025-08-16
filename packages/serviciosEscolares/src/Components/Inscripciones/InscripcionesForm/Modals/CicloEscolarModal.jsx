import { Grid } from '@mui/material';
import {
  ButtonsForm,
  Context,
  DefaultModal,
  Input,
  Select,
  createRecord,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import nombresCiclos from '../../../../Utils/nombresCiclos';

export default function CicloEscolarModal({
  open,
  setOpen,
  programaId,
  fetchCiclosEscolares,
}) {
  const { setNoti } = useContext(Context);

  const [formCicloEscolar, setFormCicloEscolar] = useState({});
  useEffect(() => {
    if (programaId) {
      setFormCicloEscolar((prevForm) => ({
        ...prevForm,
        programaId: programaId.programaId,
      }));
    }
  }, [programaId, setFormCicloEscolar]);

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
            message: '¡Error al crear ciclo escolar!',
            type: 'error',
          });
        }
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `¡Error al crear ciclo escolar!: ${error.message}`,
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
            value={formCicloEscolar.nombre || ''}
            textValue
            onChange={handleFormCicloOnChange}
          />
        </Grid>
        <Grid item xs={8}>
          <Input
            id="descripcion"
            label="Descripción"
            name="descripcion"
            onChange={handleFormCicloOnChange}
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
  programaId: PropTypes.number.isRequired,
  fetchCiclosEscolares: PropTypes.func.isRequired,
};
