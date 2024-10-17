import { Grid } from '@mui/material';
import { Context, PositionDisplay } from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import DatosSolicitante from './Pages/DatosSolicitante';
import DatosInstitucion from './Pages/DatosInstitucion';
import CargaMaterias from './Pages/CargaMaterias';
import CargaMateriasEquivalentes from './Pages/CargaMateriasEquivalentes';
import NavigationButtons from '../../utils/NavigationButtons';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function FormEquivalencias() {
  const { setNoti } = useContext(Context);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [filesData, setFilesData] = useState({});
  const [form, setForm] = useState({});
  const [estados, setEstados] = useState([]);
  const totalPositions = 4;

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch(`${domain}/api/v1/public/estados/`, {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setEstados(data.data);
      } catch (error) {
        console.error('¡Error al buscar Estados!:', error);
      }
    };

    fetchEstados();
  }, []);

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

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOnSubmit = async () => {
    const formData = new FormData();

    Object.keys(filesData).forEach((key) => {
      formData.append(key, filesData[key]);
    });

    const data = {
      ...form,
    };

    formData.append('DATA', JSON.stringify(data));

    try {
      const response = await fetch(`${domain}/api/v1/public/solicitudesRevEquiv/`, {
        method: 'POST',
        headers: {
          api_key: apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setNoti({
        open: true,
        message: 'Se envió la solicitud con éxito',
        type: 'success',
      });
    } catch (error) {
      console.error('¡Error al enviar el formulario!', error);
      setNoti({
        open: true,
        message: 'Ocurrió un error al enviar la solicitud, intente de nuevo',
        type: 'error',
      });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPosition) {
      case 1:
        return (
          <DatosSolicitante
            form={form}
            handleOnChange={handleOnChange}
            estados={estados}
          />
        );
      case 2:
        return (
          <DatosInstitucion
            form={form}
            handleOnChange={handleOnChange}
            estados={estados}
          />
        );
      case 3:
        return (
          <CargaMaterias
            form={form}
            handleOnChange={handleOnChange}
            setFilesData={setFilesData} // Pasar la función para actualizar los archivos
          />
        );
      case 4:
        return (
          <CargaMateriasEquivalentes
            form={form}
            handleOnChange={handleOnChange}
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
          handleOnSubmit={handleOnSubmit}
        />
      </Grid>
    </Grid>
  );
}
