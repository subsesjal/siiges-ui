import React from 'react';
import { Grid } from '@mui/material';
import { Input, Select } from '@siiges-ui/shared';

export default function NewUserForm() {
    const userType = [
        {
            id: 'admin',
            name: 'Administrador',
        },
        {
            id: 'user',
            name: 'Usuario',
        },
    ];

    return (
        <Grid item sx={{ ml: 15 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Input label="Nombre(s)" id="name" name="name" auto="name" />
                </Grid>
                <Grid item xs={3}>
                    <Input label="Primer Apellido" id="lastname1" name="lastname1" auto="lastname1" />
                </Grid>
                <Grid item xs={3}>
                    <Input label="Segundo Apellido" id="lastname2" name="lastname2" auto="lastname2" />
                </Grid>
                <Grid item xs={3}>
                    <Select title="Tipo de usuario" options={userType} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Input label="Cargo" id="cargo" name="cargo" auto="cargo" />
                </Grid>
                <Grid item xs={6}>
                    <Input label="Correo Electronico" id="email" name="email" auto="email" />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Input label="Usuario" id="user" name="user" auto="user" />
                </Grid>
                <Grid item xs={3}>
                    <Input label="Contrasena" id="password" name="password" auto="password" />
                </Grid>
                <Grid item xs={3}>
                    <Input label="Repetir contrasena" id="repeatPassword" name="repeatPassword" auto="repeatPassword" />
                </Grid>
            </Grid>
        </Grid>
    );
}
