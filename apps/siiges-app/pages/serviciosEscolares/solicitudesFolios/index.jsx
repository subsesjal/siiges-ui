import {
  AdminTable,
  FoliosForm,
  FoliosTable,
} from '@siiges-ui/serviciosescolares';
import { Context, getData, Layout } from '@siiges-ui/shared';
import React, { useState, useContext, useEffect } from 'react';

export default function SolicitudesFolios() {
  const { setLoading, setNoti, session } = useContext(Context);
  const [tipoSolicitud, setTipoSolicitud] = useState(null);
  const [tipoDocumento, setTipoDocumento] = useState(null);
  const [estatus, setEstatus] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [programa, setPrograma] = useState(null);
  const [plantel, setPlantel] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const isAdmin = session.rol === 'admin';

  const fetchData = async () => {
    try {
      setLoading(true);
      const endpoint = isAdmin
        ? '/solicitudesFolios'
        : `/solicitudesFolios?programaId=${programa}&tipoDocumentoId=${tipoDocumento}&tipoSolicitudFolioId=${tipoSolicitud}`;

      const response = await getData({ endpoint });
      if (response.statusCode === 200) {
        setSolicitudes(response.data);
      } else {
        setNoti({
          open: true,
          message: response.message || 'Error al cargar los datos',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message:
          '¡Error, revise que todos los campos estén seleccionados correctamente!',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const shouldFetchData = isAdmin || (tipoSolicitud && tipoDocumento);

    if (shouldFetchData) {
      fetchData();
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [isAdmin, tipoSolicitud, tipoDocumento, programa, plantel, estatus]);

  return (
    <Layout title="Solicitudes de Folios">
      <FoliosForm
        setTipoSolicitud={setTipoSolicitud}
        setTipoDocumento={setTipoDocumento}
        setEstatus={setEstatus}
        setPrograma={setPrograma}
        setPlantel={setPlantel}
        setLoading={setLoading}
      />
      {isAdmin ? (
        <AdminTable
          tipoDocumento={tipoDocumento}
          tipoSolicitud={tipoSolicitud}
          estatus={estatus}
          programa={programa}
          plantel={plantel}
          solicitudes={solicitudes}
        />
      ) : (
        !buttonDisabled && (
          <FoliosTable
            tipoDocumento={tipoDocumento}
            tipoSolicitud={tipoSolicitud}
            programa={programa}
            plantel={plantel}
            solicitudes={solicitudes}
          />
        )
      )}
    </Layout>
  );
}
