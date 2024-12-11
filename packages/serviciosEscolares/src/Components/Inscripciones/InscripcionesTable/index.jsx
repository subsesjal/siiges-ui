import {
  Button, Context, DataTable, Input, getData,
} from '@siiges-ui/shared';
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import {
  getAlumnoByMatricula,
  postAsignaturasAlumno,
} from '@siiges-ui/instituciones';
import columnsAsignaturas from '../../../Tables/inscripcionesTable';
import columnsAlumnosInscritos from '../../../Tables/alumnosInscritos';

export default function InscripcionesTable({
  asignaturas,
  programaId,
  grupoId,
}) {
  const { setNoti } = useContext(Context);
  const [matriculaValue, setMatriculaValue] = useState('');
  const [alumnoByMatricula, setAlumnoByMatricula] = useState();
  const [selectedAsignaturas, setSelectedAsignaturas] = useState([]);
  const [alumnosInscritos, setAlumnosInscritos] = useState([]);
  const [alumnoValidacion, setAlumnoValidacion] = useState(null);
  const [alumnoData, setAlumnoData] = useState(null);
  const [isAlumnoValido, setIsAlumnoValido] = useState(false);

  const allIds = asignaturas.map((asignatura) => asignatura.id);

  const fetchAlumnosInscritos = async () => {
    try {
      const result = await getData({ endpoint: `/alumnos/grupos/${grupoId}/inscripcion` });
      if (result.statusCode === 200 && result.data.length > 0) {
        const alumnosCompletos = result.data.map((alumno) => ({
          id: alumno.alumnoId,
          alumnoId: alumno.alumnoId,
          matricula: alumno.alumno.matricula,
          persona: alumno.alumno.persona,
          alumnoAsignaturas: alumno.alumnoAsignaturas,
          ...alumno.alumno,
        }));
        setAlumnosInscritos(alumnosCompletos);
      } else {
        setAlumnosInscritos([]);
      }
    } catch (error) {
      setAlumnosInscritos([]);
    }
  };

  useEffect(() => {
    fetchAlumnosInscritos();
  }, [grupoId]);

  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedAsignaturas((prev) => [...prev, id]);
    } else {
      setSelectedAsignaturas((prev) => prev.filter((aId) => aId !== id));
    }
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedAsignaturas([...allIds]);
    } else {
      setSelectedAsignaturas([]);
    }
  };

  const handleBlurMatricula = () => {
    getAlumnoByMatricula(matriculaValue, programaId, async (error, result) => {
      if (error) {
        setNoti({
          open: true,
          message: '¡Algo salió mal al cargar al alumno, revisa la matrícula!',
          type: 'error',
        });
        setIsAlumnoValido(false);
        return;
      }

      setAlumnoByMatricula(result.alumnos);

      try {
        const validacionResult = await getData({ endpoint: `/alumnos/${result.alumnos.id}/validaciones` });
        if (!validacionResult || validacionResult.data.situacionValidacionId !== 1) {
          setNoti({
            open: true,
            message: '¡Este alumno no tiene una validación Auténtica!.',
            type: 'error',
          });
          setIsAlumnoValido(false);
          return;
        }
        setAlumnoValidacion(validacionResult.data);

        const alumnoResult = await getData({ endpoint: `/alumnos/${result.alumnos.id}` });
        if (!alumnoResult || alumnoResult.data.situacionId !== 1) {
          setNoti({
            open: true,
            message: '¡Este alumno no está Activo!.',
            type: 'error',
          });
          setIsAlumnoValido(false);
          return;
        }
        setAlumnoData(alumnoResult.data);
        setIsAlumnoValido(true);
      } catch (fetchError) {
        setNoti({
          open: true,
          message: '¡Algo salió mal al validar al alumno!',
          type: 'error',
        });
        setIsAlumnoValido(false);
      }
    });
  };

  const handleInscribirAlumno = () => {
    if (!alumnoValidacion || !alumnoData) {
      setNoti({
        open: true,
        message: 'El alumno no cumple con los requisitos de validación y estado.',
        type: 'error',
      });
      return;
    }

    if (alumnoByMatricula && selectedAsignaturas.length > 0) {
      const alumnoYaInscrito = alumnosInscritos
        .some((alumno) => alumno.id === alumnoByMatricula.id);
      if (alumnoYaInscrito) {
        setNoti({
          open: true,
          message: '¡Este alumno ya está inscrito en el grupo!.',
          type: 'error',
        });
        return;
      }
      const dataToSend = [
        {
          alumnoId: alumnoByMatricula.id,
          asignaturas: selectedAsignaturas,
        },
      ];

      postAsignaturasAlumno(dataToSend, grupoId, (error) => {
        if (error) {
          setNoti({
            open: true,
            message:
              '¡Algo salió mal al inscribir el alumno, reintente más tarde!',
            type: 'error',
          });
        } else {
          setNoti({
            open: true,
            message: '¡Éxito al inscribir el alumno!',
            type: 'success',
          });
          fetchAlumnosInscritos();
          setMatriculaValue('');
          setSelectedAsignaturas([]);
        }
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Input
          label="Matrícula"
          name="matricula"
          value={matriculaValue}
          onChange={(e) => setMatriculaValue(e.target.value)}
          onblur={handleBlurMatricula}
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          rows={asignaturas}
          columns={columnsAsignaturas(
            handleCheckboxChange,
            selectedAsignaturas,
            allIds,
            handleSelectAll,
          )}
          title="Tabla de asignaturas"
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'right' }}>
        {isAlumnoValido && (
          <Button
            text="Inscribir alumno"
            disabled={!alumnoByMatricula || selectedAsignaturas.length === 0}
            onClick={handleInscribirAlumno}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <DataTable
          rows={alumnosInscritos}
          getRowId={(row) => row.id}
          columns={columnsAlumnosInscritos(
            asignaturas,
            grupoId,
            fetchAlumnosInscritos,
            alumnosInscritos,
          )}
          title="Alumnos inscritos"
        />
      </Grid>
    </Grid>
  );
}

InscripcionesTable.defaultProps = {
  asignaturas: [],
};

InscripcionesTable.propTypes = {
  asignaturas: PropTypes.arrayOf(PropTypes.string),
  programaId: PropTypes.number.isRequired,
  grupoId: PropTypes.number.isRequired,
};
