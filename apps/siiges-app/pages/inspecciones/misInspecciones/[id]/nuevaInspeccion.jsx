/* eslint-disable no-plusplus */
import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import {
  ButtonsInspeccionSection, Context, Layout, useApi,
} from '@siiges-ui/shared';
import {
  Box, Grid, Tabs, Tab,
} from '@mui/material';
import {
  apartados,
  InspeccionPregunta,
} from '@siiges-ui/inspecciones';
import { createRecord, getData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';

export default function NuevaInspeccion() {
  const { setLoading, setNoti } = useContext(Context);
  const [selectedTab, setSelectedTab] = useState(0);
  const [form, setForm] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]); // Nuevo estado para respuestas
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
  const commentRefs = useRef([]);

  useEffect(() => {
    setLoading(loading);
    if (Array.isArray(data)) {
      setPreguntas(data);
    }
    const fetchRespuestas = async () => {
      try {
        const endpoint = `/inspecciones/inspeccionesPreguntas/${query.id}`;
        const response = await getData({ endpoint });

        if (response.statusCode === 200 && response.data) {
          setRespuestas(response.data);
        } else {
          setRespuestas([]);
        }
      } catch (error) {
        setRespuestas([]);
      }
    };
    fetchRespuestas();
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
  }, [data, loading, method, error, setLoading, setNoti, router, query.id]);

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

  const sendCurrentComment = async (currentApartadoId) => {
    const currentIndex = apartados.findIndex((apartado) => apartado.id === currentApartadoId);
    const comment = commentRefs.current[currentIndex]?.value || '';

    const commentData = {
      inspeccionId: query.id,
      inspeccionApartadoId: Number(currentApartadoId),
      comentario: comment,
    };

    try {
      const response = await createRecord({
        data: commentData,
        endpoint: `/inspecciones/${query.id}/observaciones`,
      });

      if (response.statusCode === 200 || response.statusCode === 201) {
        setNoti({
          open: true,
          message: '¡Comentario enviado correctamente!',
          type: 'success',
        });
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al enviar el comentario!',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error al enviar el comentario!',
        type: 'error',
      });
    }
  };

  const sendQuestionData = () => {
    setBody(form);
    setMethod('POST');
    setUrl(`api/v1/inspecciones/${query.id}/preguntas`);
  };
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
                .filter((pregunta) => pregunta.inspeccionApartadoId === apartado.id)
                .map((pregunta) => {
                  const respuesta = respuestas.find(
                    (resp) => resp.inspeccionPreguntaId === pregunta.id,
                  );
                  return (
                    <InspeccionPregunta
                      key={pregunta.id}
                      pregunta={pregunta}
                      setForm={setForm}
                      id={query.id}
                      respuesta={respuesta?.respuesta || ''} // Asigna la respuesta si existe, si no, cadena vacía
                    />
                  );
                })}

              <TextField
                id={`comentarios-${apartado.id}`}
                name={`comentarios-${apartado.id}`}
                label="Comentarios"
                multiline
                sx={{ marginTop: 0, width: '100%', marginBottom: 2 }}
                rows={4}
                inputRef={(el) => commentRefs.current[index] = el}
              />
              <ButtonsInspeccionSection
                prev={() => setSelectedTab(index - 1)}
                next={() => setSelectedTab(index + 1)}
                confirm={() => {
                  sendCurrentComment(apartado.id);
                  sendQuestionData();
                }}
                position={getPosition(index)}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}
