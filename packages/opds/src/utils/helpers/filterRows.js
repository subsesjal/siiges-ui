const totalObject = (data) => {
  const total = {
    id: 0,
    tipoRecursoPresupuesto: {
      descripcion: '',
    },
    tipoPresupuesto: {
      descripcion: 'TOTAL',
    },
    cantidad: `${data
      .map(({ cantidad }) => cantidad)
      .reduce((acc, cur) => acc + cur)} $`,
  };
  return total;
};

const calcularTotalesPorTipoPresupuesto = (datos) => {
  const totalesPorTipoPresupuesto = {};

  datos.forEach((dato) => {
    const { tipoPresupuestoId, tipoPresupuesto } = dato;
    const { cantidad } = dato;

    if (!totalesPorTipoPresupuesto[tipoPresupuestoId]) {
      totalesPorTipoPresupuesto[tipoPresupuestoId] = {
        id: tipoPresupuestoId,
        tipoRecursoPresupuesto: {
          descripcion: 'total',
        },
        tipoPresupuesto: {
          descripcion: tipoPresupuesto.descripcion,
        },
        cantidad,
      };
    } else {
      totalesPorTipoPresupuesto[tipoPresupuestoId].cantidad += cantidad;
    }
  });

  totalesPorTipoPresupuesto.total = totalObject(datos);

  return Object.values(totalesPorTipoPresupuesto);
};

const filterRows = (data, param) => {
  const dataArray = data.filter((row) => row.tipoRecursoPresupuestoId === param);

  if (dataArray.length) dataArray.push(totalObject(dataArray));

  if (param === 5) {
    return calcularTotalesPorTipoPresupuesto(data);
  }

  return dataArray;
};

export default filterRows;
