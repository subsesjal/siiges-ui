import React, {
  useContext, useEffect, useState,
} from 'react';
import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import columns from './Mocks/Docentes';
import { TablesPlanEstudiosContext } from '../utils/Context/tablesPlanEstudiosProviderContext';
import SolicitudContext from '../utils/Context/solicitudContext';
import useDocentes from '../utils/getDocentes';
import DocentesCreateModal from '../utils/Components/DocentesModales/DocentesCreateModal';

export const transformDataForTable = (data) => data.map((item) => ({
  id: item.id,
  nombre: item.persona.nombre,
  tipoDocente: item.tipoDocente,
  formacion: `${item.nombreUltimoGrado} - ${item.nombrePenultimoGrado}`,
  asignatura: item.asignaturasDocentes.join(', '),
  experienciaLaboral: item.experienciaLaboral,
  tipoContratacion: `${item.tipoContratacion} - ${item.antiguedad} años`,
}));

export default function Docentes({ disabled, type }) {
  const [modal, setModal] = useState(false);
  const { programaId } = useContext(SolicitudContext);
  const [docentesList, setDocentesList] = useState([]);
  const { setFormDocentes } = useContext(
    TablesPlanEstudiosContext,
  );
  const { docentes, loading } = type === 'editar'
    ? useDocentes(programaId)
    : { docentes: [], loading: false };

  useEffect(() => {
    if (type === 'editar' && !loading) {
      const transformedData = transformDataForTable(docentes);
      setDocentesList(transformedData);
      console.log(docentes);
    }
  }, [docentes, loading]);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
    setFormDocentes({
      esAceptado: true,
      asignaturasDocentes: [],
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Docentes</Typography>
      </Grid>
      <Grid item xs={3}>
        {!disabled && <Button onClick={showModal} text="Agregar" />}
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={docentesList}
            columns={columns()}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
      <DocentesCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Agregar Docente"
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
