import { Grid, Typography } from '@mui/material';
import { DataTable, getData } from '@siiges-ui/shared';
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import columns from './Mocks/Diligencias';
import DatosGeneralesContext from '../utils/Context/datosGeneralesContext';
import DiligenciasFormModal from '../utils/Components/DiligenciasModales/DiligenciasFormModal';
import DiligenciasToRows from '../utils/Components/DiligenciasToRows';
import useSectionDisabled from './Hooks/useSectionDisabled';

function DiligenciasData({ disabled, id, type }) {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isSectionDisabled = useSectionDisabled(13);

  const isDisabled = disabled || isSectionDisabled;

  const {
    setDiligencias,
    setFormDiligencias,
    diligenciasRows,
    setDiligenciasRows,
  } = useContext(DatosGeneralesContext);

  const showModal = () => {
    setModal(true);
    setFormDiligencias({ persona: {}, solicitudId: id });
  };

  const hideModal = () => setModal(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getData({
          endpoint: `/solicitudes/${id}/diligencias/`,
          query: '',
        });
        if (response && response.data) {
          setDiligencias(response.data);
          const rows = response.data.map(DiligenciasToRows);
          setDiligenciasRows(rows);
        }
      } catch (err) {
        console.error('¡Error al obtener datos!:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const tableColumns = columns(type, isDisabled);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Diligencias</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          buttonAdd
          buttonText="Agregar Diligencia"
          buttonClick={showModal}
          buttonDisabled={isDisabled}
          rows={diligenciasRows}
          columns={tableColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={isLoading}
        />
      </Grid>
      <DiligenciasFormModal
        open={modal}
        hideModal={hideModal}
        title="Agregar Diligencia"
        mode="create"
        id={id}
      />
    </Grid>
  );
}

DiligenciasData.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default DiligenciasData;
