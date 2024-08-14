import { Grid, Typography } from '@mui/material';
import {
  Button,
  ButtonsForm,
  Context,
  createRecord,
  getData,
  InputFile,
  InputNumber,
  LabelData,
  updateRecord,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

export default function FoliosData({ solicitudType, type }) {
  const [url, setUrl] = useState();
  const { setNoti, setLoading } = useContext(Context);
  const [id, setId] = useState(null);
  const [buttonAlumnos, setButtonAlumnos] = useState('Agregar Alumnos');
  const router = useRouter();
  const {
    tipoDocumento, tipoSolicitud, programa, id: editId,
  } = router.query;
  const [etiquetas, setEtiquetas] = useState({
    tipoDocumento: '',
    tipoSolicitudFolio: '',
    acuerdoRvoe: '',
    planEstudios: '',
    gradoAcademico: '',
  });

  const [formData, setFormData] = useState({
    folioPago: '',
    tipoDocumentoId: tipoDocumento || '',
    tipoSolicitudFolioId: tipoSolicitud || '',
    estatusSolicitudFolioId: 1,
    programaId: programa || '',
    fecha: dayjs(),
  });

  useEffect(() => {
    if (type === 'edit' && editId) {
      setButtonAlumnos('Editar Alumnos');
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getData({
            endpoint: `/solicitudesFolios/${editId}`,
          });
          const { data } = response;
          setFormData({
            folioPago: data.folioPago,
            tipoDocumentoId: data.tipoDocumentoId,
            tipoSolicitudFolioId: data.tipoSolicitudFolioId,
            estatusSolicitudFolioId: data.estatusSolicitudFolioI,
            programaId: data.programaId,
            fecha: dayjs(data.fecha),
          });
          setEtiquetas({
            tipoDocumento: data.tipoDocumento.nombre,
            tipoSolicitudFolio: data.tipoSolicitudFolio.nombre,
            acuerdoRvoe: data.programa.acuerdoRvoe,
            planEstudios: data.programa.nombre,
            gradoAcademico: data.programa.nivelId,
          });
          setId(editId);
        } catch (error) {
          setNoti({
            open: true,
            message: `Error al cargar la solicitud: ${error.message}`,
            type: 'error',
          });
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      };
      fetchData();
    }
  }, [type, editId]);

  useEffect(() => {
    if (tipoDocumento && tipoSolicitud && programa) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tipoDocumentoId: tipoDocumento,
        tipoSolicitudFolioId: tipoSolicitud,
        programaId: programa,
      }));
    }
  }, [tipoDocumento, tipoSolicitud, programa]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = type === 'edit'
        ? await updateRecord({
          data: formData,
          endpoint: `/solicitudesFolios/${id}`,
        })
        : await createRecord({
          data: formData,
          endpoint: '/solicitudesFolios',
        });

      if (response.statusCode === 200 || response.statusCode === 201) {
        setId(response.data.id);
        setNoti({
          open: true,
          message:
            type === 'edit'
              ? 'Éxito al actualizar la solicitud'
              : 'Éxito al crear la solicitud, ya puede agregar alumnos',
          type: 'success',
        });
      } else {
        setNoti({
          open: true,
          message:
            response.message
            || 'Error al procesar la solicitud, revise que los campos estén correctos',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: `Error al procesar la solicitud: ${error.message}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAlumno = () => {
    if (solicitudType === 'titulo') {
      router.push(
        `/serviciosEscolares/solicitudesFolios/alumnos/${id}/titulos?programa=${programa}`,
      );
    } else {
      router.push(
        `/serviciosEscolares/solicitudesFolios/alumnos/${id}/certificados?programa=${programa}`,
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos de la institución</Typography>
      </Grid>
      <Grid item xs={8}>
        <LabelData
          title="Institución"
          subtitle="Universidad Enrique Diáz de León"
        />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="RVOE" subtitle={etiquetas.acuerdoRvoe} />
      </Grid>
      <Grid item xs={8}>
        <LabelData
          title="Grado Académico"
          subtitle={etiquetas.gradoAcademico}
        />
      </Grid>
      <Grid item xs={4}>
        <LabelData title="Plan de Estudios" subtitle={etiquetas.planEstudios} />
      </Grid>
      <Grid item xs={8}>
        <LabelData title="Clave de centro de trabajo" subtitle="1234567" />
      </Grid>
      <Grid item xs={4}>
        <LabelData
          title="Tipo de Documento"
          subtitle={etiquetas.tipoDocumento}
        />
      </Grid>
      <Grid item xs={12}>
        <LabelData
          title="Tipo de Solicitud"
          subtitle={etiquetas.tipoSolicitudFolio}
        />
      </Grid>
      <Grid item xs={4}>
        <InputNumber
          label="Número de recibo de pago oficial"
          id="folioPago"
          name="folioPago"
          value={formData.folioPago}
          onchange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFile
          label="Recibo de Pago"
          id={5}
          tipoDocumento="RECIBO_PAGO"
          tipoEntidad="ALUMNO"
          url={url}
          setUrl={setUrl}
        />
      </Grid>
      {id && (
        <Grid item xs={4}>
          <Button text={buttonAlumnos} onClick={handleAddAlumno} />
        </Grid>
      )}
      <Grid item xs={id ? 8 : 12}>
        <ButtonsForm
          confirm={handleConfirm}
          cancel={() => {
            router.back();
          }}
        />
      </Grid>
    </Grid>
  );
}

FoliosData.propTypes = {
  solicitudType: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
