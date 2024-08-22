import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { getInstituciones, getPlantelesByInstitucion, getProgramas } from '@siiges-ui/instituciones';
import { Context, Select } from '@siiges-ui/shared';
import React, { useState, useEffect, useContext } from 'react';

export default function ProgramasForm({ setProgramas, setLoading }) {
  const { setNoti, session } = useContext(Context);
  const [selectedInstitucion, setSelectedInstitucion] = useState('');
  const [selectedPlantel, setSelectedPlantel] = useState('');
  const [planteles, setPlanteles] = useState([]);
  const [isPlantelesDisabled, setIsPlantelesDisabled] = useState(true);

  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });

  const roles = ['representante', 'ce_ies'];
  const isRepresentante = roles.includes(session.rol);

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
          const transformedPlanteles = data.planteles.map((plantel) => ({
            id: plantel.id,
            nombre: `${plantel.domicilio.calle} ${plantel.domicilio.numeroExterior}`,
          }));
          setPlanteles(transformedPlanteles);
          console.log(data.planteles);
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
    if (isRepresentante && instituciones?.length) {
      const findIndexIntitucion = instituciones
        .findIndex(({ usuarioId }) => usuarioId === session.id);
      setSelectedInstitucion(instituciones[findIndexIntitucion]?.id);
    }
  }, [isRepresentante, instituciones]);
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Select
          title="Instituciones"
          name="instituciones"
          value={selectedInstitucion}
          options={instituciones}
          onchange={(event) => setSelectedInstitucion(event.target.value)}
          disabled={isRepresentante}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          title="Planteles"
          name="planteles"
          value={selectedPlantel}
          options={planteles || []}
          onchange={(event) => setSelectedPlantel(event.target.value)}
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
