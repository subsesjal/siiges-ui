import { IconButton } from '@mui/material';
import { FoliosForm } from '@siiges-ui/serviciosescolares';
import { Context, DataTable, Layout } from '@siiges-ui/shared';
import React, { useState, useContext, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';

const columns = (handleEdit) => [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nombre', width: 610 },
  { field: 'folio', headerName: 'Folio', width: 150 },
  { field: 'date', headerName: 'Fecha', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <IconButton
        onClick={() => handleEdit(params.row.id)}
      >
        <EditIcon />
      </IconButton>
    ),
  },
];

export default function solicitudesFolios() {
  const { setLoading } = useContext(Context);
  const [tipoSolicitud, setTipoSolicitud] = useState();
  const [solicitudes, setSolicitudes] = useState();
  // eslint-disable-next-line no-unused-vars
  const [programa, setPrograma] = useState();
  const [loading, setLoadingPage] = useState(true);
  const router = useRouter();

  const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
    router.push(`/serviciosEscolares/solicitudFolios/${id}`);
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return (
    <Layout title="Solicitudes de Folios">
      <FoliosForm
        setTipoSolicitud={setTipoSolicitud}
        setSolicitudes={setSolicitudes}
        setPrograma={setPrograma}
        setLoading={setLoadingPage}
      />
      {tipoSolicitud === 1 && (
        <DataTable
          title="Solicitudes de Titulos"
          rows={solicitudes}
          columns={columns(handleEdit)}
        />
      )}
      {tipoSolicitud === 2 && (
        <DataTable
          title="Solicitudes de Certificados"
          rows={solicitudes}
          columns={columns(handleEdit)}
        />
      )}
    </Layout>
  );
}
