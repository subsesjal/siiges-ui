import React, { useState, useMemo } from 'react';
import { Grid } from '@mui/material';
import { DataTable, Select } from '@siiges-ui/shared';
import { useRouter } from 'next/router';

// 1. Datos simulados (Mock Data)
const MOCK_INSTITUCIONES = [
  { id: 1, nombre: 'Universidad Tecnológica de Jalisco' },
  { id: 2, nombre: 'Instituto Tecnológico Superior de Zapopan' },
];

const MOCK_PLANTELES = {
  1: [
    { id: 101, nombre: 'Plantel Central (Guadalajara)' },
    { id: 102, nombre: 'Plantel Sur (Tlajomulco)' },
  ],
  2: [
    { id: 201, nombre: 'Plantel Zapopan Norte' },
  ],
};

const MOCK_MUNICIPIOS = {
  101: [
    { id: 1001, nombre: 'Guadalajara' },
  ],
  102: [
    { id: 1002, nombre: 'Tlajomulco de Zúñiga' },
  ],
  201: [
    { id: 1003, nombre: 'Zapopan' },
  ],
};

const MOCK_RVOES = [
  {
    id: 1,
    institucionId: 1,
    plantelId: 101,
    municipioId: 1001,
    nombrePrograma: 'Licenciatura en Desarrollo de Software',
    rvoe: 'ES2023001',
    fechaCreacion: '2023-01-15',
    municipio: 'Guadalajara',
    estatus: 'Activo',
  },
  {
    id: 2,
    institucionId: 1,
    plantelId: 101,
    municipioId: 1001,
    nombrePrograma: 'Ingeniería en Redes y Telecomunicaciones',
    rvoe: 'ES2023002',
    fechaCreacion: '2023-03-20',
    municipio: 'Guadalajara',
    estatus: 'Activo',
  },
  {
    id: 3,
    institucionId: 1,
    plantelId: 102,
    municipioId: 1002,
    nombrePrograma: 'Licenciatura en Negocios Digitales',
    rvoe: 'ES2023003',
    fechaCreacion: '2023-05-10',
    municipio: 'Tlajomulco de Zúñiga',
    estatus: 'En Revisión',
  },
  {
    id: 4,
    institucionId: 2,
    plantelId: 201,
    municipioId: 1003,
    nombrePrograma: 'Ingeniería Mecatrónica',
    rvoe: 'ES2022045',
    fechaCreacion: '2022-11-01',
    municipio: 'Zapopan',
    estatus: 'Activo',
  },
];

// 2. Definición de columnas solicitadas
const columns = [
  { field: 'nombrePrograma', headerName: 'Nombre programa', name: 'Nombre programa', width: 500 },
  { field: 'rvoe', headerName: 'RVOE', name: 'RVOE', width: 100 },
  { field: 'fechaCreacion', headerName: 'Fecha de creación', name: 'Fecha de creación', width: 150 },
  { field: 'municipio', headerName: 'Municipio', name: 'Municipio', width: 200 },
  { field: 'estatus', headerName: 'Estatus', name: 'Estatus', width: 150 },
];

export default function ConsultRvoe() {
  const router = useRouter();

  // Estados para controlar las selecciones
  const [selectedInstitucion, setSelectedInstitucion] = useState('');
  const [selectedPlantel, setSelectedPlantel] = useState('');
  const [selectedMunicipio, setSelectedMunicipio] = useState('');

  // Handlers para la selección en cascada
  const handleInstitucionChange = (event) => {
    const value = event?.target ? event.target.value : event;
    setSelectedInstitucion(value);
    setSelectedPlantel('');
    setSelectedMunicipio('');
  };

  const handlePlantelChange = (event) => {
    const value = event?.target ? event.target.value : event;
    setSelectedPlantel(value);
    setSelectedMunicipio('');
  };

  const handleMunicipioChange = (event) => {
    const value = event?.target ? event.target.value : event;
    setSelectedMunicipio(value);
  };

  // Opciones dinámicas para los selectores dependientes
  const plantelOptions = selectedInstitucion ? MOCK_PLANTELES[selectedInstitucion] || [] : [];
  const municipioOptions = selectedPlantel ? MOCK_MUNICIPIOS[selectedPlantel] || [] : [];

  // Validar si los tres campos están seleccionados
  const isAllSelected = Boolean(selectedInstitucion && selectedPlantel && selectedMunicipio);

  // Filtrar los datos de la tabla únicamente cuando todos los campos están seleccionados
  const tableRows = useMemo(() => {
    if (!isAllSelected) return [];

    return MOCK_RVOES.filter(
      (item) =>
        String(item.institucionId) === String(selectedInstitucion) &&
        String(item.plantelId) === String(selectedPlantel) &&
        String(item.municipioId) === String(selectedMunicipio)
    );
  }, [selectedInstitucion, selectedPlantel, selectedMunicipio, isAllSelected]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Select
          title="Municipios"
          options={municipioOptions}
          name="municipio"
          value={selectedMunicipio}
          onChange={handleMunicipioChange}
          disabled={!selectedInstitucion || !selectedPlantel}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          title="Institución"
          options={MOCK_INSTITUCIONES}
          name="institucion"
          value={selectedInstitucion}
          onChange={handleInstitucionChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          title="Plantel"
          options={plantelOptions}
          name="plantel"
          value={selectedPlantel}
          onChange={handlePlantelChange}
          disabled={!selectedInstitucion}
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          title="Lista de RVOES"
          rows={tableRows}
          columns={columns}
        />
      </Grid>
    </Grid>
  );
}