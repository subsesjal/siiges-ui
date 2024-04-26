import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { getInstitucionUsuario } from '@siiges-ui/instituciones';
import { Context } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import DatosPlantel from '../../Sections/DatosPlantel';
import DescripcionPlantel from '../../Sections/DescripcionPlantel';
import HigienePlantel from '../../Sections/HigienePlantel';
import InstitucionesAledanas from '../../Sections/InstitucionesAledanas';
import Infraestructura from '../../Sections/Infraestructura';
import RatificacionNombre from '../../Sections/RatificacionNombre';
import NombresPropuestos from '../../Sections/NombresPropuestos';
import { PlantelProvider } from '../../utils/Context/plantelContext';
import getSolicitudesById from '../../utils/getSolicitudesById';

export default function Plantel({
  nextModule,
  id,
  programaId,
  isLoading,
  setIsLoading,
}) {
  const [disabled, setDisabled] = useState(true);
  const { session } = useContext(Context);
  const institucion = getInstitucionUsuario(session);
  const [ratificacion, setRatificacion] = useState(<RatificacionNombre />);
  const [plantelesData, setPlantelesData] = useState({});
  const [selectedPlantel, setSelectedPlantel] = useState();
  const { solicitudes } = getSolicitudesById(id);

  useEffect(() => {
    setDisabled(!id);
    if (institucion) {
      if (
        !institucion.ratificacionNombre
        || (Array.isArray(institucion.ratificacionNombre)
          && institucion.ratificacionNombre.some(
            (item) => !item.esNombreAutorizado,
          ))
      ) {
        setRatificacion(
          <NombresPropuestos
            disabled={disabled}
            id={institucion.id}
            institucion={institucion}
          />,
        );
      }
    }
  }, [id, disabled, institucion]);

  useEffect(() => {
    if (solicitudes.programa) {
      setSelectedPlantel(solicitudes.programa.plantelId);
    }
  }, [solicitudes, id]);

  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 6);

  const renderSection6 = () => (section === 6 ? ratificacion : null);

  if (!institucion) {
    return null;
  }

  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <PlantelProvider
          selectedPlantel={selectedPlantel}
          institucion={institucion}
        >
          <SectionLayout
            sectionTitle="Plantel"
            sections={section}
            position={position}
            total="6"
            porcentage={porcentaje}
            nextModule={nextModule}
            next={next}
            prev={prev}
            id={id}
            loading={isLoading}
            setLoading={setIsLoading}
          >
            {section === 1 && (
              <DatosPlantel
                disabled={disabled}
                plantelesData={plantelesData}
                setPlantelesData={setPlantelesData}
              />
            )}
            {section === 2 && (
              <DescripcionPlantel
                disabled={disabled}
                plantelesData={plantelesData}
                setPlantelesData={setPlantelesData}
              />
            )}
            {section === 3 && (
              <HigienePlantel
                disabled={disabled}
                plantelId={plantelesData?.id}
              />
            )}
            {section === 4 && <InstitucionesAledanas disabled={disabled} />}
            {section === 5 && (
              <Infraestructura disabled={disabled} programaId={programaId} />
            )}
            {renderSection6()}
          </SectionLayout>
        </PlantelProvider>
      </CardContent>
    </Card>
  );
}

Plantel.defaultProps = {
  id: null,
  programaId: null,
};

Plantel.propTypes = {
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  programaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setIsLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
