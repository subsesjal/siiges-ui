import {
  Grid, IconButton, TextField, Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function DataTable({ title, rows, columns }) {
  return (
    <>
      <Grid container>
        <Grid item xs={9} sx={{ mt: '20px' }}>
          <Typography variant="p" sx={{ pt: 5, fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            margin="normal"
            fullWidth
            id="filter"
            label="Filtrar"
            type="text"
            name="filter"
            autoComplete="filter"
            autoFocus
            size="small"
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton position="end">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%', marginTop: 15 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
}

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({ width: PropTypes.number }))
    .isRequired,
};

export default DataTable;
