import { IconButton } from '@mui/material';
import { FoliosForm } from '@siiges-ui/serviciosescolares';
import {
  Context, DataTable, getData, Layout,
} from '@siiges-ui/shared';
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
      <IconButton onClick={() => handleEdit(params.row.id)}>
        <EditIcon />
      </IconButton>
    ),
  },
];

export default function solicitudesFolios() {
  const { setLoading, setNoti } = useContext(Context);
  const [tipoSolicitud, setTipoSolicitud] = useState();
  const [tipoDocumento, setTipoDocumento] = useState();
  const [solicitudes, setSolicitudes] = useState();
  const [programa, setPrograma] = useState();
  const [loading, setLoadingPage] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getData({
        endpoint: `/solicitudesFolios?programaId=${programa}&tipoDocumentoId=${tipoDocumento}&tipoSolicitudFolioId=${tipoSolicitud}`,
      });
      if (response.success) {
        setSolicitudes(response.data);
      } else {
        setNoti({
          open: true,
          message: response.message || 'Error fetching data',
          type: 'error',
        });
      }
      setLoading(false);
    } catch (error) {
      setNoti({
        open: true,
        message: 'Error fetching data',
        type: 'error',
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tipoSolicitud && tipoDocumento) {
      fetchData();
    }
  }, [tipoSolicitud, tipoDocumento]);

  const handleCreate = () => {
    console.log(tipoSolicitud);
    if (tipoDocumento === 1) {
      router.push('/serviciosEscolares/solicitudesFolios/createFolio/titulos');
    } else if (tipoDocumento === 2) {
      router.push(
        '/serviciosEscolares/solicitudesFolios/createFolio/certificados',
      );
    } else {
      setNoti({
        open: true,
        message:
          'Error, revise que todos los campos esten seleccionados correctamente',
        type: 'error',
      });
    }
  };

  const handleEdit = (id) => {
    if (tipoDocumento === 1) {
      router.push(`/serviciosEscolares/solicitudesFolios/${id}/titulos`);
    } else if (tipoDocumento === 2) {
      router.push(`/serviciosEscolares/solicitudesFolios/${id}/certificados`);
    } else {
      setNoti({
        open: true,
        message:
          'Error, revise que todos los campos esten seleccionados correctamente',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return (
    <Layout title="Solicitudes de Folios">
      <FoliosForm
        setTipoSolicitud={setTipoSolicitud}
        setTipoDocumento={setTipoDocumento}
        setSolicitudes={setSolicitudes}
        setPrograma={setPrograma}
        setLoading={setLoadingPage}
      />
      {tipoDocumento === 1 && (
        <DataTable
          buttonAdd
          buttonClick={handleCreate}
          buttonText="Agregar Titulo"
          title="Solicitudes de Titulos"
          rows={solicitudes}
          columns={columns(handleEdit)}
        />
      )}
      {tipoDocumento === 2 && (
        <DataTable
          buttonAdd
          buttonClick={handleCreate}
          buttonText="Agregar Certificado"
          title="Solicitudes de Certificados"
          rows={solicitudes}
          columns={columns(handleEdit)}
        />
      )}
    </Layout>
  );
}
