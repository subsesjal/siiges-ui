import React, { useState } from 'react';
import { Grid } from '@mui/material';
import {
  BinarySelect, ButtonSimple, Select, useUI,
} from '@siiges-ui/shared';
import {
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

export default function MatriculaActivaForm({
  formData,
  setFormData,
  onSearch,
  setBusquedaGeneral,
  busquedaGeneral,
  setLoading,
}) {
  const { setNoti } = useUI();
  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });

  const [planteles, setPlanteles] = useState([]);
  const [programas, setProgramas] = useState([]);

  const handleInstitucionChange = (institucionId) => {
    setFormData((prev) => ({
      ...prev,
      institucion: institucionId,
      plantel: '',
      programa: '',
    }));
    setPlanteles([]);
    setProgramas([]);

    if (institucionId) {
      getPlantelesByInstitucion(institucionId, (error, data) => {
        if (error) {
          setNoti({
            open: true,
            message: '¡No se encontraron planteles!',
            type: 'warning',
          });
        } else {
          const sorted = data.planteles
            .map((p) => ({
              id: p.id,
              nombre: `${p.domicilio.calle} ${p.domicilio.numeroExterior} | CCT: ${p.claveCentroTrabajo}`,
            }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre));
          setPlanteles(sorted);
        }
      });
    }
  };

  const handlePlantelChange = (plantelId) => {
    setFormData((prev) => ({ ...prev, plantel: plantelId, programa: '' }));
    setProgramas([]);

    if (plantelId) {
      getProgramas(plantelId, (error, data) => {
        if (error) {
          setNoti({
            open: true,
            message: '¡No se encontraron programas!',
            type: 'warning',
          });
        } else {
          const sorted = data.programas
            .map((p) => ({
              id: p.id,
              nombre: `${p.nombre} ${p.acuerdoRvoe}`,
            }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre));
          setProgramas(sorted);
        }
      });
    }
  };

  const handleProgramaChange = (programaId) => {
    setFormData((prev) => ({ ...prev, programa: programaId }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <BinarySelect
          id="busquedaGeneral"
          name="busquedaGeneral"
          title="Tipo de Búsqueda"
          value={busquedaGeneral}
          onChange={(e) => {
            const isGeneral = e.target.value === 1;
            setBusquedaGeneral(isGeneral);
            if (isGeneral && formData.institucion) {
              handleInstitucionChange(formData.institucion);
            } else {
              setFormData((prev) => ({ ...prev, plantel: '', programa: '' }));
              setPlanteles([]);
              setProgramas([]);
            }
          }}
          options={[
            { id: 0, nombre: 'Busqueda General' },
            { id: 1, nombre: 'Busqueda por Programa' },
          ]}
        />
      </Grid>

      {!busquedaGeneral ? (
        <Grid item xs={6}>
          <Select
            title="Institución"
            name="institucion"
            value={formData.institucion || ''}
            options={
              instituciones?.sort((a, b) => a.nombre.localeCompare(b.nombre))
              || []
            }
            onChange={(e) => handleInstitucionChange(e.target.value)}
          />
        </Grid>
      ) : (
        <>
          <Grid item xs={9}>
            <Select
              title="Institución"
              name="institucion"
              value={formData.institucion || ''}
              options={
                instituciones?.sort((a, b) => a.nombre.localeCompare(b.nombre)) || []
              }
              onChange={(e) => handleInstitucionChange(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              title="Plantel"
              name="plantel"
              value={formData.plantel || ''}
              options={planteles}
              onChange={(e) => handlePlantelChange(e.target.value)}
              disabled={!formData.institucion}
            />
          </Grid>
          <Grid item xs={5}>
            <Select
              title="Programa"
              name="programa"
              value={formData.programa || ''}
              options={programas}
              onChange={(e) => handleProgramaChange(e.target.value)}
              disabled={!formData.plantel}
            />
          </Grid>
        </>
      )}

      <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonSimple
          text="Buscar"
          onClick={onSearch}
          design="buscar"
          fullWidth
        >
          <SearchIcon />
        </ButtonSimple>
      </Grid>
    </Grid>
  );
}

MatriculaActivaForm.propTypes = {
  formData: PropTypes.shape({
    programa: PropTypes.string,
    institucion: PropTypes.string,
    plantel: PropTypes.string,
    busquedaGeneralTexto: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  busquedaGeneral: PropTypes.bool.isRequired,
  setBusquedaGeneral: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
