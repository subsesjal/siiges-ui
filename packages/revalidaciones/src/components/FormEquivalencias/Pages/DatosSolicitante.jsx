import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

const estados = [{ id: 14, nombre: 'Jalisco' }, { id: 15, nombre: 'Colima' }];

export default function DatosSolicitante({ form, handleOnChange }) {
  const [municipios, setMunicipios] = useState([]);
  const [estadoId, setEstadoId] = useState(null);
  const [municipiosDisabled, setMunicipiosDisabled] = useState(true);

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (estadoId) {
        try {
          const response = await fetch(`${domain}/api/v1/public/municipios/?estadoId=${estadoId}`, {
            headers: {
              api_key: apiKey,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          const filteredMunicipios = data.data.filter(
            (municipio) => municipio.estadoId === parseInt(estadoId, 10),
          );
          setMunicipios(filteredMunicipios);
        } catch (error) {
          console.error('¡Error al buscar municipios!:', error);
        }
      }
    };

    fetchMunicipios();
  }, [estadoId]);

  const handleEstadoChange = (event) => {
    const selectedEstadoId = event.target.value;
    setEstadoId(selectedEstadoId);
    setMunicipiosDisabled(!selectedEstadoId);
    handleOnChange(event);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>Trámite de Equivalencia</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Tipo de Solicitud"
          options={[]}
          name="tipoSolicitud"
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Grado Académico"
          options={[]}
          name="gradoAcademico"
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Datos del Solicitante</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input
          id="curp"
          label="CURP"
          name="curp"
          value={form.curp || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="nombre"
          label="Nombre"
          name="nombre"
          value={form.nombre || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="primerApellido"
          label="Primer Apellido"
          name="primerApellido"
          value={form.primerApellido || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="segundoApellido"
          label="Segundo Apellido"
          name="segundoApellido"
          value={form.segundoApellido || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <InputDate
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          value={form.fechaNacimiento || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Dirección</Subtitle>
      </Grid>
      <Grid item xs={9}>
        <Input
          name="calle"
          id="calle"
          label="Calle"
          value={form.calle || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="numero"
          id="numero"
          label="Número"
          value={form.numero || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="colonia"
          id="colonia"
          label="Colonia"
          value={form.colonia || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Estados"
          name="estadoId"
          options={estados}
          value={form.estadoId || ''}
          onChange={handleEstadoChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Municipio"
          name="municipioId"
          options={municipios}
          disabled={municipiosDisabled}
          value={form.municipioId || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="codigoPostal"
          id="codigoPostal"
          label="Código Postal"
          value={form.codigoPostal || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Contacto</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input
          name="correo"
          id="correo"
          label="Correo de Contacto"
          value={form.correo || ''}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="telefono"
          id="telefono"
          label="Teléfono de Contacto"
          value={form.telefono || ''}
          onChange={handleOnChange}
        />
      </Grid>
    </Grid>
  );
}

DatosSolicitante.propTypes = {
  form: PropTypes.shape({
    curp: PropTypes.string,
    nombre: PropTypes.string,
    primerApellido: PropTypes.string,
    segundoApellido: PropTypes.string,
    fechaNacimiento: PropTypes.string,
    calle: PropTypes.string,
    numero: PropTypes.string,
    colonia: PropTypes.string,
    estadoId: PropTypes.string,
    municipioId: PropTypes.string,
    codigoPostal: PropTypes.string,
    correo: PropTypes.string,
    telefono: PropTypes.string,
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
};
