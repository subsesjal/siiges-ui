import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { Button, Input } from '@siiges-ui/shared';
import React, { useContext, useState, useEffect } from 'react';
import columns from './Mocks/AsignaturasFormacionElectiva';
import { TablesPlanEstudiosContext } from '../utils/Context/tablesPlanEstudiosProviderContext';
import AsignaturasFormacionCreateModal from '../utils/Components/AsignaturasFormacionModales/AsignaturasFormacionCreateModal';
import SolicitudContext from '../utils/Context/solicitudContext';
import errorFormacionElectiva from '../utils/sections/errors/errorFormacionElectiva';
import formPrograma from '../utils/sections/forms/formPrograma';

export default function AsignaturasFormacionElectiva({ disabled }) {
  const [modal, setModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const {
    form, setForm, error, setError, setErrors,
  } = useContext(SolicitudContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formPrograma(name, value, setForm, 7);
  };

  const errors = errorFormacionElectiva(form, setError, error);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errors[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (errors !== undefined) {
      setErrors(errors);
    }
  }, [error]);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const { asignaturasFormacionList, setAsignaturasFormacionList } = useContext(
    TablesPlanEstudiosContext,
  );

  const tableColumns = columns(
    setAsignaturasFormacionList,
    asignaturasFormacionList,
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Asignaturas formación electiva</Typography>
      </Grid>
      <Grid item xs={3}>
        {!disabled && <Button onClick={showModal} text="agregar" />}
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={asignaturasFormacionList}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
      <Grid item xs={9}>
        <Input
          id="minimoHorasOptativas"
          label="Numero de horas minimas que se deberan acreditar bajo la conduccion de un docente"
          name="minimoHorasOptativas"
          auto="minimoHorasOptativas"
          onchange={handleOnChange}
          onblur={handleOnBlur}
          onfocus={handleInputFocus}
          value={form[7].programa?.minimoHorasOptativas}
          errorMessage={error.minimoHorasOptativas}
          required
        />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="minimoCreditosOptativas"
          label="Numero minimo de creditos que se deberan acreditar"
          name="minimoCreditosOptativas"
          auto="minimoCreditosOptativas"
          onchange={handleOnChange}
          onblur={handleOnBlur}
          onfocus={handleInputFocus}
          value={form[7].programa?.minimoCreditosOptativas}
          errorMessage={error.minimoCreditosOptativas}
          required
        />
      </Grid>
      <AsignaturasFormacionCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Crear Asignatura"
      />
    </Grid>
  );
}

AsignaturasFormacionElectiva.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
