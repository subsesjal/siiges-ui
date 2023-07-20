import {
  Grid, IconButton, TextField, Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function DataTable({ title, rows, columns }) {
  const [searchText, setSearchText] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState(rows);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    if (value === '') {
      setFilteredRows(rows);
    } else {
      const filteredData = rows.filter(
        (row) => Object.values(row).some(
          (data) => data !== null && data.toString().toLowerCase().includes(value.trim()),
        ),
      );
      setFilteredRows(filteredData);
    }
  };
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
            value={searchText}
            onChange={handleSearch}
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
          rows={filteredRows}
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
