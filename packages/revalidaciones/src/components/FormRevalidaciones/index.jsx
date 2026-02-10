import { Grid } from '@mui/material';
import { Context, PositionDisplay } from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavigationButtons from '../../utils/NavigationButtons';
import DatosSolicitante from './Pages/DatosSolicitante';
import DatosInstitucion from './Pages/DatosInstitucion';
import CargaMaterias from './Pages/CargaMaterias';
import CargaMateriasEquivalentes from '../FormEquivalencias/Pages/CargaMateriasEquivalentes';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function FormRevalidaciones() {
  const [currentPosition, setCurrentPosition] = useState(1);
  const [totalPositions, setTotalPositions] = useState(4);
  const { setNoti } = useContext(Context);
  const router = useRouter();
  const [filesData, setFilesData] = useState({});
  const [estados, setEstados] = useState([]);
  const [paises, setPaises] = useState([]);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [validateFields, setValidateFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calificacionesReglas, setCalificacionesReglas] = useState([]);
  const [form, setForm] = useState({
    tipoTramiteId: null,
    estatusSolicitudRevEquivId: 1,
    fecha: new Date().toISOString().split('T')[0],
    interesado: {
      persona: {
        domicilio: {
          calle: '',
          numeroExterior: '',
          numeroInterior: '',
          colonia: '',
          codigoPostal: '',
          municipioId: '',
          estadoId: '',
        },
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        sexo: '',
        nacionalidad: '',
        celular: '',
        curp: '',
        correoPrimario: '',
      },
      institucionProcedencia: {
        tipoInstitucionId: 1,
        nombre: '',
        estadoId: 33,
        nivelId: '',
        nombreCarrera: '',
      },
      institucionDestino: {
        tipoInstitucionId: '',
        programaId: '',
        nombre: '',
        acuerdoRvoe: '',
        nivel: '',
        nombreCarrera: '',
      },
    },
  });

  useEffect(() => {
    if ([1, 2, 3].includes(form.tipoTramiteId)) {
      setTotalPositions(4);

      setForm((prevForm) => ({
        ...prevForm,
        interesado: {
          ...prevForm.interesado,
          asignaturasAntecedentesEquivalentes: [],
        },
      }));
    } else {
      setTotalPositions(3);

      setForm((prevForm) => {
        const { asignaturasAntecedentesEquivalentes, ...restInteresado } = prevForm.interesado;
        return {
          ...prevForm,
          interesado: restInteresado,
        };
      });
    }
  }, [form.tipoTramiteId]);

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

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch(`${domain}/api/v1/public/paises/`, {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setPaises(data.data);
      } catch (error) {
        console.error('¡Error al buscar Paises!:', error);
      }
    };

    fetchPaises();
  }, []);

  const handleNext = () => {
    setValidateFields(true);
  };

  useEffect(() => {
    if (validateFields && !nextDisabled) {
      if (currentPosition < totalPositions) {
        setCurrentPosition((prev) => prev + 1);
      }
      setValidateFields(false);
    }
  }, [validateFields, nextDisabled]);

  const handlePrevious = () => {
    if (currentPosition > 1) {
      setCurrentPosition((prevPosition) => prevPosition - 1);
    }
  };

  const handleOnChange = (event, path = []) => {
    const { name, value } = event.target;

    setForm((prevForm) => {
      const updateNestedValue = (obj, nestedPath) => {
        if (nestedPath.length === 0) {
          return { ...obj, [name]: value };
        }

        const [firstKey, ...restPath] = nestedPath;
        return {
          ...obj,
          [firstKey]: updateNestedValue(obj[firstKey] || {}, restPath),
        };
      };

      return updateNestedValue(prevForm, path);
    });
  };

  const handleOnSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData();

    try {
      Object.keys(filesData).forEach((key) => {
        const archivoAdjunto = filesData[key].formData.get('archivoAdjunto');
        if (archivoAdjunto) {
          formData.append(key, archivoAdjunto);
        } else {
          console.error(`¡No se encontró el archivo para ${key}!`);
        }
      });

      formData.append('DATA', JSON.stringify(form));

      const response = await fetch(
        `${domain}/api/v1/public/solicitudesRevEquiv/`,
        {
          method: 'POST',
          headers: {
            api_key: apiKey,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('¡Error al enviar el formulario!');
      }

      const result = await response.json();
      const folio = result?.data?.folioSolicitud;

      if (!folio) {
        throw new Error('No se recibió el folio de la solicitud');
      }

      setNoti({
        open: true,
        message: 'Se envió la solicitud con éxito',
        type: 'success',
      });
      router.push(`/consultaRevEquiv/${folio}/consultarFolio`);
    } catch (error) {
      console.error('¡Error al enviar el formulario!', error);
      setNoti({
        open: true,
        message: '¡Ocurrió un error al enviar la solicitud, intente de nuevo!',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPosition) {
      case 1:
        return (
          <DatosSolicitante
            tipoSolicitud="revalidacion"
            form={form}
            handleOnChange={handleOnChange}
            estados={estados}
            validateFields={validateFields}
            setNextDisabled={setNextDisabled}
          />
        );
      case 2:
        return (
          <DatosInstitucion
            form={form}
            handleOnChange={handleOnChange}
            paises={paises}
            validateFields={validateFields}
            setNextDisabled={setNextDisabled}
            setCalificacionesReglas={setCalificacionesReglas}
          />
        );
      case 3:
        return (
          <CargaMaterias
            filesData={filesData}
            setFilesData={setFilesData}
            setNextDisabled={setNextDisabled}
          />
        );
      case 4:
        return [1, 2, 3].includes(form.tipoTramiteId) ? (
          <CargaMateriasEquivalentes
            form={form}
            calificacionesReglas={calificacionesReglas}
            handleOnChange={handleOnChange}
          />
        ) : null;
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
          title="Revalidaciones"
          isSubmitting={isSubmitting}
        />
      </Grid>
    </Grid>
  );
}
