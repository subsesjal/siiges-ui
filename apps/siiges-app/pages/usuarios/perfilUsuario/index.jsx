import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { UserConsult, UserInfo } from '@siiges-ui/users';
import Grid from '@mui/material/Grid';

export default function UserProfile() {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ marginTop: 7 }}>
          <UserInfo />
        </Grid>
        <UserConsult />
      </Grid>
    </Layout>
  );
}
