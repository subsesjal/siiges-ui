import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import {
  ButtonsForm,
  Context,
  Input,
  LabelData,
  Layout,
} from '@siiges-ui/shared';
import { getSolicitudDetalles } from '@siiges-ui/solicitudes';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

const initialCheckboxes = {
  fda01: false,
  fda02: false,
  fda03: false,
  fda04: false,
  fda05: false,
  fda06: false,
};

export default function RecepcionFormatos() {
  const { session, setNoti } = useContext(Context);
  const router = useRouter();
  const { query } = router;
  const [solicitud, setSolicitud] = useState({});
  const [form, setForm] = useState({ ...initialCheckboxes, comentarios: '' });

  useEffect(() => {
    const fetchSolicitud = async () => {
      if (query.id !== undefined) {
        try {
          const solicitudData = await getSolicitudDetalles(
            query.id,
            session,
            setNoti,
          );
          setSolicitud(solicitudData.data);
        } catch (error) {
          console.error('Error fetching solicitud:', error);
        }
      }
    };

    fetchSolicitud();
  }, [query, session]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: checked,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form data:', form);
  };

  return (
    <Layout title="Recepción de formatos Administrativos">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Información de la solicitud</Typography>
        </Grid>
        <Grid item xs={3}>
          <LabelData title="Tipo de tramite" subtitle="Nueva solicitud" />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Fecha de recepción"
            subtitle={solicitud.fechaRecepcion || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData title="Folio" subtitle={solicitud.folio || ''} />
        </Grid>
        <Grid item xs={3}>
          <LabelData title="RVOE" subtitle={solicitud.rvoe || ''} />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Nivel"
            subtitle={solicitud.programa?.nivelId || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Modalidad"
            subtitle={solicitud.programa?.modalidadId || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Nombre"
            subtitle={solicitud.programa?.nombre || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData title="Periodo" subtitle="Semestral" />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Turno"
            subtitle={
              solicitud.programa?.programaTurnos
                ?.map((t) => t.turnoId)
                .join(', ') || ''
            }
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Clave de centro de trabajo"
            subtitle={solicitud.programa?.plantel?.claveCentroTrabajo || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Calle"
            subtitle={solicitud.programa?.plantel?.domicilio?.calle || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Numero"
            subtitle={
              solicitud.programa?.plantel?.domicilio?.numeroExterior || ''
            }
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Interior"
            subtitle={
              solicitud.programa?.plantel?.domicilio?.numeroInterior || ''
            }
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Colonia"
            subtitle={solicitud.programa?.plantel?.domicilio?.colonia || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="CP"
            subtitle={
              solicitud.programa?.plantel?.domicilio?.codigoPostal || ''
            }
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Municipio"
            subtitle={
              solicitud.programa?.plantel?.domicilio?.municipio?.nombre || ''
            }
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Institución"
            subtitle={solicitud.programa?.plantel?.institucion?.nombre || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Fecha en que se dio de alta"
            subtitle={solicitud.programa?.plantel?.institucion?.createdAt || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Representante Legal"
            subtitle={
              solicitud.programa?.plantel?.institucion?.representanteLegal || ''
            }
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Email"
            subtitle={solicitud.programa?.plantel?.correo1 || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Celular"
            subtitle={solicitud.programa?.plantel?.telefono1 || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Recepción de formatos Administrativos
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              checked={form.fda01}
              onChange={handleCheckboxChange}
              name="fda01"
              label="FDA 01"
            />
            <FormControlLabel
              control={<Checkbox />}
              checked={form.fda03}
              onChange={handleCheckboxChange}
              name="fda03"
              label="FDA 03"
            />
            <FormControlLabel
              control={<Checkbox />}
              checked={form.fda05}
              onChange={handleCheckboxChange}
              name="fda05"
              label="FDA 05"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              checked={form.fda02}
              onChange={handleCheckboxChange}
              name="fda02"
              label="FDA 02"
            />
            <FormControlLabel
              control={<Checkbox />}
              checked={form.fda04}
              onChange={handleCheckboxChange}
              name="fda04"
              label="FDA 04"
            />
            <FormControlLabel
              control={<Checkbox />}
              checked={form.fda06}
              onChange={handleCheckboxChange}
              name="fda06"
              label="FDA 06"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Input
            id="comentarios"
            label="Comentarios"
            name="comentarios"
            value={form.comentarios}
            onchange={handleInputChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm
            cancel={() => {
              router.back();
            }}
            confirm={handleSubmit}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
