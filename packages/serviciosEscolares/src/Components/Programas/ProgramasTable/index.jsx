import { DataTable } from '@siiges-ui/shared';
import React from 'react';
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
