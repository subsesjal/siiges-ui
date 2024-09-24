import { Grid } from '@mui/material';
import { PositionDisplay } from '@siiges-ui/shared';
import React, { useState } from 'react';
import NavigationButtons from '../../utils/NavigationButtons';
import DatosSolicitante from './Pages/DatosSolicitante';
import DatosInstitucion from './Pages/DatosInstitucion';
import CargaMaterias from './Pages/CargaMaterias';

export default function FormRevalidaciones() {
  const [currentPosition, setCurrentPosition] = useState(1);
  const totalPositions = 3;

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
