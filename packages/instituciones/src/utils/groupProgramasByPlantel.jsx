const groupProgramasByPlantel = (programas) => {
  const grouped = {};

  programas.forEach((programa) => {
    const { plantelId } = programa;
    if (!plantelId) return;

    if (!grouped[plantelId]) {
      const { plantel } = programa;
      grouped[plantelId] = {
        id: plantelId,
        nombre: `${plantel?.domicilio?.calle || ''} ${plantel?.domicilio?.numeroExterior || ''} | CCT: ${plantel?.claveCentroTrabajo || 'N/A'}`,
        programaIds: [],
        totalProgramas: 0,
        activo: false,
      };
    }

    grouped[plantelId].programaIds.push(programa.id);
    grouped[plantelId].totalProgramas += 1;
    if (programa.permisoAlumno) {
      grouped[plantelId].activo = true;
    }
  });

  return Object.values(grouped);
};

export default groupProgramasByPlantel;
