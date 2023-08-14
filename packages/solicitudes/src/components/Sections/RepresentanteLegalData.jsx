import { Grid, Typography } from '@mui/material';
import { Input, InputFile, getCurrentUser } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import getMunicipios from '@siiges-ui/instituciones/src/components/utils/getMunicipios';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import DatosGeneralesContext from '../utils/Context/datosGeneralesContext';
import formDatosRepresentante from '../utils/sections/forms/formDatosRepresentante';

function RepresentanteLegalData({ id }) {
  const { municipios } = getMunicipios();
  const { user } = getCurrentUser();
  let options = [];
  if (municipios) {
    options = municipios.data.filter((municipio) => municipio.estadoId === 14);
  }

  const {
    disabled, setDisabled, form, setForm,
  } = useContext(
    DatosGeneralesContext,
  );

  useEffect(() => {
    if (id !== undefined) {
      setDisabled(false);
    }
    if (user) {
      setForm((prevForm) => ({
        ...prevForm,
        2: {
          ...prevForm[2],
          id: user.id,
        },
      }));
    }
  }, [id, user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formDatosRepresentante(name, value, form, setForm, 2);
  };

  const handleFileUrl = (url) => {
    setForm((prevForm) => ({
      ...prevForm,
      2: {
        ...prevForm[2],
        fileUrl: url,
      },
    }));
  };

  if (!user) {
    return null;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de Representante legal</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input
            id="nombre"
            label="Nombre(s)"
            name="nombre"
            auto="nombre"
            value={user?.persona?.nombre}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="apellidoPaterno"
            label="Primer Apellido"
            name="apellidoPaterno"
            auto="apellidoPaterno"
            value={user?.persona?.apellidoPaterno}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="apellidoMaterno"
            label="Segundo Apellido"
            name="apellidoMaterno"
            auto="apellidoMaterno"
            value={user?.persona?.apellidoMaterno}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nacionalidad"
            label="Nacionalidad"
            name="nacionalidad"
            auto="nacionalidad"
            value={user?.persona?.nacionalidad}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="calle"
            label="Calle"
            name="calle"
            auto="calle"
            value={user?.persona?.domicilio?.calle}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="numeroExterior"
            label="Numero exterior"
            name="numeroExterior"
            auto="numeroExterior"
            value={user?.persona?.domicilio?.numeroExterior}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="numeroInterior"
            label="Numero interior"
            name="numeroInterior"
            auto="numeroInterior"
            value={user?.persona?.domicilio?.numeroInterior}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="colonia"
            label="Colonia"
            name="colonia"
            auto="colonia"
            value={user?.persona?.domicilio?.colonia}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="codigoPostal"
            label="Codigo Postal"
            name="codigoPostal"
            auto="codigoPostal"
            value={user?.persona?.domicilio?.codigoPostal}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={3}>
          <BasicSelect
            title="Municipio"
            name="municipioId"
            value={user?.persona?.domicilio?.municipio?.id}
            options={options}
            onchange={handleOnChange}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="correo"
            label="Correo"
            name="correo"
            auto="correo"
            value={user?.correo}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="telefono"
            label="Telefono"
            name="telefono"
            auto="telefono"
            value={user?.persona?.telefono}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="celular"
            label="Celular"
            name="celular"
            auto="celular"
            value={user?.persona?.celular}
            disabled={disabled}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="REPRESENTANTE"
            tipoDocumento="FIRMA_REPRESENTANTE"
            id={id}
            label="Subir firma"
            setUrl={handleFileUrl}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

RepresentanteLegalData.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])])
    .isRequired,
};

export default RepresentanteLegalData;
