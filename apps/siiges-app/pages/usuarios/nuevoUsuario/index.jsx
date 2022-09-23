import React from 'react';
import { ButtonsForm, Layout } from '@siiges-ui/shared';
import { NewUserForm } from '@siiges-ui/users';
import {
  Divider,
  Typography,
} from '@mui/material';

export default function NewUser() {
  return (
    <Layout title="Nuevo Usuario" subtitle="Llena los siguientes datos">
      <Divider sx={{ mt: 5 }} />
      <Typography variant="p" sx={{ fontWeight: 'medium' }}>
        Datos Generales
      </Typography>
      <NewUserForm />
      <ButtonsForm />
    </Layout>
  );
}
