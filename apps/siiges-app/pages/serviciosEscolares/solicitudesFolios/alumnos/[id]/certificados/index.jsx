import { Grid, IconButton } from '@mui/material';
import {
  Context, DataTable, getData, Layout,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { ModalCertificado } from '@siiges-ui/serviciosescolares';
import dayjs from 'dayjs';

const columns = (handleEdit) => [
  {
    field: 'id',
    headerName: 'ID',
    hide: true,
  },
  { field: 'name', headerName: 'Nombre', width: 250 },
  {
    field: 'fechaTermino',
    headerName: 'Fecha de terminación de plan de estudios',
    width: 350,
  },
  {
    field: 'fechaElaboracion',
    headerName: 'Fecha de elaboración de certificado',
    width: 350,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <IconButton onClick={() => handleEdit(params.row.id)}>
        <EditIcon />
      </IconButton>
    ),
  },
];

export default function AlumnosCertificado() {
  const { setNoti, setLoading } = useContext(Context);
  const router = useRouter();
  const { id, programa } = router.query;
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('create');
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      getData({ endpoint: `/solicitudesFolios/${id}/alumnos` })
        .then((response) => {
          if (response.data) {
            const mappedRows = response.data.map((alumnos) => ({
              id: alumnos.id,
              name: `${alumnos.alumno.persona.nombre} ${alumnos.alumno.persona.apellidoPaterno} ${alumnos.alumno.persona.apellidoMaterno}`,
              fechaTermino: dayjs(alumnos.fechaTermino).format('DD/MM/YYYY'),
              fechaElaboracion: dayjs(alumnos.fechaElaboracion).format('DD/MM/YYYY'),
            }));
            setRows(mappedRows);
          }
        })
        .catch((error) => {
          setNoti({
            open: true,
            message: `Ocurrió un error inesperado: ${error}`,
            type: 'error',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleEdit = (value) => {
    const data = rows.find((row) => row.id === value);
    setRowData(data);
    setOpen(true);
    setType('edit');
  };

  const handleClick = () => {
    setOpen(true);
    setType('create');
  };

  return (
    <Layout title="Folios Certificados">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataTable
            buttonAdd
            buttonClick={handleClick}
            buttonText="Agregar Alumnos"
            rows={rows}
            columns={columns(handleEdit)}
          />
        </Grid>
      </Grid>
      <ModalCertificado
        open={open}
        setOpen={setOpen}
        type={type}
        id={id}
        programaId={programa}
        setRows={setRows}
        rowData={rowData}
      />
    </Layout>
  );
}
