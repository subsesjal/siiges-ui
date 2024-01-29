import React, { useContext } from 'react';

import { Layout, Context } from '@siiges-ui/shared';
import { UsuariosTable, fetchUsuarios } from '@siiges-ui/users';
import { Divider } from '@mui/material';

function Usuarios() {
  const { session } = useContext(Context);
  const { usuarios } = fetchUsuarios({ session });

  return (
    <Layout title="Usuarios">
      <Divider sx={{ marginTop: 2 }} />
      {usuarios && (
        <UsuariosTable usuarios={usuarios} session={session} />
      )}
    </Layout>
  );
}

export default Usuarios;
