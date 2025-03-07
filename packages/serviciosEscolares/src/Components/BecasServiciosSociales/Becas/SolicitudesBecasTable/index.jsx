import React, { useState, useEffect, useContext } from 'react';
import { getData, deleteData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';
import { Context, DataTable } from '@siiges-ui/shared';
import dayjs from 'dayjs';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

export default function SolicitudesBecasTable() {
  const { loading, setLoading } = useContext(Context);
  const [data, setData] = useState([]);
  const router = useRouter();

  const handleViewClick = (row) => {
    alert(`Detalles de la solicitud:\nFolio: ${row.folioSolicitud}\nPrograma: ${row.programaId}\nEstatus: ${row.estatusSolicitudBecaId}`);
  };

  const handleEditClick = (row) => {
    router.push(`/editar-solicitud/${row.id}`);
  };

  const handleDeleteClick = async (row) => {
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar la solicitud con folio ${row.folioSolicitud}?`);
    if (confirmDelete) {
      setLoading(true);
      try {
        await deleteData({ endpoint: `/solicitudesBecas/${row.id}` });
        setData((prevData) => prevData.filter((item) => item.id !== row.id));
        alert('Solicitud eliminada con éxito.');
      } catch (error) {
        alert(`Error al eliminar la solicitud: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getData({ endpoint: '/solicitudesBecas/' })
      .then((response) => {
        if (response.data) {
          const mappedRows = response.data.map((becas) => ({
            id: becas.id,
            folioSolicitud: becas.folioSolicitud,
            programaId: becas.programa.cicloId,
            cicloEscolarId: becas.cicloEscolar.nombre,
            estatusSolicitudBecaId: becas.estatusSolicitudBeca.nombre,
            createdAt: dayjs(becas.createdAt).format('DD/MM/YYYY'),
          }));
          setData(mappedRows);
        }
      })
      .catch((error) => {
        alert(`¡Ocurrió un error inesperado!: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: 'folioSolicitud', headerName: 'Folio de solicitud', width: 200 },
    { field: 'programaId', headerName: 'Programa', width: 150 },
    { field: 'cicloEscolarId', headerName: 'Ciclo Escolar', width: 200 },
    { field: 'estatusSolicitudBecaId', headerName: 'Estatus', width: 200 },
    { field: 'createdAt', headerName: 'Fecha de solicitud', width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleViewClick(params.row)} title="Consultar">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEditClick(params.row)} title="Editar">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row)} title="Borrar">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        title="Lista de solicitudes"
        rows={data || []}
        columns={columns}
        loading={loading}
        buttonAdd
        buttonText="Agregar Solicitud"
        buttonClick={() => router.push('/crear-solicitud')}
        buttonType="primary"
      />
    </div>
  );
}
