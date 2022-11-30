import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { EditUserForm } from '@siiges-ui/users';
import Grid from '@mui/material/Grid';
import getUser from '../utils/getUser';

export default function EditUser() {
  const { user, loading } = getUser();
  return (
    <Layout>
      <Grid container spacing={2}>
        {loading ? <EditUserForm user={user} /> : <div />}
      </Grid>
    </Layout>
  );
}
