import React, { useContext, useEffect, useState } from 'react';
import {
  ButtonStyled, Layout, DataTable, Context,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { columns } from './Mocks/usuarios';
import getUsers from './utils/getUsers';

export default function Usuarios() {
  const { users, loading } = getUsers();
  const { session } = useContext(Context);
  const [auth, setAuth] = useState(false);
  let rows = '';

  useEffect(() => {
    if (session.rol === 'admin' || session.rol === 'representante') {
      setAuth(true);
    }
  }, [session]);

  if (users !== undefined) {
    rows = users;
  }

  return (
    <Layout title="Usuarios" subtitle="Consulta todos los usuarios registrados">
      <Grid container>
        {auth ? (
          <Grid item xs={9} sx={{ mt: '20px' }}>
            <Link href="/usuarios/nuevoUsuario">
              <div>
                <ButtonStyled
                  text="Nuevo Usuario"
                  alt="Agregar usuario"
                  type="success"
                />
              </div>
            </Link>
          </Grid>
        ) : (
          <div />
        )}
        {loading ? (
          <DataTable rows={rows} columns={columns} title="Tabla de usuarios" />
        ) : (
          <div />
        )}
      </Grid>
    </Layout>
  );
}
