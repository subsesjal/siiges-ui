import React, { useState, useContext } from 'react';
import AsignaturasButtons from '../../../utils/Components/AsignaturasButtons';
import { AsignaturasContext } from '../../../utils/Context/asignaturasContext';

const columns = () => {
  const { asignaturasList } = useContext(AsignaturasContext);

  return [
    { field: 'grado', headerName: 'Grado', width: 230 },
    { field: 'nombre', headerName: 'Nombre', width: 320 },
    { field: 'clave', headerName: 'Clave', width: 140 },
    { field: 'seriacion', headerName: 'Seriacion', width: 170 },
    { field: 'creditos', headerName: 'Creditos' },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => {
        const rowIndex = params.row.id;
        const [rowItem] = useState(asignaturasList.find((item) => item.id === rowIndex));

        return (
          <AsignaturasButtons
            id={params.id}
            rowItem={rowItem}
          />
        );
      },
      sortable: false,
      filterable: false,
    },
  ];
};

export default columns;
