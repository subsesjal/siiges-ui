import { FoliosForm, FoliosTable } from '@siiges-ui/serviciosescolares';
import { Context, getData, Layout } from '@siiges-ui/shared';
import React, { useState, useContext, useEffect } from 'react';

export default function solicitudesFolios() {
  const { setLoading, setNoti } = useContext(Context);
  const [tipoSolicitud, setTipoSolicitud] = useState();
  const [tipoDocumento, setTipoDocumento] = useState();
  const [solicitudes, setSolicitudes] = useState([]);
  const [programa, setPrograma] = useState();
  const [plantel, setPlantel] = useState();
  const [loading, setLoadingPage] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getData({
        endpoint: `/solicitudesFolios?programaId=${programa}&tipoDocumentoId=${tipoDocumento}&tipoSolicitudFolioId=${tipoSolicitud}`,
      });
      if (response.statusCode === 200) {
        setSolicitudes(response.data);
      } else {
        setNoti({
          open: true,
          message: response.message || 'Error al cargar los datos',
          type: 'error',
        });
      }
      setLoading(false);
    } catch (error) {
      setNoti({
        open: true,
        message: 'Error al cargar los datos',
        type: 'error',
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tipoSolicitud && tipoDocumento) {
      fetchData();
      setButtonDisabled(false);
    }
  }, [tipoSolicitud, tipoDocumento]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return (
    <Layout title="Solicitudes de Folios">
      <FoliosForm
        setTipoSolicitud={setTipoSolicitud}
        setTipoDocumento={setTipoDocumento}
        setPrograma={setPrograma}
        setPlantel={setPlantel}
        setLoading={setLoadingPage}
      />
      {!buttonDisabled && (
        <FoliosTable
          tipoDocumento={tipoDocumento}
          tipoSolicitud={tipoSolicitud}
          programa={programa}
          plantel={plantel}
          solicitudes={solicitudes}
        />
      )}
    </Layout>
  );
}
