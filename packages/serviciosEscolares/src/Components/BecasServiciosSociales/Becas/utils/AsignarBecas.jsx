import { Grid, Typography, IconButton } from '@mui/material';
import {
  ButtonsModal, Context, DataTable, DefaultModal, Input, LabelData,
} from '@siiges-ui/shared';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAlumnoByMatricula } from '@siiges-ui/instituciones';

export default function AsignarBecas({ type }) {
  const router = useRouter();
  const { setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [institucion, setInstitucion] = useState(null);
  const [matriculaValue, setMatriculaValue] = useState('');
  const [alumnoByMatricula, setAlumnoByMatricula] = useState();
  const programaId = 1;

  useEffect(() => {
    if (router.query.institucion) {
      try {
        setInstitucion(JSON.parse(router.query.institucion));
      } catch (error) {
        console.error('Error parsing institucion:', error);
      }
    }
  }, [router.query]);

  const handleEdit = (row) => {
    console.log(`Editing: ${JSON.stringify(row)}`);
  };

  const handleDelete = (row) => {
    console.log(`Deleting: ${JSON.stringify(row)}`);
  };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 400 },
    { field: 'grado', headerName: 'Grado', width: 150 },
    { field: 'modalidad', headerName: 'Modalidad', width: 200 },
    { field: 'tipoSolicitud', headerName: 'Tipo de solicitud', width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)} title="Edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)} title="Delete">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: '1',
      nombre: 'Pedro Pedro Pedro',
      grado: 1,
      modalidad: 'Cesantía',
      tipoSolicitud: '21/12/1999',
    },
  ];

  const handleBlurMatricula = () => {
    getAlumnoByMatricula(matriculaValue, programaId, async (error, result) => {
      if (error) {
        setNoti({
          open: true,
          message: '¡Algo salió mal al cargar al alumno, revisa la matrícula!',
          type: 'error',
        });
        return;
      }

      setAlumnoByMatricula(result.alumnos);
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de la Institución</Typography>
      </Grid>
      <Grid item xs={4}>
        <LabelData
          title="Institución"
          subtitle={institucion?.selectedInstitucion || 'Universidad Enrique Díaz de León'}
        />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="RVOE" subtitle={institucion?.selectedRvoe || 'ABCD1234567'} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Plantel" subtitle="ABCD1234567" />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          buttonAdd
          buttonClick={() => {
            if (type !== 'consult') {
              setOpen(true);
            }
          }}
          buttonText="Agregar Alumno"
          rows={rows}
          columns={columns}
        />
      </Grid>
      <Grid item>
        <DefaultModal open={open} setOpen={setOpen} title="Asignacion de Beca">
          <Grid item xs={12}>
            <Input
              label="Matrícula"
              name="matricula"
              value={matriculaValue}
              onChange={(e) => setMatriculaValue(e.target.value)}
              onblur={handleBlurMatricula}
            />
          </Grid>
          <ButtonsModal
            confirm={() => {
              console.log('Confirmed');
              setOpen(false);
            }}
            cancel={() => {
              setOpen(false);
            }}
          />
        </DefaultModal>
      </Grid>
    </Grid>
  );
}

AsignarBecas.propTypes = {
  type: PropTypes.string.isRequired,
};
