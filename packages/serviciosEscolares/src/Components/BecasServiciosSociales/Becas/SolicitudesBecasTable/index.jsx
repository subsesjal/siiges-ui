import React, { useState, useEffect, useContext } from 'react';
import { Context, DataTable } from '@siiges-ui/shared';
import { IconButton } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  handleEditClick, handleViewClick, handleCreateClick, fetchSolicitudesData,
} from '../utils';

export default function SolicitudesBecasTable({ programa, institucion }) {
  const { loading, setLoading, setNoti } = useContext(Context);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchSolicitudesData(setNoti, setLoading, setData);
  }, []);

  const columns = [
    { field: 'folioSolicitud', headerName: 'Folio de solicitud', width: 200 },
    { field: 'programa', headerName: 'Programa', width: 250 },
    { field: 'cicloEscolarId', headerName: 'Ciclo Escolar', width: 100 },
    { field: 'estatusSolicitudBecaId', headerName: 'Estatus', width: 150 },
    { field: 'createdAt', headerName: 'Fecha de solicitud', width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleViewClick(params.row.id, { programa, institucion }, router)} title="Consultar">
            <Visibility />
          </IconButton>
          <IconButton onClick={() => handleEditClick(params.row.id, { programa, institucion }, router)} title="Editar">
            <Edit />
          </IconButton>
          <IconButton onClick={() => ''} title="Borrar">
            <Delete />
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
        buttonClick={() => handleCreateClick({ programa, institucion }, router)}
      />
    </div>
  );
}

SolicitudesBecasTable.propTypes = {
  programa: PropTypes.func.isRequired,
  institucion: PropTypes.func.isRequired,
};
