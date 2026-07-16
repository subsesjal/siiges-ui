import { DataTable, useAuth } from '@siiges-ui/shared';
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import columnsAlumnos from '../../../Tables/alumnosTable';

export default function AlumnosTable({
  alumnos,
  programa,
  permisoAlumno,
  onAlumnoDeleted,
}) {
  const router = useRouter();
  const [rows, setRows] = useState(alumnos || []);
  const { session } = useAuth();

  const isAdmin = session?.rol === 'admin';

  const buttonAdd = isAdmin
    ? Boolean(programa)
    : Boolean(permisoAlumno && programa);

  useEffect(() => {
    setRows(alumnos || []);
  }, [alumnos]);

  const handleDeleteSuccess = (alumnoId) => {
    setRows((prevRows) => (prevRows || []).filter((row) => row.id !== alumnoId));
    if (onAlumnoDeleted) {
      onAlumnoDeleted(alumnoId);
    }
  };

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        buttonAdd={buttonAdd}
        buttonText="Agregar Alumno"
        buttonClick={() => {
          router.push(
            {
              pathname: '/serviciosEscolares/alumnos/[alumnoId]/NuevoAlumno',
              query: { alumnoId: programa },
            },
            '/serviciosEscolares/alumnos/NuevoAlumno',
          );
        }}
        rows={rows}
        columns={columnsAlumnos(handleDeleteSuccess)}
        title="Tabla de alumnos"
      />
    </Grid>
  );
}

AlumnosTable.propTypes = {
  permisoAlumno: PropTypes.bool.isRequired,
  programa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  alumnos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    matricula: PropTypes.string,
    apellidoPaterno: PropTypes.string,
    apellidoMaterno: PropTypes.string,
    nombre: PropTypes.string,
    situacion: PropTypes.string,
    validacion: PropTypes.string,
  })).isRequired,
  onAlumnoDeleted: PropTypes.func,
};

AlumnosTable.defaultProps = {
  onAlumnoDeleted: undefined,
};
