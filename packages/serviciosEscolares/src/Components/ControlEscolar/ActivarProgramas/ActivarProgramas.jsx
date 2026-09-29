import { Grid } from '@mui/material';
import { DataTable, updateRecord, useUI } from '@siiges-ui/shared';
import { getProgramas, getInstitucionProgramas, groupProgramasByPlantel } from '@siiges-ui/instituciones';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ActivarProgramasForm from '../ActivarProgramasForm';
import getColumnsActivarProgramas from '../../../Tables/columnsActivarProgramas';
import getColumnsActivarPlanteles from '../../../Tables/columnsActivarPlanteles';

export default function ActivarProgramas({ setLoading }) {
  const { setNoti } = useUI();
  const [selectedInstitucion, setSelectedInstitucion] = useState('');
  const [selectedPlantel, setSelectedPlantel] = useState('');
  const [programas, setProgramas] = useState([]);
  const [planteles, setPlanteles] = useState([]);
  const [fetchToggle, setFetchToggle] = useState(false);

  useEffect(() => {
    if (!selectedPlantel) {
      setProgramas([]);
      return;
    }

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
        setProgramas([]);
        return;
      }
      setProgramas(data.programas || []);
    });
  }, [selectedPlantel, fetchToggle]);

  useEffect(() => {
    if (!selectedInstitucion || selectedPlantel) {
      setPlanteles([]);
      return;
    }

    getInstitucionProgramas(selectedInstitucion, (error, data) => {
      if (error) {
        if (error.message === '404') {
          setNoti({
            open: true,
            message: '¡No se encontraron programas para la institución seleccionada!.',
            type: 'warning',
          });
        } else {
          setNoti({
            open: true,
            message: `¡Error al obtener programas!: ${error.message}`,
            type: 'error',
          });
        }
        setPlanteles([]);
        return;
      }
      setPlanteles(groupProgramasByPlantel(data.programas || []));
    });
  }, [selectedInstitucion, selectedPlantel, fetchToggle]);

  const handleSuccess = () => setFetchToggle((prev) => !prev);

  const handleBulkToggleProgramas = async (activar) => {
    const ids = programas.map((programa) => programa.id);
    if (ids.length === 0) return;

    const { statusCode, errorMessage } = await updateRecord({
      endpoint: '/programas/bulk',
      data: { ids, permisoAlumno: activar },
    });

    if (statusCode !== 200) {
      setNoti({
        open: true,
        message: errorMessage || 'Error al actualizar los programas',
        type: 'error',
      });
      return;
    }

    setNoti({
      open: true,
      message: activar ? 'Programas activados' : 'Programas desactivados',
      type: 'success',
    });
    handleSuccess();
  };

  const handleBulkTogglePlanteles = async (activar) => {
    const ids = planteles.flatMap((plantel) => plantel.programaIds);
    if (ids.length === 0) return;

    const { statusCode, errorMessage } = await updateRecord({
      endpoint: '/programas/bulk',
      data: { ids, permisoAlumno: activar },
    });

    if (statusCode !== 200) {
      setNoti({
        open: true,
        message: errorMessage || 'Error al actualizar los programas',
        type: 'error',
      });
      return;
    }

    setNoti({
      open: true,
      message: activar ? 'Todos los programas activados' : 'Todos los programas desactivados',
      type: 'success',
    });
    handleSuccess();
  };

  const columnsActivarProgramas = getColumnsActivarProgramas({ onSuccess: handleSuccess });
  const columnsActivarPlanteles = getColumnsActivarPlanteles({ onSuccess: handleSuccess });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ActivarProgramasForm
          selectedInstitucion={selectedInstitucion}
          setSelectedInstitucion={setSelectedInstitucion}
          selectedPlantel={selectedPlantel}
          setSelectedPlantel={setSelectedPlantel}
          setLoading={setLoading}
        />
      </Grid>

      {selectedPlantel && (
      <Grid item xs={12}>
        <DataTable
          title="Programas del Plantel"
          columns={columnsActivarProgramas}
          rows={programas || []}
          buttonAdd
          buttonText="Activar todos"
          buttonType="add"
          buttonClick={() => handleBulkToggleProgramas(true)}
          secondaryButtonText="Desactivar todos"
          secondaryButtonClick={() => handleBulkToggleProgramas(false)}
          initialState={{
            sorting: { sortModel: [{ field: 'id', sort: 'asc' }] },
          }}
        />
      </Grid>
      )}

      {selectedInstitucion && !selectedPlantel && (
      <Grid item xs={12}>
        <DataTable
          title="Planteles"
          columns={columnsActivarPlanteles}
          rows={planteles || []}
          buttonAdd
          buttonText="Activar todos"
          buttonType="add"
          buttonClick={() => handleBulkTogglePlanteles(true)}
          secondaryButtonText="Desactivar todos"
          secondaryButtonClick={() => handleBulkTogglePlanteles(false)}
          initialState={{
            sorting: { sortModel: [{ field: 'id', sort: 'asc' }] },
          }}
        />
      </Grid>
      )}
    </Grid>
  );
}

ActivarProgramas.propTypes = {
  setLoading: PropTypes.func.isRequired,
};
