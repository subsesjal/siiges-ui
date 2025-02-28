import React, { useState, useEffect, useContext } from 'react';
import { getData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';
import { Context, DataTable } from '@siiges-ui/shared';
import dayjs from 'dayjs';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SolicitudesBecasTable() {
  const { loading, setLoading } = useContext(Context);
  const [data, setData] = useState([]);
  const [setNoti] = useState({ open: false, message: '', type: '' });

  const handleViewClick = (row) => console.log('Consultar', row);
  const handleEditClick = (row) => console.log('Editar', row);
  const handleDeleteClick = (row) => console.log('Borrar', row);

  const columns = [
    // { field: 'id', headerName: 'ID', width: 150 },
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
        setNoti({
          open: true,
          message: `¡Ocurrió un error inesperado!: ${error.message}`,
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DataTable
      title="Lista de solicitudes"
      rows={data || []}
      columns={columns}
      loading={loading}
      buttonAdd
      buttonText="Agregar Solicitud"
      buttonDisabled={loading}
      buttonClick={() => console.log('Botón Agregar Solicitud presionado')}
      buttonType="primary"
    />
  );
}
