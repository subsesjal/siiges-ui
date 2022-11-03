import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { UserForm, UserInfo } from '@siiges-ui/users';
import Grid from '@mui/material/Grid';
import getUser from '../utils/getUser';

export default function UserEdit() {
  const { user, loading } = getUser();
  return (
    <Layout>
      <Grid container spacing={2}>
        {loading ? (
          <>
            <Grid item xs={4} sx={{ marginTop: 7 }}>
              <UserInfo user={user} />
            </Grid>
            <UserForm user={user} />
          </>
        ) : (
          <div />
        )}
      </Grid>
    </Layout>
  );
}
