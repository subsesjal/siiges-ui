const rows = [{
  id: 1,
  montoAutorizado: 500000,
  montoContratado: 450000,
  nombre: 'Proyecto Alpha',
  montoEjercido: 300000,
  acciones: 'Construcción de infraestructura',
  porcentajeDeAvance: 75,
  fechaRealInicio: '2024-01-15T00:00:00Z',
  fechaFin: '2024-12-31T00:00:00Z',
  observaciones: 'En curso',
  contrato: {
    numeroDeContrato: 'CTO12345',
    fechaInicio: '2024-01-15T00:00:00Z',
    fechaFin: '2024-12-31T00:00:00Z',
    contratista: 'Constructora XYZ',
  },
  tipoProyecto: {
    obraNueva: true,
    obraDeContinuidad: false,
    equipamiento: false,
    adecuaciones: true,
    mantenimiento: false,
    proyectoSustentable: true,
  },
  proyectoEspacio: [
    {
      nombre: 'Edificio A',
      cantidad: 1,
      metrosCuadrados: 1000,
    },
    {
      nombre: 'Edificio B',
      cantidad: 2,
      metrosCuadrados: 800,
    },
  ],
}];

export default rows;
