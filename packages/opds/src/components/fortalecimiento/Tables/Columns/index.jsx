import React from 'react';
import ButtonsDatosProyecto from './Actions';

const Columns = [
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'montoAutorizado', headerName: 'Monto Autorizado', width: 250 },
  { field: 'montoContratado', headerName: 'Monto Contratado', width: 250 },
  { field: 'montoEjercido', headerName: 'Monto Ejercido', width: 250 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: ({ id }) => <ButtonsDatosProyecto id={id} />,
  },
];

export default Columns;
