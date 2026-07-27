import React, {
  useState, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Grid, IconButton, TextField, Typography, Stack, Button as MuiButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DataGrid, esES } from '@mui/x-data-grid';
import {
  ButtonSimple, useAuth, useUI, updateRecord,
} from '@siiges-ui/shared';

function AlumnosDataTable({
  title,
  rows,
  columns,
  buttonAdd,
  buttonText,
  buttonDisabled,
  buttonClick,
  buttonType,
  onReloadClick,
  buttonReloadDisabled,
  initialState,
  onActivados,
}) {
  const { session } = useAuth();
  const { setNoti, setLoading: setGlobalLoading } = useUI();

  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [selectionModel, setSelectionModel] = useState([]);
  const [activating, setActivating] = useState(false);

  const canActivar = session?.rol === 'admin' || session?.rol === 'avances_sicyt';
  const mostrarActivar = canActivar && selectionModel.length > 0;

  useEffect(() => {
    setLoading(false);
    setFilteredRows(rows);
  }, [rows]);

  useEffect(() => {
    setSelectionModel((prev) => prev.filter(
      (id) => (rows || []).some((row) => row.id === id),
    ));
  }, [rows]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((value, dataRows = []) => {
      const filteredData = dataRows.filter((row) => {
        const primitiveValues = Object.values(row || {}).filter(
          (data) => data != null && typeof data !== 'object',
        );

        const getterValues = (columns || [])
          .filter((col) => typeof col.valueGetter === 'function')
          .map((col) => {
            try {
              return col.valueGetter({ row });
            } catch {
              return null;
            }
          })
          .filter((val) => val != null);

        const allValues = [...primitiveValues, ...getterValues];

        return allValues.some((data) => data.toString().toLowerCase().includes(value));
      });

      setFilteredRows(value ? filteredData : dataRows);
    }, 300),
    [columns],
  );

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    debouncedSearch(value, rows);
  };

  const handleActivar = async () => {
    setActivating(true);
    setGlobalLoading(true);
    try {
      const response = await updateRecord({
        data: { alumnoIds: selectionModel },
        endpoint: '/alumnos/activacion-masiva',
      });

      if (response && response.statusCode === 200) {
        const { activados, totalActivados, totalNoActivados } = response.data;

        setNoti({
          open: true,
          message: totalNoActivados > 0
            ? `Se activaron ${totalActivados} alumno(s). ${totalNoActivados} alumno(s) no se pudieron activar por no tener validación Auténtica.`
            : `Se activaron ${totalActivados} alumno(s) correctamente.`,
          type: totalNoActivados > 0 ? 'warning' : 'success',
        });

        if (onActivados) onActivados(activados);
        setSelectionModel([]);
      } else {
        throw new Error('No se pudo completar la activación');
      }
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Error al activar alumnos',
        type: 'error',
      });
    } finally {
      setActivating(false);
      setGlobalLoading(false);
    }
  };

  const localeText = {
    ...esES.components.MuiDataGrid.defaultProps.localeText,
    noRowsLabel: 'No hay registros',
    rowsPerPage: 'Filas por página:',
    footerRowSelected: (count) => (count !== 1 ? `${count.toLocaleString()} filas seleccionadas` : `${count.toLocaleString()} fila seleccionada`),
  };

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={9} sx={{ mt: 2 }}>
          {buttonAdd || onReloadClick || mostrarActivar ? (
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                '& > .MuiGrid-container': {
                  width: 'auto',
                },
              }}
            >
              {buttonAdd && (
                <ButtonSimple
                  onClick={buttonClick}
                  disabled={buttonDisabled}
                  text={buttonText}
                  design={buttonType || 'guardar'}
                />
              )}
              {onReloadClick && (
                <MuiButton
                  variant="text"
                  onClick={onReloadClick}
                  disabled={buttonReloadDisabled}
                  startIcon={<RefreshIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Actualizar
                </MuiButton>
              )}
              {mostrarActivar && (
                <ButtonSimple
                  onClick={handleActivar}
                  disabled={activating}
                  text={`Activar (${selectionModel.length})`}
                  design="guardar"
                />
              )}
            </Stack>
          ) : (
            <Typography variant="h6">
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
          localeText={localeText}
          loading={loading}
          rows={filteredRows}
          columns={columns || []}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
          initialState={initialState || { sorting: { sortModel: [{ field: 'id', sort: 'asc' }] } }}
        />
      </div>
    </>
  );
}

AlumnosDataTable.defaultProps = {
  title: '',
  buttonAdd: false,
  buttonDisabled: false,
  buttonText: '',
  buttonType: '',
  onReloadClick: null,
  buttonReloadDisabled: false,
  initialState: { sorting: { sortModel: [{ field: 'id', sort: 'asc' }] } },
  buttonClick: () => {},
  onActivados: null,
};

AlumnosDataTable.propTypes = {
  initialState: PropTypes.shape({
    sorting: PropTypes.shape({
      sortModel: PropTypes.arrayOf(
        PropTypes.shape({
          field: PropTypes.string.isRequired,
          sort: PropTypes.oneOf(['desc', 'asc']),
        }),
      ),
    }),
  }),
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
  onReloadClick: PropTypes.func,
  buttonReloadDisabled: PropTypes.bool,
  onActivados: PropTypes.func,
};

export default React.memo(AlumnosDataTable);
