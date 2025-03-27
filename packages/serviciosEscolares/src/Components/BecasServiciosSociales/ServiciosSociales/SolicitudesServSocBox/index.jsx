import {
  Tabs, Tab, Box,
} from '@mui/material';
import { Context } from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ButtonsBox from './ButtonsBox';
import SolicitudServSocSection from './SolicitudesServSocSection';
import ButtonsReviewBox from './ButtonsReviewBox';
import {
  fetchProgramaPlantelData, fetchSolicitudData, handleSaveSolicitud, handleUpdateSolicitud,
} from '../utils';
import AlumnosServicioSection from './AlumnosServicioSection';

export default function SolicitudesServSocBox({ type }) {
  const EN_CAPTURA = 1;
  const DATOS_SOLICITUD = 0;
  const ALUMNOS = 1;
  const { setNoti, session, setLoading } = useContext(Context);
  const [tabIndex, setTabIndex] = useState(DATOS_SOLICITUD);
  const [data, setData] = useState({});
  const [solicitudId, setSolicitudId] = useState('');
  const [reqData, setReqData] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({});
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();
  const { programa, institucion, id } = router.query;

  const validateData = {
    consultar: () => (!programa || !institucion) && router.back(),
    crear: () => (!programa || !institucion) && router.back(),
    editar: () => (!programa || !institucion || !id) && router.back(),
  };

  useEffect(() => {
    validateData[type]();
    fetchProgramaPlantelData(setNoti, setLoading, setData, programa, institucion);

    if (id && type !== 'crear') {
      setSolicitudId(id);
      fetchSolicitudData(setNoti, setLoading, setFormData, id);
    } else {
      setReqData({
        usuarioId: session.id,
        programaId: programa,
        estatusSolicitudServicioSocialId: EN_CAPTURA,
        domicilio: {
          municipioId: null,
          estadoId: 14,
          calle: '',
          numeroExterior: '',
          numeroInterior: '',
          colonia: '',
          codigoPostal: '',
        },
      });
    }

    setDisabled(type === 'consultar');
  }, [type]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const hasValidProperties = (properties = []) => {
    if (!data || typeof data !== 'object') return false;
    if (!Array.isArray(properties)) return false;

    return properties.every((prop) => data[prop] && typeof data[prop] === 'object' && Object.keys(data[prop]).length > 0);
  };

  useEffect(() => {
    if (tabIndex === 1) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [tabIndex]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Datos de la Solicitud" />
          <Tab label="Alumnos" disabled={!solicitudId} />
        </Tabs>
      </Box>
      {tabIndex === DATOS_SOLICITUD && hasValidProperties(['programa', 'plantel']) && (
        <SolicitudServSocSection
          programa={data?.programa}
          plantel={data?.plantel}
          formData={formData}
          reqData={reqData}
          setReqData={setReqData}
          disabled={disabled}
        />
      )}
      {tabIndex === ALUMNOS && hasValidProperties(['programa', 'plantel']) && (
        <AlumnosServicioSection
          programa={data?.programa}
          solicitudId={solicitudId}
          disabled={disabled}
        />
      )}
      {session.rol === 'serv_soc_ies' ? (
        <ButtonsBox
          cancel={() => router.push('/serviciosEscolares/servicioSocial')}
          save={() => handleSaveSolicitud(
            setNoti,
            setLoading,
            setSolicitudId,
            reqData,
            setTabIndex,
          )}
          update={() => handleUpdateSolicitud(
            setNoti,
            setLoading,
            reqData,
            solicitudId,
          )}
          isSaved={isSaved}
          solicitudId={solicitudId}
          setIsSaved={setIsSaved}
          saveIsDisabled={disabled}
        />
      ) : (
        <ButtonsReviewBox
          router={router}
          solicitudId={solicitudId}
          formData={formData}
          reqData={reqData}
        />
      )}
    </Box>
  );
}

SolicitudesServSocBox.defaultProps = {
  type: null,
};

SolicitudesServSocBox.propTypes = {
  type: PropTypes.string,
};
