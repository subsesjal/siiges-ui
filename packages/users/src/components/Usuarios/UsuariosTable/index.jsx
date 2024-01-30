import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { DataTable, formattedDate } from '@siiges-ui/shared';
import { commonColumns, adminColumns } from '../../Tables/usuariosTable';

const statusMapping = { 0: 'Desactivado', 1: 'Activado' };

const formattedRows = (usuarios) => usuarios.map((usuario) => ({
  id: usuario.id,
  nombre: `${usuario.persona.nombre} ${usuario.persona.apellidoPaterno}`,
  usuario: usuario.usuario,
  correo: usuario.correo,
  rol: usuario.rol.descripcion,
  fecha: formattedDate(usuario.createdAt),
  estatus: statusMapping[usuario.estatus],
  actions: 'Actions Placeholder',
}));

export default function UsuariosTable({ usuarios, session }) {
  const { rol } = session;
  const [rows, setRows] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (usuarios && usuarios.length) {
      const tableRows = formattedRows(usuarios, rol);
      setRows(tableRows);
    }
  }, [usuarios]);

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <DataTable
        title="Tabla Usuarios"
        rows={rows}
        columns={rol === 'admin' ? adminColumns : commonColumns}
        buttonAdd
        buttonText="Agregar Usuario"
        buttonType="add"
        buttonClick={() => {
          router.push('/usuarios/crear');
        }}
      />
    </Grid>
  );
}

UsuariosTable.propTypes = {
  usuarios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      usuario: PropTypes.string.isRequired,
      correo: PropTypes.string.isRequired,
    }),
  ).isRequired,

  session: PropTypes.shape({
    rol: PropTypes.string,
  }).isRequired,
};
