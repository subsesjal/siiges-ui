import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ButtonsInspeccionSection, Context, Input, Layout, useApi,
} from '@siiges-ui/shared';
import {
  Box, Grid, Tabs, Tab,
} from '@mui/material';
import {
  apartados,
  // preguntas,
  InspeccionPregunta,
} from '@siiges-ui/inspecciones';

export default function NuevaInspeccion() {
  const { setLoading, setNoti } = useContext(Context);
  const [selectedTab, setSelectedTab] = useState(0);
  const [form, setForm] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [url, setUrl] = useState('');
  const [body, setBody] = useState(null);
  const [method, setMethod] = useState('GET');
  const router = useRouter();
  const { query } = router;

  const { data, loading, error } = useApi({
    endpoint: url || 'api/v1/inspecciones/preguntas',
    method,
    dataBody: body,
  });

  useEffect(() => {
    setLoading(loading);
    if (Array.isArray(data)) {
      setPreguntas(data);
    }
    if (data && method === 'POST' && error === null) {
      setNoti({
        open: true,
        message: '¡Inspección guardada correctamente!',
        type: 'success',
      });
      router.back();
    }
    if (error) {
      setNoti({
        open: true,
        message: '¡Error al guardar la inspección!',
        type: 'error',
      });
    }
  }, [data, loading]);

  const getPosition = (index) => {
    if (index === 0) {
      return 'first';
    }
    if (index === apartados.length - 1) {
      return 'last';
    }
    return 'middle';
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const sendQuestionData = () => {
    setBody(form);
    setMethod('POST');
    setUrl(`api/v1/inspecciones/${query.id}/preguntas`);
  };

  // Falta implementar la lógica para guardar comentarios en el backend
  /*
  const handleCommentChange = (inspeccionCategoriaId) => (e) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [inspeccionCategoriaId]: {
        ...prevForm[inspeccionCategoriaId],
        comentarios: value,
      },
    }));
  }; */

  return (
    <Layout title="Nueva inspección">
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Tabs value={selectedTab} onChange={handleTabChange}>
              {apartados.map((apartado) => (
                <Tab key={apartado.id} label={apartado.nombre} />
              ))}
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {apartados.map((apartado, index) => (
            <Box
              key={apartado.id}
              sx={{ display: selectedTab === index ? 'block' : 'none' }}
            >
              {preguntas
                .filter((pregunta) => pregunta.inspeccionCategoriaId === apartado.id)
                .map((pregunta) => (
                  <InspeccionPregunta
                    key={pregunta.id}
                    pregunta={pregunta}
                    setForm={setForm}
                    id={query.id}
                  />
                ))}
              <Input
                id={`comentarios-${apartado.id}`}
                name={`comentarios-${apartado.id}`}
                label="Comentarios"
                multiline
                rows={4}
                sx={{ marginTop: 0 }}
                value={form[apartado.id]?.comentarios || ''}
                // onchange={handleCommentChange(apartado.id)}
              />
              <ButtonsInspeccionSection
                prev={() => setSelectedTab(index - 1)}
                next={() => setSelectedTab(index + 1)}
                confirm={() => sendQuestionData()}
                position={getPosition(index)}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}
