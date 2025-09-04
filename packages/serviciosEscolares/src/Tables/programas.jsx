import React from 'react';
import ButtonsProgramas from '../Components/utils/ButtonProgramas';

const modalidades = {
  1: 'Escolarizada',
  2: 'No escolarizada',
  3: 'Mixta',
  4: 'Dual',
};

const niveles = {
  1: 'Bachillerato',
  2: 'Licenciatura',
  3: 'Técnico Superior Universitario',
  4: 'Especialidad',
  5: 'Maestría',
  6: 'Doctorado',
  7: 'Profesional Asociado',
  8: 'Educación Continua',
};

const columnsProgramas = [
  {
    field: 'id', headerName: 'ID', width: 80, hide: true,
  },
  {
    field: 'nivelId',
    headerName: 'Nivel',
    width: 200,
    valueGetter: (params) => niveles[params.row.nivelId] || 'N/A',
  },
  {
    field: 'modalidadId',
    headerName: 'Modalidad',
    width: 200,
    valueGetter: (params) => modalidades[params.row.modalidadId] || 'N/A',
  },
  { field: 'nombre', headerName: 'Programa', width: 340 },
  { field: 'acuerdoRvoe', headerName: 'RVOE', width: 220 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ButtonsProgramas
        id={params.id}
        url={`/serviciosEscolares/programas/${params.id}/editPrograma`}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

export default columnsProgramas;
