import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  esES,
} from '@mui/x-data-grid';

const localeText = {
  ...esES.components.MuiDataGrid.defaultProps.localeText,
  noRowsLabel: 'No hay registros',
  rowsPerPage: 'Filas por página:',
};

const HIDDEN_HEADERS = new Set(['#', 'F', 'CARTA COMPROMISO TC', 'DESISTIMIENTO']);

const isHiddenHeader = (header) => HIDDEN_HEADERS.has(header) || /^REPORTE \d+$/.test(header);

const normalizeAccent = (value) => (
  (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
);

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

function BeneficiariosBecasTable({ rows, headers }) {
  const [pageSize, setPageSize] = useState(25);

  const columns = useMemo(() => {
    if (!rows.length || !headers.length) return [];

    const keys = Object.keys(rows[0]).filter((key) => key !== 'id');

    return [
      {
        field: 'id',
        headerName: '#',
        name: '#',
        width: 60,
      },
      ...headers.map((header, index) => ({
        field: keys[index] || `col_${index}`,
        headerName: header,
        name: header,
        flex: 1,
        minWidth: 200,
      })),
    ];
  }, [rows, headers]);

  const columnVisibilityModel = useMemo(() => columns.reduce((acc, column) => {
    if (isHiddenHeader(column.headerName)) {
      acc[column.field] = false;
    }

    return acc;
  }, {}), [columns]);

  const situationField = useMemo(() => {
    const column = columns.find((item) => item.headerName === 'SITUACIÓN');

    return column ? column.field : 'SITUACIÓN';
  }, [columns]);

  const getRowClassName = (params) => {
    const situacion = normalizeAccent(params.row[situationField]);

    if (situacion.startsWith('BAJA VOLUNTARIA')) return 'row-baja-voluntaria';

    if (situacion.startsWith('BAJA POR INCUMPLIMIENTO')) return 'row-baja-administrativa';

    if (situacion.startsWith('ESTUDIANTE CON PREVEN')) return 'row-prevencion';

    return '';
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h6">Lista de beneficiarios</Typography>
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 550, width: '100%' }}>
          <DataGrid
            localeText={localeText}
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            components={{ Toolbar: CustomToolbar }}
            getRowClassName={getRowClassName}
            getRowHeight={() => 'auto'}
            initialState={{
              sorting: { sortModel: [{ field: 'id', sort: 'asc' }] },
              columns: { columnVisibilityModel },
            }}
            sx={{
              '& .row-baja-voluntaria': { backgroundColor: '#ffd6d6' },
              '& .row-baja-administrativa': { backgroundColor: '#e6d4ef' },
              '& .row-prevencion': { backgroundColor: '#fff4c2' },
              '& .MuiDataGrid-cell': {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                lineHeight: 1.4,
                paddingTop: 8,
                paddingBottom: 8,
              },
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
}

BeneficiariosBecasTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

BeneficiariosBecasTable.defaultProps = {
  rows: [],
};

export default BeneficiariosBecasTable;
