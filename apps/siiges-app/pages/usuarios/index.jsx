import React from 'react';
import { ButtonStyled, Layout, DataTable } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { columns } from './Mocks/usuarios';
import getUsers from './utils/getUsers';

export default function Usuarios() {
  const { users, loading } = getUsers();
  return (
    <Layout title="Usuarios" subtitle="Consulta todos los usuarios registrados">
      <Grid container>
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
        {loading ? (
          <DataTable rows={users} columns={columns} title="Tabla de usuarios" />
        ) : (
          <div />
        )}
      </Grid>
    </Layout>
  );
}
