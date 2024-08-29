import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Button, getData } from '@siiges-ui/shared';
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import columns from './Mocks/Diligencias';
import DatosGeneralesContext from '../utils/Context/datosGeneralesContext';
import DiligenciasFormModal from '../utils/Components/DiligenciasModales/DiligenciasFormModal';
import DiligenciasToRows from '../utils/Components/DiligenciasToRows';

function DiligenciasData({ disabled, id, type }) {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    diligencias,
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
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const tableColumns = columns(type);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Diligencias</Typography>
      </Grid>
      <Grid item xs={3}>
        {!disabled && <Button onClick={showModal} text="Agregar" />}
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={diligenciasRows}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={isLoading}
          />
        </div>
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
