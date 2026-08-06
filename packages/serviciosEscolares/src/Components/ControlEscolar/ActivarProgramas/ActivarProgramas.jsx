import { Grid } from '@mui/material';
import { DataTable, updateRecord, useUI } from '@siiges-ui/shared';
import { getProgramas } from '@siiges-ui/instituciones';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ActivarProgramasForm from '../ActivarProgramasForm';
import getColumnsActivarProgramas from '../../../Tables/columnsActivarProgramas';

export default function ActivarProgramas({ setLoading }) {
  const { setNoti } = useUI();
  const [selectedInstitucion, setSelectedInstitucion] = useState('');
  const [selectedPlantel, setSelectedPlantel] = useState('');
  const [programas, setProgramas] = useState([]);
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

  const handleSuccess = () => setFetchToggle((prev) => !prev);

  const handleBulkToggle = async (activar) => {
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

  const columnsActivarProgramas = getColumnsActivarProgramas({ onSuccess: handleSuccess });

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
            buttonClick={() => handleBulkToggle(true)}
            onReloadClick={() => handleBulkToggle(false)}
            initialState={{
              sorting: { sortModel: [{ field: 'id', sort: 'asc' }] },
            }}
          />
        </Grid>
      )}

      {selectedInstitucion && !selectedPlantel && (
        <Grid item xs={12}>
          {/* Tabla de Planteles: pendiente */}
        </Grid>
      )}
    </Grid>
  );
}

ActivarProgramas.propTypes = {
  setLoading: PropTypes.func.isRequired,
};
