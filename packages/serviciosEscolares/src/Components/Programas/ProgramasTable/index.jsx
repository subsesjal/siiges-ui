import { DataTable } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';
import columnsProgramas from '../../../Tables/programas';

export default function ProgramasTable({ programas }) {
  return (
    <DataTable
      rows={programas}
      columns={columnsProgramas}
      title="Tabla de programas"
    />
  );
}

ProgramasTable.propTypes = {
  programas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
