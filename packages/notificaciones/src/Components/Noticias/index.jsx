import React, { useContext, useEffect, useState } from 'react';
import { Grid, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DataTable, getData, deleteRecord, Context,
} from '@siiges-ui/shared';

import CreateModal from './Modal/CreateModal';
import EditModal from './Modal/EditModal';
import DeleteModal from './Modal/DeleteModal';

const columns = (setOpenEdit, setSelectedRow, handleDelete) => [
  { field: 'titulo', headerName: 'Título', width: 800 },
  { field: 'createdAt', headerName: 'Fecha de Creación', width: 200 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 120,
    renderCell: (params) => (
      <>
        <Tooltip title="Editar Noticia" placement="top">
          <IconButton
            aria-label="Editar Noticia"
            onClick={() => {
              if (params?.row) {
                setSelectedRow(params.row);
                setOpenEdit(true);
              }
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar Noticia" placement="top">
          <IconButton
            aria-label="Eliminar Noticia"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];

export default function NoticiasTable() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [noticiaId, setNoticiaId] = useState();
  const { setNoti, setLoading } = useContext(Context);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchNoticias = async () => {
    setLoading(true);
    const response = await getData({ endpoint: '/noticias' });
    setLoading(false);

    if (response.statusCode === 200) {
      const formattedRows = response.data.map((row) => ({
        ...row,
        createdAt: formatDate(row.createdAt),
      }));
      setRows(formattedRows);
    } else {
      setNoti({
        open: true,
        message: 'Error al obtener noticias',
        type: 'error',
      });
    }
  };

  const handleDelete = (id) => {
    setNoticiaId(id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    const response = await deleteRecord({ endpoint: `/noticias/${noticiaId}` });
    setLoading(false);

    if (response.statusCode === 200) {
      setNoti({
        open: true,
        message: 'Noticia eliminada correctamente',
        type: 'success',
      });
      setOpenDelete(false);
      setNoticiaId(null);
      fetchNoticias();
    } else {
      setNoti({
        open: true,
        message: 'Error al eliminar la noticia',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          rows={rows}
          columns={columns(setOpenEdit, setSelectedRow, handleDelete)}
          title="Lista de Noticias"
          buttonAdd
          buttonClick={() => setOpenCreate(true)}
          buttonText="Añadir Noticia"
        />
      </Grid>

      <CreateModal
        open={openCreate}
        setOpen={setOpenCreate}
        onSuccess={fetchNoticias}
      />

      {selectedRow && (
        <EditModal
          open={openEdit}
          setOpen={setOpenEdit}
          data={selectedRow}
          onSuccess={fetchNoticias}
        />
      )}

      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        onConfirm={confirmDelete}
      />
    </Grid>
  );
}
