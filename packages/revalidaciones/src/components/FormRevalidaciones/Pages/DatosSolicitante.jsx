import { Grid } from '@mui/material';
import {
  Input, Select, Subtitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

const tipoSolicitudes = [
  { id: 3, nombre: 'Parcial' },
  { id: 4, nombre: 'Total' },
  { id: 6, nombre: 'Duplicado' },
];

const grados = [
  { id: 1, nombre: 'Doctorado' },
  { id: 2, nombre: 'Especialidad' },
  { id: 3, nombre: 'Licenciatura' },
  { id: 4, nombre: 'Maestría' },
  { id: 5, nombre: 'Profesional Asociado' },
  { id: 6, nombre: 'Técnico Superior Universitario' },
];

export default function DatosSolicitante({ form, handleOnChange, estados }) {
  const [municipios, setMunicipios] = useState([]);
  const [estadoId, setEstadoId] = useState(form.interesado.persona.domicilio.estadoId || '');
  const [municipiosDisabled, setMunicipiosDisabled] = useState(!estadoId);

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (estadoId) {
        try {
          const response = await fetch(
            `${domain}/api/v1/public/municipios/?estadoId=${estadoId}`,
            {
              headers: {
                api_key: apiKey,
                'Content-Type': 'application/json',
              },
            },
          );
          const data = await response.json();
          setMunicipios(data.data.filter(
            (municipio) => municipio.estadoId === parseInt(estadoId, 10),
          ));
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
    handleOnChange(event, ['interesado', 'persona', 'domicilio']);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>Trámite de Equivalencia</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Tipo de Solicitud"
          options={tipoSolicitudes}
          name="tipoTramiteId"
          value={form.tipoTramiteId || ''}
          onChange={(e) => handleOnChange(e, [])}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Grado Académico"
          options={grados}
          name="gradoAcademico"
          value={form.gradoAcademico || ''}
          onChange={(e) => handleOnChange(e, [])}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Datos del Solicitante</Subtitle>
      </Grid>
      <Grid item xs={4}>
        <Input
          id="nombre"
          label="Nombre"
          name="nombre"
          value={form.interesado.persona.nombre || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          id="apellidoPaterno"
          label="Primer Apellido"
          name="apellidoPaterno"
          value={form.interesado.persona.apellidoPaterno || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          id="apellidoMaterno"
          label="Segundo Apellido"
          name="apellidoMaterno"
          value={form.interesado.persona.apellidoMaterno || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
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
          value={form.interesado.persona.domicilio.calle || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona', 'domicilio'])}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="numeroExterior"
          id="numeroExterior"
          label="Número Exterior"
          value={form.interesado.persona.domicilio.numeroExterior || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona', 'domicilio'])}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="colonia"
          id="colonia"
          label="Colonia"
          value={form.interesado.persona.domicilio.colonia || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona', 'domicilio'])}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Estados"
          name="estadoId"
          options={estados}
          value={estadoId}
          onChange={handleEstadoChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Municipio"
          name="municipioId"
          options={municipios}
          disabled={municipiosDisabled}
          value={form.interesado.persona.domicilio.municipioId || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona', 'domicilio'])}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="codigoPostal"
          id="codigoPostal"
          label="Código Postal"
          value={form.interesado.persona.domicilio.codigoPostal || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona', 'domicilio'])}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Contacto</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input
          name="correoPrincipal"
          id="correoPrincipal"
          label="Correo de Contacto"
          value={form.interesado.persona.correoPrincipal || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="telefono"
          id="telefono"
          label="Teléfono de Contacto"
          value={form.interesado.persona.telefono || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
        />
      </Grid>
    </Grid>
  );
}

DatosSolicitante.propTypes = {
  form: PropTypes.shape({
    tipoTramiteId: PropTypes.number,
    gradoAcademico: PropTypes.number,
    interesado: PropTypes.shape({
      persona: PropTypes.shape({
        curp: PropTypes.string,
        nombre: PropTypes.string,
        apellidoPaterno: PropTypes.string,
        apellidoMaterno: PropTypes.string,
        fechaNacimiento: PropTypes.string,
        correoPrincipal: PropTypes.string,
        telefono: PropTypes.string,
        domicilio: PropTypes.shape({
          calle: PropTypes.string,
          numeroExterior: PropTypes.string,
          colonia: PropTypes.string,
          estadoId: PropTypes.string,
          municipioId: PropTypes.string,
          codigoPostal: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  estados: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
