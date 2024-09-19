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
  const [respuestas, setRespuestas] = useState([]);
  const [observaciones, setObservaciones] = useState([]);
  const [url] = useState('');
  const [body] = useState(null);
  const [method] = useState('GET');
  const router = useRouter();
  const { query } = router;
  const { data, loading, error } = useApi({
    endpoint: url || 'api/v1/inspecciones/preguntas',
    method,
    dataBody: body,
  });
  const commentRefs = useRef([]);
  const fetchRespuestas = async () => {
    try {
      const endpoint = `/inspecciones/inspeccionesPreguntas/${query.id}`;
      const response = await getData({ endpoint });

      if (response.statusCode === 200 && response.data) {
        setRespuestas(response.data);
      } else {
        setRespuestas([]);
      }
    } catch (errorRespuestas) {
      setRespuestas([]);
    }
  };
  const fetchObservaciones = async () => {
    try {
      const endpoint = `/inspecciones/${query.id}/observaciones`;
      const response = await getData({ endpoint });

      if (response.statusCode === 200 && response.data) {
        setObservaciones(response.data);
      } else {
        setObservaciones([]);
      }
    } catch (errorObservaciones) {
      setObservaciones([]);
    }
  };
  const saveAnswers = async () => {
    setLoading(loading);
    try {
      const response = await createRecord({
        data: form,
        endpoint: `/inspecciones/${query.id}/preguntas`,
      });

      if (response.statusCode === 200 || response.statusCode === 201) {
        setNoti({
          open: true,
          message: 'Inspección guardada correctamente!',
          type: 'success',
        });
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al enviar la inspección!',
          type: 'error',
        });
      }
    } catch (errorInspeccion) {
      setNoti({
        open: true,
        message: '¡Error al enviar el comentario!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    setLoading(loading);
    if (Array.isArray(data)) {
      setPreguntas(data);
    }
    fetchRespuestas();
    fetchObservaciones();
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
    saveAnswers();
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
          message: 'Comentario guardado correctamente!',
          type: 'success',
        });
        const isLastApartado = apartados.findIndex(
          (apartado) => apartado.id === currentApartadoId,
        ) === apartados.length - 1;

        if (isLastApartado) {
          router.back();
        }
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al enviar el comentario!',
          type: 'error',
        });
      }
    } catch (errorComment) {
      setNoti({
        open: true,
        message: '¡Error al enviar el comentario!',
        type: 'error',
      });
    }
    fetchRespuestas();
    fetchObservaciones();
    setPreguntas(preguntas);
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
          {apartados.map((apartado, index) => {
            const observacion = observaciones.find(
              (obs) => obs.inspeccionApartadoId === apartado.id,
            );

            return (
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
                        respuesta={respuesta?.respuesta || ''}
                      />
                    );
                  })}

                <TextField
                  id={`comentarios-${apartado.id}`}
                  name={`comentarios-${apartado.id}`}
                  label={observacion?.comentario ? '' : 'Comentario'}
                  multiline
                  sx={{ marginTop: 0, width: '100%', marginBottom: 2 }}
                  rows={4}
                  defaultValue={observacion?.comentario || ''}
                  inputRef={(el) => {
                    commentRefs.current[index] = el;
                  }}
                />
                <ButtonsInspeccionSection
                  prev={() => setSelectedTab(index - 1)}
                  next={() => setSelectedTab(index + 1)}
                  confirm={() => {
                    sendCurrentComment(apartado.id);
                  }}
                  position={getPosition(index)}
                />
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Layout>
  );
}
