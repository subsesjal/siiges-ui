import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import columns from './Mocks/Docentes';
import SolicitudContext from '../utils/Context/solicitudContext';
import useDocentes from '../utils/getDocentes';
import DocentesModal from '../utils/Components/DocentesModales/DocentesModal';
import { transformDataForTable } from './Mocks/Docentes/utils';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function Docentes({ disabled, type }) {
  const [modal, setModal] = useState(false);
  const { programaId } = useContext(SolicitudContext);
  const [docentesList, setDocentesList] = useState([]);
  const docentesData = useDocentes(programaId);
  const { docentesTable, loading } = type === 'editar' ? docentesData : { docentesTable: [], loading: false };

  const isSectionDisabled = useSectionDisabled(8);

  const isDisabled = disabled || isSectionDisabled;

  useEffect(() => {
    if (type === 'editar' && !loading) {
      const transformedData = transformDataForTable(docentesTable);
      setDocentesList(transformedData);
    }
  }, [docentesTable, loading, type]);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Docentes</Typography>
      </Grid>
      <Grid item xs={3}>
        {!isDisabled && <Button onClick={showModal} text="Agregar" />}
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={docentesList}
            columns={columns(setDocentesList)}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
      <DocentesModal
        open={modal}
        hideModal={hideModal}
        title="Agregar Docente"
        setDocentesList={setDocentesList}
        mode="create"
      />
    </Grid>
  );
}

Docentes.defaultProps = {
  type: null,
};

Docentes.propTypes = {
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
};
