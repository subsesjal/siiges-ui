import React, {
  useState, useContext, useEffect, useMemo,
} from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { DataTable } from '@siiges-ui/shared';
import columns from './Mocks/Asignaturas';
import AsignaturasModal from '../utils/Components/AsignaturasModales/AsignaturasCreateModal';
import { TablesPlanEstudiosContext } from '../utils/Context/tablesPlanEstudiosProviderContext';
import SolicitudContext from '../utils/Context/solicitudContext';
import useAsignaturas from '../utils/getAsignaturas';
import { grados } from '../utils/Mocks/mockAsignaturas';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function Asignaturas({ disabled, type }) {
  const { programaId } = useContext(SolicitudContext);
  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);
  const { asignaturasList, setAsignaturasList } = useContext(
    TablesPlanEstudiosContext,
  );

  const isSectionDisabled = useSectionDisabled(6);

  const isDisabled = disabled || isSectionDisabled;

  const { asignaturas, loading } = type === 'editar' || type === 'consultar'
    ? useAsignaturas(programaId)
    : { asignaturas: [], loading: false };

  const tableColumns = useMemo(
    () => columns(grados, isDisabled, type),
    [setAsignaturasList, asignaturas, isDisabled],
  );

  useEffect(() => {
    if ((type === 'editar' || type === 'consultar') && !loading) {
      setAsignaturasList(asignaturas);
    }
  }, [loading, asignaturas]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Asignaturas</Typography>
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataTable
            buttonAdd
            buttonText="Agregar Asignatura"
            buttonClick={showModal}
            buttonDisabled={isDisabled}
            rows={asignaturasList}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={loading}
          />
        </div>
      </Grid>
      <AsignaturasModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Agregar Asignatura"
      />
    </Grid>
  );
}

Asignaturas.defaultProps = {
  type: null,
};

Asignaturas.propTypes = {
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
};
