import { Grid, IconButton, Typography } from '@mui/material';
import {
  DataTable,
  Input,
  InputFile,
  LabelData,
  Select,
} from '@siiges-ui/shared';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import ModalTitulo from './Modal/titulos';
import ModalCertificado from './Modal/certificados';

const columns = (handleEdit) => [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    hidden: true,
  },
  { field: 'matricula', headerName: 'Matrícula', width: 150 },
  { field: 'name', headerName: 'Nombre', width: 450 },
  { field: 'folio', headerName: 'Folio', width: 150 },
  { field: 'date', headerName: 'Fecha', width: 150 },
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

const rows = [
  {
    id: 1,
    matricula: '20210001',
    name: 'Juan Perez',
    folio: 'A001',
    date: '2024-01-10',
  },
  {
    id: 2,
    matricula: '20210002',
    name: 'Maria Gomez',
    folio: 'A002',
    date: '2024-01-11',
  },
  {
    id: 3,
    matricula: '20210003',
    name: 'Carlos Ruiz',
    folio: 'A003',
    date: '2024-01-12',
  },
  {
    id: 4,
    matricula: '20210004',
    name: 'Ana Lopez',
    folio: 'A004',
    date: '2024-01-13',
  },
  {
    id: 5,
    matricula: '20210005',
    name: 'Luis Fernandez',
    folio: 'A005',
    date: '2024-01-14',
  },
];

export default function FoliosData({ solicitudType }) {
  const [url, setUrl] = useState();
  const [openTitulo, setOpenTitulo] = useState(false);
  const [openCertificado, setOpenCertificado] = useState(false);
  const [type, setType] = useState('create');
  const [id, setId] = useState(null);

  const handleEdit = (valueId) => {
    setType('edit');
    setId(valueId);
    if (solicitudType === 'titulo') {
      setOpenTitulo(true);
    } else {
      setOpenCertificado(true);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Datos de la institución</Typography>
        </Grid>
        <Grid item xs={8}>
          <LabelData
            title="Institución"
            subtitle="Universidad Enrique Diáz de León"
          />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="RVOE" subtitle="ABCD1234567" />
        </Grid>
        <Grid item xs={8}>
          <LabelData title="Grado Académico" subtitle="ABCD1234567" />
        </Grid>
        <Grid item xs={4}>
          <LabelData title="Plan de Estudios" subtitle="no c jaja salu2" />
        </Grid>
        <Grid item xs={12}>
          <LabelData title="Clave de centro de trabajo" subtitle="1234567" />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Número de recibo de pago oficial"
            id="numeroRecibo"
            name="numeroRecibo"
          />
        </Grid>
        <Grid item xs={4}>
          <Select title="Recibo de pago" options={[]} name="recibo" />
        </Grid>
        <Grid item xs={4}>
          <Select title="Tipo" options={[]} name="tipoCertificado" />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            label="Recibo de Pago"
            id={5}
            tipoDocumento="RECIBO_PAGO"
            tipoEntidad="ALUMNO"
            url={url}
            setUrl={setUrl}
          />
        </Grid>
        {solicitudType === 'titulo' && (
          <Grid item xs={12}>
            <DataTable
              buttonAdd
              buttonClick={() => {
                setType('create');
                setOpenTitulo(true);
              }}
              buttonText="Agregar alumno"
              rows={rows}
              columns={columns(handleEdit)}
            />
          </Grid>
        )}
        {solicitudType === 'certificado' && (
          <Grid item xs={12}>
            <DataTable
              buttonAdd
              buttonClick={() => {
                setType('create');
                setOpenCertificado(true);
              }}
              buttonText="Agregar alumno"
              rows={rows}
              columns={columns(handleEdit)}
            />
          </Grid>
        )}
      </Grid>
      <ModalTitulo
        open={openTitulo}
        setOpen={setOpenTitulo}
        type={type}
        id={id}
      />
      <ModalCertificado
        open={openCertificado}
        setOpen={setOpenCertificado}
        type={type}
        id={id}
      />
    </>
  );
}

FoliosData.propTypes = {
  solicitudType: PropTypes.string.isRequired,
};
