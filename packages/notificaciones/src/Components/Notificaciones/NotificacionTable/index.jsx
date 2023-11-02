import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
import { commonColumns, adminColumns } from '../../Tables/notificacionesTable';

const formattedRows = (notificaciones, rol) => notificaciones.map((notificacion) => ({
  id: notificacion.id,
  asunto: notificacion.asunto,
  notificacion: notificacion.template,
  estatus: notificacion.status,
  ...(rol === 'admin' && {
    usuario: `${notificacion.usuario.persona.nombre} ${notificacion.usuario.persona.apellidoPaterno} ${notificacion.usuario.persona.apellidoMaterno}`,
    email: `${notificacion.email}`,
  }),
  actions: 'Actions Placeholder',
}));

export default function NotificacionTable({ notificaciones, session }) {
  const { rol } = session;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (notificaciones && notificaciones.length) {
      const tableRows = formattedRows(notificaciones, rol);
      setRows(tableRows);
    }
  }, [notificaciones]);

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable title="Notificaciones" rows={rows} columns={rol === 'admin' ? adminColumns : commonColumns} />
    </Grid>
  );
}

NotificacionTable.propTypes = {
  notificaciones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      asunto: PropTypes.string.isRequired,
      template: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      usuario: PropTypes.shape({
        persona: PropTypes.shape({
          nombre: PropTypes.string,
          apellidoPaterno: PropTypes.string,
          apellidoMaterno: PropTypes.string,
        }),
      }),
      email: PropTypes.string,
    }),
  ).isRequired,

  session: PropTypes.shape({
    rol: PropTypes.string,
  }).isRequired,
};
