import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { getInstituciones, getPlantelesByInstitucion, getProgramas } from '@siiges-ui/instituciones';
import { Context, Select } from '@siiges-ui/shared';
import React, { useState, useEffect, useContext } from 'react';

export default function ProgramasForm({ setProgramas, setLoading }) {
  const { setNoti, session } = useContext(Context);
  const [selectedInstitucion, setSelectedInstitucion] = useState(() => localStorage.getItem('selectedInstitucion') || '');
  const [selectedPlantel, setSelectedPlantel] = useState(() => localStorage.getItem('selectedPlantel') || '');
  const [planteles, setPlanteles] = useState([]);
  const [isPlantelesDisabled, setIsPlantelesDisabled] = useState(true);

  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });
  const institucionesOrdenadas = instituciones?.slice().sort(
    (a, b) => a.nombre.localeCompare(b.nombre),
  ) || [];

  const roles = ['representante', 'ce_ies'];
  const isRepresentante = roles.includes(session.rol);

  useEffect(() => {
    if (selectedInstitucion) {
      localStorage.setItem('selectedInstitucion', selectedInstitucion);
    }
  }, [selectedInstitucion]);

  useEffect(() => {
    if (selectedPlantel) {
      localStorage.setItem('selectedPlantel', selectedPlantel);
    }
  }, [selectedPlantel]);

  useEffect(() => {
    if (selectedInstitucion) {
      getPlantelesByInstitucion(selectedInstitucion, (error, data) => {
        if (error) {
          setNoti({
            open: true,
            message: `¡Error al obtener planteles!: ${error.message}`,
            type: 'error',
          });
          setPlanteles([]);
          setIsPlantelesDisabled(true);
        } else {
          const transformedPlanteles = data.planteles
            .map((plantel) => ({
              id: plantel.id,
              nombre: `${plantel.domicilio.calle} ${plantel.domicilio.numeroExterior}`,
            }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre));

          setPlanteles(transformedPlanteles);
          setIsPlantelesDisabled(false);
        }
      });
    } else {
      setPlanteles([]);
      setIsPlantelesDisabled(true);
    }
    if (selectedPlantel) {
      getProgramas(selectedPlantel, (error, data) => {
        if (error) {
          if (error.message === '404') {
            setNoti({
              open: true,
              message: '¡No se encontraron programas para el plantel seleccionado!.',
              type: 'warning',
            });
          } else {
            setNoti({
              open: true,
              message: `¡Error al obtener programas!: ${error.message}`,
              type: 'error',
            });
          }
        } else {
          if (data.programas.length === 0) {
            setNoti({
              open: true,
              message: '¡No se encontraron programas para el plantel seleccionado!.',
              type: 'warning',
            });
          }
          setProgramas(data.programas);
        }
      });
    }
  }, [selectedInstitucion, selectedPlantel]);

  useEffect(() => {
    if (isRepresentante && institucionesOrdenadas.length) {
      const findIndexIntitucion = institucionesOrdenadas
        .findIndex(({ usuarioId }) => usuarioId === session.id);
      setSelectedInstitucion(institucionesOrdenadas[findIndexIntitucion]?.id);
    }
  }, [isRepresentante, institucionesOrdenadas]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Select
          title="Instituciones"
          name="instituciones"
          value={selectedInstitucion}
          options={institucionesOrdenadas}
          onChange={(event) => setSelectedInstitucion(event.target.value)}
          disabled={isRepresentante}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          title="Planteles"
          name="planteles"
          value={selectedPlantel}
          options={planteles || []}
          onChange={(event) => setSelectedPlantel(event.target.value)}
          disabled={isPlantelesDisabled}
        />
      </Grid>
    </Grid>
  );
}

ProgramasForm.propTypes = {
  setProgramas: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
