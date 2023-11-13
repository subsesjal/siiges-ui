import React, { useState, useEffect } from 'react';
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
  buttonClick,
  buttonType,
}) {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rows.length > 0) {
      setLoading(false);
    }
    setFilteredRows(rows);
  }, [rows]);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchText(value);
    const filteredData = rows.filter(
      (row) => Object.values(row).some((data) => data.toString().toLowerCase().includes(value)),
    );
    setFilteredRows(value ? filteredData : rows);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={9} sx={{ mt: 2 }}>
          {buttonAdd ? (
            <Button
              onClick={buttonClick}
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
            autoFocus
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
          loading={loading}
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
  title: '',
  buttonAdd: false,
  buttonText: '',
  buttonType: '',
  buttonClick: () => {},
};

DataTable.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  buttonAdd: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  buttonClick: PropTypes.func,
};

export default DataTable;
