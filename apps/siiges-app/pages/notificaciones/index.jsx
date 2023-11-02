import React, { useContext } from 'react';
import { Layout, Context } from '@siiges-ui/shared';
import { NotificacionTable, fetchNotificaciones } from '@siiges-ui/notificaciones/src';
import { Divider } from '@mui/material';

export default function InstitutionPage() {
  const { session } = useContext(Context);

  const {
    notificaciones,
  } = fetchNotificaciones({ session });

  return (
    <Layout title="Notificaciones">
      <Divider sx={{ marginTop: 2 }} />
      {notificaciones && (
      <NotificacionTable notificaciones={notificaciones} session={session} />
      )}
    </Layout>
  );
}
