import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

const estados = [{ id: 14, nombre: 'Jalisco' }, { id: 15, nombre: 'Colima' }];

export default function DatosSolicitante() {
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
            (municipio) => municipio.estadoId === estadoId,
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
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>Trámite de Equivalencia</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Select title="Tipo de Solicitud" options={[]} name="tipoSolicitud" />
      </Grid>
      <Grid item xs={3}>
        <Select title="Grado Académico" options={[]} name="gradoAcademico" />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Datos del Solicitante</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input id="curp" label="CURP" name="curp" />
      </Grid>
      <Grid item xs={3}>
        <Input id="nombre" label="Nombre" name="nombre" />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="primerApellido"
          label="Primer Apellido"
          name="primerApellido"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="segundoApellido"
          label="Segundo Apellido"
          name="segundoApellido"
        />
      </Grid>
      <Grid item xs={3}>
        <InputDate
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          onChange={() => {}}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Dirección</Subtitle>
      </Grid>
      <Grid item xs={9}>
        <Input name="calle" id="calle" label="Calle" />
      </Grid>
      <Grid item xs={3}>
        <Input name="numero" id="numero" label="Número" />
      </Grid>
      <Grid item xs={3}>
        <Input name="colonia" id="colonia" label="Colonia" />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Estados"
          name="estadoId"
          options={estados}
          onChange={handleEstadoChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Municipio"
          name="municipioId"
          options={municipios}
          disabled={municipiosDisabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Input name="codigoPostal" id="codigoPostal" label="Código Postal" />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Contacto</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input name="correo" id="correo" label="Correo de Contacto" />
      </Grid>
      <Grid item xs={3}>
        <Input name="telefono" id="telefono" label="Teléfono de Contacto" />
      </Grid>
    </Grid>
  );
}
