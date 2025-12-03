import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import columnsReporteFoliosAsignados from '../../../Tables/reporteFoliosAsignadosTable';

export default function FoliosTable({ folios }) {
  return (
    <Box sx={{ height: 500, width: '100%', mt: 2 }}>
      <DataGrid
        rows={folios}
        columns={columnsReporteFoliosAsignados(null)}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </Box>
  );
}

FoliosTable.propTypes = {
  folios: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
