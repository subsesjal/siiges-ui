import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, {
  useContext, useState, useEffect, useMemo,
} from 'react';
import { DataTable } from '@siiges-ui/shared';
import columns from './Mocks/AsignaturasFormacionElectiva';
import { TablesPlanEstudiosContext } from '../utils/Context/tablesPlanEstudiosProviderContext';
import AsignaturasFormacionCreateModal from '../utils/Components/AsignaturasFormacionModales/AsignaturasFormacionCreateModal';
import SolicitudContext from '../utils/Context/solicitudContext';
import useAsignaturas from '../utils/getAsignaturas';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function AsignaturasFormacionElectiva({ disabled, type, section }) {
  const { programaId } = useContext(SolicitudContext);
  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);
  const {
    asignaturasFormacionList,
    setAsignaturasFormacionList,
    setAsignaturasTotalList,
  } = useContext(TablesPlanEstudiosContext);

  const isSectionDisabled = useSectionDisabled(section);
  const isDisabled = disabled || isSectionDisabled;

  const { asignaturasFormacion, asignaturasTotal, loading } = type === 'editar' || type === 'consultar'
    ? useAsignaturas(programaId)
    : { asignaturasFormacion: [], loading: false };

  const tableColumns = useMemo(
    () => columns(isDisabled, type),
    [setAsignaturasFormacionList, asignaturasFormacion, isDisabled],
  );

  useEffect(() => {
    if ((type === 'editar' || type === 'consultar') && !loading) {
      setAsignaturasFormacionList(asignaturasFormacion);
      setAsignaturasTotalList(asignaturasTotal);
    }
  }, [loading, asignaturasFormacion]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Asignaturas formación electiva</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          buttonAdd
          buttonText="Agregar Asignatura"
          buttonClick={showModal}
          buttonDisabled={isDisabled}
          rows={asignaturasFormacionList}
          columns={tableColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Grid>
      <AsignaturasFormacionCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Agregar Asignatura Formación Electiva"
      />
    </Grid>
  );
}

AsignaturasFormacionElectiva.defaultProps = {
  type: null,
};

AsignaturasFormacionElectiva.propTypes = {
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
  section: PropTypes.number.isRequired,
};
