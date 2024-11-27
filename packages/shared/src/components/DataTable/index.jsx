import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, IconButton, TextField, Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import Button from '../Buttons/Button';

function DataTable({
  title,
  rows,
  columns,
  buttonAdd,
  buttonText,
  buttonDisabled = false,
  buttonClick,
  buttonType,
}) {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [loading, setLoading] = useState(true);
  const [sortModel] = useState([{ field: 'id', sort: 'desc' }]);

  useEffect(() => {
    setLoading(false);
    setFilteredRows(rows);
  }, [rows]);

  // Custom debounce implementation
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      const filteredData = rows.filter(
        (row) => Object.values(row || {}).some(
          (data) => data?.toString().toLowerCase().includes(value),
        ),
      );
      setFilteredRows(value ? filteredData : rows);
    }, 300),
    [rows],
  );

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    debouncedSearch(value);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={9} sx={{ mt: 2 }}>
          {buttonAdd ? (
            <Button
              onClick={buttonClick}
              disabled={buttonDisabled}
              text={buttonText}
              type={buttonType}
            />
          ) : (
            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          )}
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
            size="small"
            sx={{ mt: 2 }}
            value={searchText}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%', marginTop: 15 }}>
        <DataGrid
          localeText={{ noRowsLabel: loading ? 'Cargando...' : 'No hay registros' }}
          loading={loading}
          rows={filteredRows}
          columns={columns || []}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sortModel={sortModel}
        />
      </div>
    </>
  );
}

DataTable.defaultProps = {
  title: '',
  buttonAdd: false,
  buttonDisabled: false,
  buttonText: '',
  buttonType: '',
  buttonClick: () => {},
};

DataTable.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number,
    }),
  ).isRequired,
  buttonAdd: PropTypes.bool,
  buttonDisabled: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  buttonClick: PropTypes.func,
};

export default React.memo(DataTable);
