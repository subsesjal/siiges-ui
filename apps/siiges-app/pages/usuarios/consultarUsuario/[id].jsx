import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { UserConsult, UserInfo } from '@siiges-ui/users';
import Grid from '@mui/material/Grid';
import getUser from '../utils/getUser';

export default function ConsultUser() {
  const { user, loading } = getUser();
  return (
    <Layout>
      {loading ? (
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ marginTop: 7 }}>
            <UserInfo user={user} />
          </Grid>
          <UserConsult user={user} />
        </Grid>
      ) : (
        <div />
      )}
    </Layout>
  );
}
