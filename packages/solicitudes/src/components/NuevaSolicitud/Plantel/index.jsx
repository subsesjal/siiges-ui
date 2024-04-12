import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import { getInstitucionUsuario } from '@siiges-ui/instituciones';
import { Context } from '@siiges-ui/shared';
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

export default function Plantel({ nextModule, id, programaId }) {
  const [disabled, setDisabled] = useState(true);
  const { session } = useContext(Context);
  const { query } = useRouter();
  const { institucion, loading } = getInstitucionUsuario(session);
  const [ratificacion, setRatificacion] = useState(<RatificacionNombre />);
  const [plantelesData, setPlantelesData] = useState({
    plantelId: query.plantel,
  });

  useEffect(() => {
    setDisabled(!id);
    if (!loading && institucion) {
      if (
        !institucion.ratificacionNombre
        || (Array.isArray(institucion.ratificacionNombre)
          && institucion.ratificacionNombre.some((item) => !item.esNombreAutorizado))
      ) {
        setRatificacion(<NombresPropuestos disabled={disabled} id={institucion.id} />);
      }
    }
  }, [id, loading, disabled, institucion]);

  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 6);

  const renderSection6 = () => (section === 6 ? ratificacion : null);

  if (loading) {
    return null;
  }

  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <PlantelProvider plantelId={query.plantel} institucionId={institucion?.id}>
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
            {section === 3 && <HigienePlantel disabled={disabled} />}
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
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  programaId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};
