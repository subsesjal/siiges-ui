import { Grid, Tab, Tabs } from '@mui/material';
import { getInstitucionUsuario } from '@siiges-ui/instituciones';
import { DocumentosAlumno, FormAlumno } from '@siiges-ui/serviciosescolares';
import {
  getParentUserById, Layout, useAuth, useUI,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const RESTRICTED_INSTITUCION_ID = 222;

export default function NuevoAlumno() {
  const { session } = useAuth();
  const { setLoading } = useUI();
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [id, setId] = useState();
  const [usuarioId, setUsuarioId] = useState(null);

  const handleChange = (event, newValue) => {
    if (newValue === 1 && !id) return;
    setValue(newValue);
  };

  useEffect(() => {
    if (!session?.id || !session?.rol) return;

    if (session.rol === 'representante') {
      setUsuarioId(session.id);
    } else {
      getParentUserById(session.id).then((res) => {
        if (res?.data?.id) {
          setUsuarioId(res.data.id);
        }
      });
    }
  }, [session?.id, session?.rol]);

  const { institucion, loading } = getInstitucionUsuario(session, usuarioId);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (!institucion?.id) return;

    const institucionId = parseInt(institucion.id, 10);
    if (Number.isNaN(institucionId)) return;

    if (institucionId === RESTRICTED_INSTITUCION_ID) {
      router.back();
    }
  }, [institucion?.id]);

  if (loading) return null;
  if (institucion && parseInt(institucion.id, 10) === RESTRICTED_INSTITUCION_ID) return null;

  return (
    <Layout title="Agregar Alumno">
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'end' }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Información Personal" />
            <Tab label="Documentos" disabled={!id} />
          </Tabs>
        </Grid>
        {value === 0 && <FormAlumno type="new" setId={setId} />}
        {value === 1 && <DocumentosAlumno id={id} />}
      </Grid>
    </Layout>
  );
}
