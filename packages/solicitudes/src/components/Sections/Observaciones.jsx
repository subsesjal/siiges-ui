import { Grid, TextField, Typography } from '@mui/material';
import { useApi, LabelData, Context } from '@siiges-ui/shared';
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ObservacionesContext } from '../utils/Context/observacionesContext';

function Observaciones({ id, section }) {
  const {
    createObservaciones,
    setCreateObservaciones,
    setSections,
  } = useContext(ObservacionesContext);
  const { setNoti, session, setLoading } = useContext(Context);
  const { rol } = session;
  const [path, setPath] = useState('');
  const [body, setBody] = useState(null);
  const [method, setMethod] = useState('GET');
  const [observaciones, setObservaciones] = useState('');

  const { data, error, loading } = useApi({
    endpoint: path,
    dataBody: body,
    method,
  });

  const usersAuth = ['admin', 'control_documental'];

  const isAuth = () => usersAuth.some((user) => user === rol);

  useEffect(() => {
    if (createObservaciones) {
      setMethod('POST');
      setBody({
        observaciones,
        isClosed: true,
      });
      setPath(`api/v1/solicitudes/${id}/secciones/${section}/observaciones`);
    }
  }, [createObservaciones]);

  useEffect(() => {
    if (id && method === 'GET') {
      setPath(`api/v1/solicitudes/${id}/secciones/${section}`);
    }
  }, [section, id, method]);

  useEffect(() => {
    setLoading(loading);
    if (method === 'POST' && error) {
      setNoti({
        open: true,
        message: 'Error al guardar observaciones',
        type: 'error',
      });
      setMethod('GET');
      setCreateObservaciones(false);
    }
    if (method === 'POST' && data) {
      setNoti({
        open: true,
        message: 'Observaciones guardadas',
        type: 'success',
      });
      setMethod('GET');
      setCreateObservaciones(false);
    }
  }, [loading]);

  useEffect(() => {
    if (method === 'GET' && data) {
      setObservaciones(data?.observaciones);
      setSections((prevSections) => prevSections.map((seccion) => (seccion.id === data?.seccionId
        ? { ...seccion, disabled: data?.isClosed }
        : seccion)));
    }
    if (!data) setObservaciones('');
  }, [data]);

  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Observaciones</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12} marginTop={2}>
          {isAuth() ? (
            <TextField
              label="Observaciones"
              id="observaciones"
              name="observaciones"
              auto="observaciones"
              rows={4}
              value={observaciones}
              multiline
              sx={{ width: '100%' }}
              onChange={({ target }) => setObservaciones(target.value)}
            />
          ) : (
            <LabelData title="" subtitle={observaciones} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Observaciones;

Observaciones.defaultProps = {
  id: null,
};

Observaciones.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  section: PropTypes.number.isRequired,
};
