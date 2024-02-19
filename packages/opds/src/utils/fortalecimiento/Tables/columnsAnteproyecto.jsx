const columnsAnteproyecto = [
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
    width: 250,
    renderCell: (params) => params.row.cantidad,
  },
];

export default columnsAnteproyecto;
