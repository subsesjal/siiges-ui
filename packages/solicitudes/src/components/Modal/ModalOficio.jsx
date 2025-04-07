import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import {
  DefaultModal,
  Input,
  Select,
  ButtonsModal,
  getData,
  updateRecord,
  InputDate,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';

export default function OficioModal({
  open,
  hideModal,
  downloadFile,
  solicitudId,
}) {
  const [formData, setFormData] = useState({
    oficioNumber: '',
    fechaEfecto: '',
    nombreAutorizado: '',
    fechaAutorizacion: '',
  });
  const [institucionId, setInstitucionId] = useState(null);
  const [nombresPropuestos, setNombresPropuestos] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await getData({
          endpoint: `/solicitudes/${solicitudId}/detalles`,
        });

        if (isMounted && response.statusCode === 200) {
          const ratificaciones = response.data?.programa?.plantel?.institucion
            ?.ratificacionesNombre || [];

          const transformedNombres = [
            { id: 1, nombre: ratificaciones[0]?.nombrePropuesto1 || '' },
            { id: 2, nombre: ratificaciones[0]?.nombrePropuesto2 || '' },
            { id: 3, nombre: ratificaciones[0]?.nombrePropuesto3 || '' },
          ].filter((item) => item.nombre);

          setInstitucionId(response.data?.programa?.plantel?.institucion?.id);
          setNombresPropuestos(transformedNombres);
        }
      } catch (errorMessage) {
        if (isMounted) {
          setError('Error al cargar los datos');
        }
      }
    };

    if (solicitudId) {
      fetchData();
    }

    return () => { isMounted = false; };
  }, [solicitudId]);

  const handleOnSubmit = async () => {
    const {
      fechaEfecto, oficioNumber, nombreAutorizado, fechaAutorizacion,
    } = formData;

    if (!fechaEfecto || !oficioNumber || !nombreAutorizado || !fechaAutorizacion) {
      setError('¡Por favor, completa todos los campos!');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const [response, responseInstitucion] = await Promise.all([
        updateRecord({
          data: {
            estatusSolicitudId: 11,
            programa: {
              fechaSurteEfecto: new Date(fechaEfecto).toISOString(),
              acuerdoRvoe: String(oficioNumber),
            },
          },
          endpoint: `/solicitudes/${solicitudId}`,
        }),
        updateRecord({
          data: {
            nombre: nombreAutorizado,
            ratificacionesNombre: [{
              nombreAutorizado,
              esNombreAutorizado: 1,
              fechaAutorizacion: new Date(fechaAutorizacion).toISOString(),
            }],
          },
          endpoint: `/instituciones/${institucionId}`,
        }),
      ]);

      if (response.statusCode === 200 && responseInstitucion.statusCode === 200) {
        downloadFile('ACUERDO_RVOE');
        hideModal();
      } else {
        setError(response.errorMessage || responseInstitucion.errorMessage);
      }
    } catch (errorMessage) {
      setError('Error al procesar la solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title="Oficio">
      <Grid container spacing={2}>
        {error && (
          <Grid item xs={12}>
            <div style={{ color: 'red' }}>{error}</div>
          </Grid>
        )}
        <Grid item xs={12}>
          <Input
            id="oficioNumber"
            label="Número de Acuerdo de RVOE"
            name="oficioNumber"
            value={formData.oficioNumber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            title="Nombres Propuestos"
            options={nombresPropuestos}
            name="nombreAutorizado"
            textValue
            value={formData.nombreAutorizado}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputDate
            id="fechaEfecto"
            label="Fecha en que surte efecto"
            name="fechaEfecto"
            value={formData.fechaEfecto}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputDate
            id="fechaAutorizacion"
            label="Fecha en que se autoriza el nombre"
            name="fechaAutorizacion"
            value={formData.fechaAutorizacion}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsModal
            confirm={handleOnSubmit}
            cancel={hideModal}
            disabled={isSubmitting}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

OficioModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired,
  solicitudId: PropTypes.number.isRequired,
};
