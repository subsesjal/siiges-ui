import { Grid } from '@mui/material';
import { PositionDisplay } from '@siiges-ui/shared';
import React, { useState } from 'react';
import DatosSolicitante from './Pages/DatosSolicitante';
import DatosInstitucion from './Pages/DatosInstitucion';
import CargaMaterias from './Pages/CargaMaterias';
import CargaMateriasEquivalentes from './Pages/CargaMateriasEquivalentes';
import NavigationButtons from '../../utils/NavigationButtons';

export default function FormEquivalencias() {
  const [currentPosition, setCurrentPosition] = useState(1);
  const totalPositions = 4;

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
        return <DatosSolicitante />;
      case 2:
        return <DatosInstitucion />;
      case 3:
        return <CargaMaterias />;
      case 4:
        return <CargaMateriasEquivalentes />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <PositionDisplay currentPosition={currentPosition} totalPositions={totalPositions} />
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
        />
      </Grid>
    </Grid>
  );
}
