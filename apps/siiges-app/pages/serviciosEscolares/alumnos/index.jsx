import { Layout } from '@siiges-ui/shared';
import { AlumnosForm, AlumnosTable } from '@siiges-ui/serviciosescolares';
import { Divider } from '@mui/material';
import React, { useState } from 'react';

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState();
  const [programa, setPrograma] = useState();
  const [loading, setLoading] = useState(true);
  const [permisoAlumno, setPermisoAlumno] = useState(false);

  const handleAlumnoDeleted = (alumnoId) => {
    setAlumnos((prevAlumnos) => prevAlumnos?.filter(
      (alumno) => alumno.id !== alumnoId,
    ));
  };

  return (
    <Layout title="Alumnos" loading={loading}>
      <AlumnosForm
        setAlumnos={setAlumnos}
        setPrograma={setPrograma}
        setLoading={setLoading}
        setPermisoAlumno={setPermisoAlumno}
      />
      <Divider sx={{ marginTop: 2 }} />
      <AlumnosTable
        alumnos={alumnos}
        programa={programa}
        permisoAlumno={permisoAlumno}
        onAlumnoDeleted={handleAlumnoDeleted}
      />
    </Layout>
  );
}
