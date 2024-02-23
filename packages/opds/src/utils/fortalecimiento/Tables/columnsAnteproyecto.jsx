import React from 'react';
import PropTypes from 'prop-types';
import ActionCell from '../../../components/presupuesto/modal/ActionCell';

const columnsAnteproyecto = ({ setRowsData, SetCreateRow }) => [
  {
    field: 'capitulo',
    headerName: 'Capitulo',
    width: 300,
    renderCell: (params) => params.row.tipoPresupuesto?.descripcion,
  },
  {
    field: 'importeff11',
    headerName: 'Recursos',
    width: 500,
    renderCell: (params) => params.row.tipoRecursoPresupuesto?.descripcion,
  },
  {
    field: 'total',
    headerName: 'Cantidad',
    width: 150,
    renderCell: (params) => params.row.cantidad,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ActionCell
        params={params.row}
        setRowsData={setRowsData}
        SetCreateRow={SetCreateRow}
      />
    ),
  },
];

export default columnsAnteproyecto;

columnsAnteproyecto.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modalState: PropTypes.shape({
    title: PropTypes.string,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    confirmAction: PropTypes.func,
    edit: PropTypes.bool,
  }),
  setModalState: PropTypes.func.isRequired,
  setRowsData: PropTypes.func.isRequired,
  SetCreateRow: PropTypes.func.isRequired,
  tipoEgresoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  params: PropTypes.shape({
    cantidad: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tipoPresupuestoId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    tipoRecursoPresupuestoId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
};
