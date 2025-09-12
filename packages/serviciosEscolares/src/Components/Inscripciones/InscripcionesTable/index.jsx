import {
  Button, Context, DataTable, InputSearch, LabelData, getData,
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
  cicloTxt,
}) {
  const { setNoti } = useContext(Context);
  const [matriculaValue, setMatriculaValue] = useState('');
  const [alumnoByMatricula, setAlumnoByMatricula] = useState();
  const [selectedAsignaturas, setSelectedAsignaturas] = useState([]);
  const [alumnosInscritos, setAlumnosInscritos] = useState([]);
  const [alumnoValidacion, setAlumnoValidacion] = useState(null);
  const [alumnoData, setAlumnoData] = useState(null);
  const [nombreAlumno, setNombreAlumno] = useState(null);
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
          nombre: alumno.alumno.persona?.nombre || '',
          apellidoPaterno: alumno.alumno.persona?.apellidoPaterno || '',
          apellidoMaterno: alumno.alumno.persona?.apellidoMaterno || '',
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
    if (!matriculaValue) {
      setNoti({
        open: true,
        message: '¡Favor de introducir una matrícula válida!',
        type: 'error',
      });
      return;
    }
    getAlumnoByMatricula(matriculaValue, programaId, async (error, result) => {
      if (error) {
        setNoti({
          open: true,
          message: '¡Algo salió mal al cargar al alumno, revisa la matrícula!',
          type: 'warning',
        });
        setIsAlumnoValido(false);
        return;
      }

      setAlumnoByMatricula(result.alumnos);

      try {
        if (cicloTxt === 'EQUIV' && !result.alumnos.equivalencia) {
          setNoti({
            open: true,
            message: '¡El alumno no tiene equivalencia registrada!',
            type: 'warning',
          });
          setIsAlumnoValido(false);
          return;
        }

        if (!result.alumnos.validacion || result.alumnos.validacion.situacionValidacionId !== 1) {
          setNoti({
            open: true,
            message: '¡Favor de revisar la validación académica de este alumno!',
            type: 'warning',
          });
          setIsAlumnoValido(false);
          return;
        }
        setAlumnoValidacion(result.alumnos.validacion);

        if (!result.alumnos || result.alumnos.situacionId !== 1) {
          setNoti({
            open: true,
            message: '¡Este alumno no está Activo!',
            type: 'warning',
          });
          setIsAlumnoValido(false);
          return;
        }
        setAlumnoData(result.alumnos);
        const fullName = `${result?.alumnos?.persona?.nombre} ${result?.alumnos?.persona?.apellidoPaterno} ${result?.alumnos?.persona?.apellidoMaterno}`;
        setNombreAlumno(fullName);
        setIsAlumnoValido(true);
        setNoti({
          open: true,
          message: '¡Alumno encontrado exitosamente!',
          type: 'success',
        });
      } catch (fetchError) {
        setNoti({
          open: true,
          message: '¡Error interno, reintente más tarde!',
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
        message: '¡El alumno no cumple con los requisitos de validación y estado!.',
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
        <InputSearch
          label="Matrícula"
          name="matricula"
          value={matriculaValue}
          onChange={(e) => setMatriculaValue(e.target.value)}
          onBlur={handleBlurMatricula}
          onClickButton={handleBlurMatricula}
        />
      </Grid>
      {nombreAlumno && (
      <Grid item xs={12}>
        <LabelData title="Alumno" subtitle={nombreAlumno} />
      </Grid>
      )}
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
  cicloTxt: PropTypes.number.isRequired,
};
