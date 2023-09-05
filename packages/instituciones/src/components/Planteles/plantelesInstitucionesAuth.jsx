import React, { useState } from 'react';
import { DataTable } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';

export default function PlantelesInstitucionesAuth({ data, institucion }) {
  const [rows] = useState(
    data.map((value) => ({
      institucion,
      id: value.id,
      domicilio: `${value.domicilio.calle} #${value.domicilio.numeroExterior}`,
      colonia: value.domicilio.colonia,
      municipio: value.domicilio.municipio.nombre,
      codigoPostal: value.domicilio.codigoPostal,
      claveCentroTrabajo: value.claveCentroTrabajo,
    })),
  );

  const columns = [
    { field: 'domicilio', headerName: 'Domicilio', width: 240 },
    { field: 'colonia', headerName: 'Colonia', width: 240 },
    { field: 'municipio', headerName: 'Municipio', width: 140 },
    { field: 'codigoPostal', headerName: 'Codigo Postal', width: 130 },
    {
      field: 'claveCentroTrabajo',
      headerName: 'Clave centro de trabajo',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Link href={`/serviciosEscolares/${params.id}/ProgramasEstudios`}>
          <IconButton aria-label="Programas de estudios">
            <AssignmentIcon />
          </IconButton>
        </Link>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Grid container>
      <DataTable rows={rows} columns={columns} title="Planteles" />
    </Grid>
  );
}

PlantelesInstitucionesAuth.propTypes = {
  institucion: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      claveCentroTrabajo: PropTypes.string,
      domicilio: PropTypes.shape({
        id: PropTypes.number,
        calle: PropTypes.string,
        numeroExterior: PropTypes.string,
        colonia: PropTypes.string,
        codigoPostal: PropTypes.number,
        municipio: PropTypes.shape({
          id: PropTypes.number,
          nombre: PropTypes.string,
        }),
      }),
    }),
  ).isRequired,
};
