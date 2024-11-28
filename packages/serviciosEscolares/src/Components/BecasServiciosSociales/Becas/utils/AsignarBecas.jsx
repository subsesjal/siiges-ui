import { Grid, Typography, IconButton } from '@mui/material';
import {
  ButtonsForm, Context, DataTable, DefaultModal, getData, Input, LabelData,
  Select,
} from '@siiges-ui/shared';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AsignarBecas({ type }) {
  const router = useRouter();
  const { setNoti, setLoading } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [institucion, setInstitucion] = useState(null);
  const [form, setForm] = useState({});
  const [alumno, setAlumno] = useState(null);
  const programaId = 8;

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

  const handleBlur = async (event) => {
    const { name, value } = event.target;
    if (name === 'matricula' && value) {
      setLoading(true);
      try {
        const response = await getData({
          endpoint: `/alumnos/programas/${programaId}?matricula=${value}`,
        });
        if (response.data) {
          const fullName = `${response.data.persona.nombre} ${response.data.persona.apellidoPaterno} ${response.data.persona.apellidoMaterno}`;
          setAlumno(fullName);
          setForm((prevForm) => ({
            ...prevForm,
            alumnoId: response.data.id,
          }));
        }
      } catch (error) {
        console.error(error);
        setNoti({
          open: true,
          message: '¡No se encontró el Alumno!',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const selectOptions = {
    tipoBeca: [
      { id: 1, label: 'Académica' },
      { id: 2, label: 'Deportiva' },
    ],
    porcentajeBeca: [
      { id: 1, label: '25%' },
      { id: 2, label: '50%' },
      { id: 3, label: '75%' },
      { id: 4, label: '100%' },
    ],
    vigente: [
      { id: 1, label: 'Sí' },
      { id: 2, label: 'No' },
    ],
    estadoBeca: [
      { id: 1, label: 'Activa' },
      { id: 2, label: 'Inactiva' },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de la Institución</Typography>
      </Grid>
      <Grid item xs={4}>
        <LabelData
          title="Institución"
          subtitle={institucion?.selectedInstitucion || 'N/A'}
        />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="RVOE" subtitle={institucion?.selectedRvoe || 'N/A'} />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Plantel" subtitle="N/A" />
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
      <DefaultModal open={open} setOpen={setOpen} title="Asignacion de Beca">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              label="Matrícula"
              id="matricula"
              name="matricula"
              value={form.matricula || ''}
              onblur={handleBlur}
              onChange={(event) => setForm(
                (prev) => ({ ...prev, [event.target.name]: event.target.value }),
              )}
            />
          </Grid>
          {alumno && (
            <Grid item xs={12}>
              <LabelData title="Alumno" subtitle={alumno} />
            </Grid>
          )}
          {Object.keys(selectOptions).map((key) => (
            <Grid item xs={3} key={key}>
              <Select
                title={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                name={key}
                options={selectOptions[key]}
                onChange={(event) => setForm(
                  (prev) => ({ ...prev, [event.target.name]: event.target.value }),
                )}
              />
            </Grid>
          ))}
        </Grid>
        <ButtonsForm
          confirmDisabled={!form.alumnoId}
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
  );
}

AsignarBecas.propTypes = {
  type: PropTypes.string.isRequired,
};
