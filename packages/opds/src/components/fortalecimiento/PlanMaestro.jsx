import { Grid, Typography } from '@mui/material';
import { ButtonsForm, DataTable, Input } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import useApi from '@siiges-ui/shared/src/utils/hooks/useApi';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import EvidenciaFotografica from './EvidenciaFotografica';
import Columns from './Tables/Columns';
// import rows from './Tables/Columns/MockRows';
import { inputPlanMaestro } from '../../utils/constants';

export default function PlanMaestro({ type }) {
  const router = useRouter();
  const { planMaestroId, id: idPM } = router.query;
  const columns = Columns(idPM);
  const [fileURLs, setFileURLs] = useState([]);
  const [form, setForm] = useState({});
  const [typePage, setTypePage] = useState(type);
  // Estado para controlar el reenvío de la solicitud
  const [body, setBody] = useState(null);
  const [reload, setReload] = useState(false);
  const [method, setMethod] = useState('GET');
  const [rows, setRows] = useState([]);
  const [path, setPath] = useState(`api/v1/planMaestro/responsables/${planMaestroId || idPM}`);

  const { data, error } = useApi({
    endpoint:
      path || `api/v1/planMaestro/responsables/${planMaestroId || idPM}`,
    method,
    dataBody: body,
    reload,
  });

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index),
      url,
      ...prevURLs.slice(index + 1),
    ]);
  };
  const updateForm = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  useEffect(() => {
    setPath(`api/v1/planMaestro/responsables/${planMaestroId || idPM}`);
  }, [idPM]);

  const createResponsables = () => {
    setBody({
      planeacion: {
        nombre: form.nombrePlaneacion,
        cargo: form.cargoPlaneacion,
        correo: form.correoPlaneacion,
        telefono: form.telefonoPlaneacion,
        extension: form.extensionPlaneacion,
      },
      obraYMantenimiento: {
        nombre: form.nombreObra,
        cargo: form.cargoObra,
        correo: form.correoObra,
        telefono: form.telefonoObra,
        extension: form.extensionObra,
      },
    });
    setMethod('POST');
    setReload(!reload);
  };

  useEffect(() => {
    if (data === null) {
      setTypePage('crear');
    }
    if (
      data
      && method === 'GET'
      && Object.prototype.toString.call(data) === '[object Object]'
    ) {
      setForm({
        nombrePlaneacion: data.responsablePlaneacion.nombre,
        cargoPlaneacion: data.responsablePlaneacion.cargo,
        correoPlaneacion: data.responsablePlaneacion.correo,
        telefonoPlaneacion: data.responsablePlaneacion.telefono,
        extensionPlaneacion: data.responsablePlaneacion.extension,
        nombreObra: data.responsableObra.nombre,
        cargoObra: data.responsableObra.cargo,
        correoObra: data.responsableObra.correo,
        telefonoObra: data.responsableObra.telefono,
        extensionObra: data.responsableObra.extension,
      });
      setTypePage('editar');
      setPath(`api/v1/planMaestro/datosDelProyecto/${idPM}`);
    }
    if (Array.isArray(data)) {
      setRows(data);
    }
  }, [data, error]);

  const generateInput = (id, label, value, xs) => (
    <Grid item xs={xs}>
      <Input
        id={id}
        label={label}
        name={id + value}
        value={form[id + value]}
        auto={id}
        onchange={(e) => updateForm(e.target.name, e.target.value)}
      />
    </Grid>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Responsable de planeación</Typography>
      </Grid>
      {inputPlanMaestro.map((input) => generateInput(input.id, input.label, 'Planeacion', input.xs))}
      <Grid item xs={12}>
        <Typography variant="h6">
          Responsable de Obra y mantenimiento
        </Typography>
      </Grid>
      {inputPlanMaestro.map((input) => generateInput(input.id, input.label, 'Obra', input.xs))}
      <Grid item xs={12}>
        <DataTable
          buttonAdd
          buttonText="Agregar datos del proyecto"
          buttonClick={() => {
            router.push({
              pathname: `/opds/fortalecimiento/planMaestro/DatosProyecto/${
                planMaestroId || idPM
              }/crearDatosProyecto`,
            });
          }}
          rows={rows || []}
          columns={columns}
        />
      </Grid>
      <Grid item xs={12}>
        <EvidenciaFotografica
          id={1}
          label="Evidencia Fotográfica (.jpg)"
          url={fileURLs[0]}
          setUrl={(url) => handleFileLoaded(1, url)}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonsForm
          cancel={() => router.back()}
          confirm={() => typePage === 'crear' && createResponsables()}
        />
      </Grid>
    </Grid>
  );
}

PlanMaestro.defaultProps = {
  type: '',
};

PlanMaestro.propTypes = {
  type: PropTypes.string,
};
