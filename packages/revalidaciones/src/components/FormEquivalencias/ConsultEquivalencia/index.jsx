import { Grid } from '@mui/material';
import { Context, getData, PositionDisplay } from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DatosSolicitante from '../Pages/DatosSolicitante';
import DatosInstitucion from '../Pages/DatosInstitucion';
import CargaMateriasEquivalentes from '../Pages/CargaMateriasEquivalentes';
import NavigationButtons from '../../../utils/NavigationButtons';
import ConsultDocumentos from '../Pages/ConsultDocumentos';

export default function ConsultEquivalencia() {
  const [currentPosition, setCurrentPosition] = useState(1);
  const router = useRouter();
  const { query } = router;
  const { setNoti, setLoading } = useContext(Context);
  const [form, setForm] = useState({});
  const [estados, setEstados] = useState([]);
  const [error, setError] = useState(false);

  const totalPositions = 4;

  useEffect(() => {
    if (!query.id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const estadosResponse = await getData({ endpoint: '/public/estados/' });
        if (estadosResponse.statusCode !== 200) {
          setError('Error al cargar los estados');
        }
        setEstados(estadosResponse.data);

        const equivalenciaResponse = await getData({ endpoint: `/solicitudesRevEquiv/${query.id}` });
        if (equivalenciaResponse.statusCode !== 200) {
          setError('¡No se encontró esta equivalencia!');
        }
        setForm(equivalenciaResponse.data);
      } catch (err) {
        setError(true);
        setNoti({
          open: true,
          message: err.message,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query.id]);

  if (error) {
    setNoti({
      open: true,
      message: error,
      type: error,
    });
  }

  const handleNext = () => {
    if (currentPosition < totalPositions) {
      setCurrentPosition((prevPosition) => prevPosition + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPosition > 1) {
      setCurrentPosition((prevPosition) => prevPosition - 1);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPosition) {
      case 1:
        return (
          <DatosSolicitante
            tipoSolicitud="equivalencia"
            form={form}
            estados={estados}
            disabled
          />
        );
      case 2:
        return (
          <DatosInstitucion
            form={form}
            estados={estados}
            disabled
          />
        );
      case 3:
        return (
          <ConsultDocumentos
            id={query.id}
          />
        );
      case 4:
        return (
          <CargaMateriasEquivalentes
            form={form}
            disabled
          />
        );
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <PositionDisplay
          currentPosition={currentPosition}
          totalPositions={totalPositions}
        />
      </Grid>
      <Grid item xs={12}>
        {renderCurrentPage()}
      </Grid>
      <Grid item xs={12}>
        <NavigationButtons
          currentPosition={currentPosition}
          totalPositions={totalPositions}
          onNext={handleNext}
          onPrevious={handlePrevious}
          disabled
          estatus={form.estatusSolicitudRevEquivId}
          id={form.id}
        />
      </Grid>
    </Grid>
  );
}
