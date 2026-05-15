import { AdminTable, FoliosForm, FoliosTable } from '@siiges-ui/serviciosescolares';
import {
  useAuth, useUI, getData, Layout,
} from '@siiges-ui/shared';
import React, { useState, useEffect, useCallback } from 'react';

const TIPO_DOCUMENTO_TITULO = 1;

export default function SolicitudesFoliosTitulo() {
  const { session } = useAuth();
  const { setLoading, setNoti } = useUI();

  const [tipoSolicitud, setTipoSolicitud] = useState(null);
  const [estatus, setEstatus] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [programa, setPrograma] = useState(null);
  const [plantel, setPlantel] = useState(null);
  const [institucion, setInstitucion] = useState(null);

  const isAdmin = session.rol === 'admin';
  const isRepresentante = session.rol === 'representante';
  const isCeIes = session.rol === 'ce_ies';
  const isCeSicyt = session.rol === 'ce_sicyt';

  const buildEndpoint = useCallback(() => {
    const params = new URLSearchParams();
    if (institucion) params.append('institucionId', institucion);
    if (plantel) params.append('plantelId', plantel);
    if (programa) params.append('programaId', programa);
    params.append('tipoDocumentoId', TIPO_DOCUMENTO_TITULO);
    if (tipoSolicitud) params.append('tipoSolicitudFolioId', tipoSolicitud);

    if (estatus.length > 0) {
      params.append('estatus', estatus.join(','));
    }

    return `/solicitudesFolios?${params.toString()}`;
  }, [institucion, plantel, programa, tipoSolicitud, estatus]);

  const fetchData = useCallback(async () => {
    if (!institucion && !plantel && !isAdmin && !isCeSicyt) return;

    try {
      setLoading(true);
      const endpoint = buildEndpoint();
      const response = await getData({ endpoint });
      if (response.statusCode === 200) {
        setSolicitudes(response.data);
      } else {
        setNoti({
          open: true,
          message: response.message || 'Error al cargar datos',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: 'Error al obtener datos, revise los filtros',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [institucion, plantel, isAdmin, isCeSicyt, setLoading, buildEndpoint, setNoti]);

  useEffect(() => {
    if (isAdmin || isCeSicyt) {
      setEstatus([2]);
    }
  }, [isAdmin, isCeSicyt]);

  useEffect(() => {
    if (institucion || plantel || programa || tipoSolicitud || estatus.length > 0) {
      fetchData();
    } else {
      setSolicitudes([]);
    }
  }, [institucion, plantel, programa, tipoSolicitud, estatus, fetchData]);

  const renderTable = () => {
    if (isAdmin || isCeSicyt) {
      return (
        <AdminTable
          solicitudes={solicitudes}
          isAdmin={isAdmin}
          isCeSicyt={isCeSicyt}
        />
      );
    }

    if (isRepresentante || isCeIes) {
      return (
        <FoliosTable
          tipoDocumento={TIPO_DOCUMENTO_TITULO}
          tipoSolicitud={tipoSolicitud}
          programa={programa}
          plantel={plantel}
          institucion={institucion}
          solicitudes={solicitudes}
        />
      );
    }
    return null;
  };

  return (
    <Layout title="Solicitudes de Folios - Título">
      <FoliosForm
        setTipoSolicitud={setTipoSolicitud}
        setEstatus={setEstatus}
        estatus={estatus}
        setPrograma={setPrograma}
        setPlantel={setPlantel}
        setInstitucion={setInstitucion}
        setLoading={setLoading}
        tipoDocumento={TIPO_DOCUMENTO_TITULO}
      />
      {renderTable()}
    </Layout>
  );
}
