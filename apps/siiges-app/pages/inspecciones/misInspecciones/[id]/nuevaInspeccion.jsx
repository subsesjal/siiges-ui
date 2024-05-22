import React, { useState } from 'react';
import { ButtonsInspeccionSection, Input, Layout } from '@siiges-ui/shared';
import {
  Box, Grid, Tabs, Tab,
} from '@mui/material';
import {
  apartados,
  preguntas,
  InspeccionPregunta,
} from '@siiges-ui/inspecciones';

export default function NuevaInspeccion() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [form, setForm] = useState({});

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

  const handleCommentChange = (apartadoId) => (e) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [apartadoId]: {
        ...prevForm[apartadoId],
        comentarios: value,
      },
    }));
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
                .filter((pregunta) => pregunta.apartadoId === apartado.id)
                .map((pregunta) => (
                  <InspeccionPregunta
                    key={pregunta.id}
                    pregunta={pregunta}
                    setForm={(update) => setForm((prevForm) => ({
                      ...prevForm,
                      [apartado.id]: {
                        ...prevForm[apartado.id],
                        ...update,
                      },
                    }))}
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
                onchange={handleCommentChange(apartado.id)}
              />
              <ButtonsInspeccionSection
                prev={() => setSelectedTab(index - 1)}
                next={() => setSelectedTab(index + 1)}
                confirm={() => console.log('Form: ', form)}
                position={getPosition(index)}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}
