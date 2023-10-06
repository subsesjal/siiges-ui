import {
  Grid, IconButton, TextField, Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ButtonAdd from '../Buttons/ButtonAdd';

function DataTable({
  title,
  rows,
  columns,
  buttonAdd,
  buttonText,
  buttonClick,
}) {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filteredData = value
      ? rows.filter((row) => Object.values(row).some(
        (data) => data && data.toString().toLowerCase().includes(value.trim()),
      ))
      : rows;
    setFilteredRows(filteredData);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={9} sx={{ mt: '20px' }}>
          {!buttonAdd ? (
            <ButtonAdd onClick={buttonClick} text={buttonText} />
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

DataTable.defaultProps = {
  title: null,
  buttonAdd: true,
  buttonText: null,
  buttonClick: () => {},
};

DataTable.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({ width: PropTypes.number }))
    .isRequired,
  buttonAdd: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonClick: PropTypes.func,
};

export default DataTable;
