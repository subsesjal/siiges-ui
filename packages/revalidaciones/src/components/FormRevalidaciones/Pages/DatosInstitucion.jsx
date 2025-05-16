import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../../utils/FetchData';

const domain = process.env.NEXT_PUBLIC_URL;

export default function DatosInstitucion({
  form,
  handleOnChange,
  paises,
  setNextDisabled,
  validateFields,
}) {
  const [tipoInstituciones, setTipoInstituciones] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [grados, setGrados] = useState([]);
  const [institucionId, setInstitucionId] = useState(
    form.interesado?.institucionDestino?.institucionId || '',
  );
  const [tipoInstitucionId, setTipoInstitucionId] = useState(
    form.interesado?.institucionDestino?.tipoInstitucionId || '',
  );
  const [touched, setTouched] = useState({});
  const [rvoes, setRvoes] = useState([]);
  const [rvoesList, setRvoesList] = useState([]);
  const [rvoeError, setRvoeError] = useState('');
  const [carrera, setCarrera] = useState([]);

  const mapNivelesData = (item) => ({
    id: item.id,
    nombre: item.descripcion,
  });

  useEffect(() => {
    fetchData(
      `${domain}/api/v1/public/instituciones/tipoInstituciones`,
      setTipoInstituciones,
    );
    fetchData(
      `${domain}/api/v1/public/niveles/`,
      setGrados,
      mapNivelesData,
      true,
    );
  }, []);

  useEffect(() => {
    if (tipoInstitucionId) {
      fetchData(
        `${domain}/api/v1/public/instituciones?tipoInstitucionId=${tipoInstitucionId}`,
        setInstituciones,
      );
    }
  }, [tipoInstitucionId]);

  const fetchInstituciones = async () => {
    fetchData(
      `${domain}/api/v1/public/instituciones?tipoInstitucionId=${tipoInstitucionId}`,
      setInstituciones,
    );
  };

  const fetchRvoes = async () => {
    fetchData(
      `${domain}/api/v1/public/programas/instituciones/${institucionId}`,
      setRvoes,
    );
  };

  useEffect(() => {
    if (rvoes && rvoes.length > 0) {
      const mappedRvoes = rvoes.map(({ id, acuerdoRvoe }) => ({
        id,
        nombre: acuerdoRvoe,
      }));
      setRvoesList(mappedRvoes);
    } else {
      setRvoesList([]);
    }
  }, [rvoes]);

  useEffect(() => {
    if (tipoInstitucionId === 1) {
      fetchInstituciones();
    }
  }, [tipoInstitucionId]);

  useEffect(() => {
    if (institucionId) {
      fetchRvoes();
    }
  }, [institucionId]);

  const handleChange = (e, path) => {
    const { name } = e.target;
    handleOnChange(e, path);

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleTipoInstitucionChange = (event) => {
    const selectedTipoInstitucionId = event.target.value;
    setTipoInstitucionId(selectedTipoInstitucionId);
    handleChange(event, ['interesado', 'institucionDestino']);
  };

  const fetchProgramas = async (acuerdoRvoe) => {
    try {
      const response = await fetch(
        `${domain}/api/v1/public/programas?acuerdoRvoe=${acuerdoRvoe}`,
        {
          headers: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setProgramas(data.data);
      setRvoeError('');
      if (!response.ok) {
        setRvoeError('RVOE inválido');
      }
    } catch (error) {
      console.error('Error fetching Programas:', error);
      setRvoeError('RVOE inválido');
    }
  };

  const handleRvoeOnBlur = (event) => {
    const acuerdoRvoe = event.target.value;
    if (tipoInstitucionId === 1) {
      fetchProgramas(acuerdoRvoe);
    }
    handleOnChange(event, ['interesado', 'institucionDestino']);
  };

  const validateField = (value, required, fieldName) => (touched[fieldName] && required && !value ? 'Este campo es requerido' : '');

  useEffect(() => {
    if (validateFields) {
      const requiredFields = [
        {
          path: ['interesado', 'institucionProcedencia', 'nombre'],
          value: form.interesado?.institucionProcedencia?.nombre,
        },
        {
          path: ['interesado', 'institucionProcedencia', 'nombreCarrera'],
          value: form.interesado?.institucionProcedencia?.nombreCarrera,
        },
        {
          path: ['interesado', 'institucionProcedencia', 'nivelId'],
          value: form.interesado?.institucionProcedencia?.nivelId,
        },
        {
          path: ['interesado', 'institucionProcedencia', 'paisId'],
          value: form.interesado?.institucionProcedencia?.paisId,
        },
        {
          path: ['interesado', 'institucionDestino', 'tipoInstitucionId'],
          value: tipoInstitucionId,
        },
        {
          path: ['interesado', 'institucionDestino', 'nivelId'],
          value: form.interesado?.institucionDestino?.nivel,
        },
      ];

      const isAnyFieldEmpty = requiredFields.some((field) => {
        if (Array.isArray(field.value)) {
          return field.value.length === 0;
        }
        return !field.value;
      });

      setNextDisabled(isAnyFieldEmpty);

      if (isAnyFieldEmpty) {
        const newTouched = {};
        requiredFields.forEach((field) => {
          newTouched[field.path[field.path.length - 1]] = true;
        });
        setTouched(newTouched);
      }
    }
  }, [validateFields, form, tipoInstitucionId, setNextDisabled]);

  const handleRvoeChange = (event) => {
    const selectedId = event.target.value;
    const selectedRvoe = rvoes.find((rvoe) => rvoe.id === selectedId);

    if (selectedRvoe) {
      setCarrera(selectedRvoe.nombre);
    } else {
      setCarrera('');
    }

    handleOnChange(event, ['interesado', 'institucionDestino']);
  };

  const handleInstitucionChange = (event) => {
    const programaId = event.target.value;
    setInstitucionId(programaId);

    handleOnChange(event, ['interesado', 'institucionDestino']);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Subtitle>Datos de la Institución de procedencia</Subtitle>
      </Grid>
      {[
        {
          id: 'nombreInstitucion',
          label: 'Nombre de la Institución',
          name: 'nombre',
          value: form.interesado?.institucionProcedencia?.nombre,
        },
        {
          id: 'nombreCarrera',
          label: 'Nombre de la Carrera',
          name: 'nombreCarrera',
          value: form.interesado?.institucionProcedencia?.nombreCarrera,
        },
      ].map((field) => (
        <Grid item xs={6} key={field.id}>
          <Input
            id={field.id}
            label={field.label}
            name={field.name}
            value={field.value || ''}
            onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
            required
            errorMessage={validateField(field.value, true, field.name)}
          />
        </Grid>
      ))}

      <Grid item xs={4}>
        <Select
          title="Nivel Académico Procedente"
          options={grados}
          name="nivelId"
          value={form.interesado?.institucionProcedencia?.nivelId || ''}
          onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
          required
          errorMessage={validateField(
            form.interesado?.institucionProcedencia?.nivelId,
            true,
            'nivelId',
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          id="anoFinalizacionCarrera"
          label="Año de Finalización de la Carrera"
          name="anoFinalizacionCarrera"
          value={
            form.interesado?.institucionProcedencia?.anoFinalizacionCarrera
            || ''
          }
          onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          id="anoInicioCarrera"
          label="Año de Inicio de Realización de Estudios"
          name="anoInicioCarrera"
          value={
            form.interesado?.institucionProcedencia?.anoInicioCarrera || ''
          }
          onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="País"
          options={paises}
          name="paisId"
          value={form.interesado?.institucionProcedencia?.paisId || ''}
          onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
          required
          errorMessage={validateField(
            form.interesado?.institucionProcedencia?.paisId,
            true,
            'paisId',
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Subtitle>Datos de la Institución de destino</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Tipo de Institución"
          name="tipoInstitucionId"
          options={tipoInstituciones}
          value={
            form.interesado?.institucionDestino?.tipoInstitucionId
            || tipoInstitucionId
          }
          onChange={handleTipoInstitucionChange}
        />
      </Grid>
      <Grid item xs={9}>
        {tipoInstitucionId === 1 ? (
          <Select
            title="Instituciones"
            options={instituciones}
            name="institucionId"
            value={form.interesado?.institucionDestino?.institucionId || ''}
            onChange={handleInstitucionChange}
          />
        ) : (
          <Input
            id="institucionNombre"
            label="Instituciones de Educación Superior"
            name="nombre"
            value={form.interesado?.institucionDestino?.nombre || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
          />
        )}
      </Grid>
      {tipoInstitucionId !== 1 && (
        <>
          <Grid item xs={3}>
            <Select
              title="Nivel Académico Destino"
              options={grados}
              name="nivel"
              value={form.interesado?.institucionDestino?.nivel || ''}
              onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              id="rvoe"
              label="RVOE"
              name="acuerdoRvoe"
              value={form.interesado?.institucionDestino?.acuerdoRvoe || ''}
              onBlur={handleRvoeOnBlur}
              errorMessage={rvoeError}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="nombreCarreraDestino"
              label="Nombre de la Carrera (Destino)"
              name="nombreCarrera"
              value={programas?.nombre || ''}
              onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
              disabled={tipoInstitucionId === 1}
            />
          </Grid>
        </>
      )}
      {tipoInstitucionId === 1 && (
        <>
          <Grid item xs={3}>
            <Select
              title="RVOE"
              options={rvoesList}
              name="programaId"
              value={form.interesado?.institucionDestino?.programaId || ''}
              onChange={handleRvoeChange}
              errorMessage={rvoeError}
            />
          </Grid>
          <Grid item xs={9}>
            <Input
              id="nombreCarreraDestino"
              label="Nombre de la Carrera (Destino)"
              name="nombreCarrera"
              value={carrera || ''}
              disabled
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

DatosInstitucion.propTypes = {
  form: PropTypes.shape({
    interesado: PropTypes.shape({
      institucionProcedencia: PropTypes.shape({
        nombre: PropTypes.string,
        paisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombreCarrera: PropTypes.string,
        nivelId: PropTypes.number,
        anoFinalizacionCarrera: PropTypes.string,
        anoInicioCarrera: PropTypes.string,
        telefonoInstitucion: PropTypes.string,
        paginaWebInstitucion: PropTypes.string,
        correoInstitucion: PropTypes.string,
      }),
      institucionDestino: PropTypes.shape({
        tipoInstitucionId: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        institucionId: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        programaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombre: PropTypes.string,
        acuerdoRvoe: PropTypes.string,
        nombreCarrera: PropTypes.string,
        nivel: PropTypes.string,
        planEstudios: PropTypes.string,
      }),
    }),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  paises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setNextDisabled: PropTypes.func.isRequired,
  validateFields: PropTypes.bool.isRequired,
};
