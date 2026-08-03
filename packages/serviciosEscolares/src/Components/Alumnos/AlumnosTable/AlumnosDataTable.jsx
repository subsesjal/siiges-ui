import React, {
  useState, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Grid, IconButton, TextField, Typography, Stack, Button as MuiButton, Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/EditOutlined';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import {
  ButtonSimple, DataTable, DefaultModal, useAuth, useUI, updateRecord,
} from '@siiges-ui/shared';
import DocumentsStudents from '../../utils/DocumentsStudents';

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
  onEgresados,
}) {
  const { session } = useAuth();
  const { setNoti, setLoading: setGlobalLoading } = useUI();
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [selectionModel, setSelectionModel] = useState([]);
  const [activating, setActivating] = useState(false);
  const [egresando, setEgresando] = useState(false);
  const [noActivadosOpen, setNoActivadosOpen] = useState(false);
  const [noActivadosList, setNoActivadosList] = useState([]);
  const [noEgresadosOpen, setNoEgresadosOpen] = useState(false);
  const [noEgresadosList, setNoEgresadosList] = useState([]);
  const [confirmAction, setConfirmAction] = useState(null);

  const canGestionar = session?.rol === 'admin' || session?.rol === 'avances_sicyt';
  const mostrarActivar = canGestionar && selectionModel.length > 0;
  const mostrarEgresar = canGestionar && selectionModel.length > 0;

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

  const handleEditarAlumno = (alumnoId) => {
    setNoActivadosOpen(false);
    setNoEgresadosOpen(false);
    setConfirmAction(null);
    router.push(`/serviciosEscolares/alumnos/${alumnoId}/EditarAlumno`);
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
        const {
          activados, noActivados, totalActivados, totalNoActivados,
        } = response.data;

        if (totalActivados > 0) {
          setNoti({
            open: true,
            message: `Se activaron ${totalActivados} alumno(s) correctamente.`,
            type: 'success',
          });
        }

        if (totalNoActivados > 0) {
          const detalles = (rows || []).filter((row) => noActivados.includes(row.id));
          setNoActivadosList(detalles);
          setNoActivadosOpen(true);
        }

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

  const handleEgresar = async () => {
    setEgresando(true);
    setGlobalLoading(true);
    try {
      const response = await updateRecord({
        data: { alumnoIds: selectionModel },
        endpoint: '/alumnos/egreso-masivo',
      });

      if (response && response.statusCode === 200) {
        const {
          egresados, noEgresados, totalEgresados, totalNoEgresados,
        } = response.data;

        if (totalEgresados > 0) {
          setNoti({
            open: true,
            message: `Se egresaron ${totalEgresados} alumno(s) correctamente.`,
            type: 'success',
          });
        }

        if (totalNoEgresados > 0) {
          const detalles = (rows || []).filter((row) => noEgresados.includes(row.id));
          setNoEgresadosList(detalles);
          setNoEgresadosOpen(true);
        }

        if (onEgresados) onEgresados(egresados);
        setSelectionModel([]);
      } else {
        throw new Error('No se pudo completar el egreso');
      }
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Error al egresar alumnos',
        type: 'error',
      });
    } finally {
      setEgresando(false);
      setGlobalLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    if (confirmAction === 'activar') {
      await handleActivar();
    } else if (confirmAction === 'egresar') {
      await handleEgresar();
    }
    setConfirmAction(null);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel((prevSelection) => {
      const visibleIds = new Set(filteredRows.map((row) => row.id));
      const hiddenSelected = prevSelection.filter((id) => !visibleIds.has(id));
      return [...hiddenSelected, ...newSelection];
    });
  };

  const localeText = {
    ...esES.components.MuiDataGrid.defaultProps.localeText,
    noRowsLabel: 'No hay registros',
    rowsPerPage: 'Filas por página:',
    footerRowSelected: (count) => (count !== 1 ? `${count.toLocaleString()} filas seleccionadas` : `${count.toLocaleString()} fila seleccionada`),
  };

  const alumnosDetalleColumns = [
    {
      field: 'id', headerName: 'ID', width: 50, hide: true,
    },
    { field: 'matricula', headerName: 'Matrícula', width: 150 },
    {
      field: 'nombreCompleto',
      headerName: 'Nombre',
      width: 280,
      valueGetter: (params) => `${params.row.nombre} ${params.row.apellidoPaterno} ${params.row.apellidoMaterno}`,
    },
    { field: 'situacion', headerName: 'Situación', width: 120 },
    { field: 'validacion', headerName: 'Validación', width: 150 },
    {
      field: 'documentos',
      headerName: 'Documentos',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <DocumentsStudents
          archivoCertificadoUbicacion={params.row.archivoCertificadoUbicacion}
          archivoNacimientoUbicacion={params.row.archivoNacimientoUbicacion}
          archivoCurpUbicacion={params.row.archivoCurpUbicacion}
          archivoValidacionUbicacion={params.row.archivoValidacionUbicacion}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="Editar alumno" placement="top">
          <IconButton onClick={() => handleEditarAlumno(params.id)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const confirmTexts = {
    activar: {
      title: 'Alumnos a activar',
      message: 'Los siguientes alumnos serán procesados para activación. Solo se activarán aquellos que cumplan los requisitos (validación Auténtica y documentos completos).',
      confirmText: 'Activar',
    },
    egresar: {
      title: 'Alumnos a egresar',
      message: 'Los siguientes alumnos serán procesados para egreso. Solo se egresarán aquellos que cumplan los requisitos de egreso.',
      confirmText: 'Egresar',
    },
  };

  const alumnosSeleccionados = (rows || []).filter((row) => selectionModel.includes(row.id));

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={9} sx={{ mt: 2 }}>
          {buttonAdd || onReloadClick || mostrarActivar || mostrarEgresar ? (
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
                onClick={() => setConfirmAction('activar')}
                disabled={activating || egresando}
                text="Activar Alumnos"
                design="guardar"
              />
              )}
              {mostrarEgresar && (
              <ButtonSimple
                onClick={() => setConfirmAction('egresar')}
                disabled={egresando || activating}
                text="Egresar Alumnos"
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
          onSelectionModelChange={handleSelectionModelChange}
          initialState={initialState || { sorting: { sortModel: [{ field: 'id', sort: 'asc' }] } }}
        />
      </div>

      <DefaultModal
        title={confirmAction ? confirmTexts[confirmAction].title : ''}
        open={Boolean(confirmAction)}
        setOpen={() => setConfirmAction(null)}
        size="xl"
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          {confirmAction ? confirmTexts[confirmAction].message : ''}
        </Typography>
        <DataTable
          rows={alumnosSeleccionados}
          columns={alumnosDetalleColumns}
          title="Alumnos seleccionados"
        />
        <Grid container justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
          <Grid item>
            <ButtonSimple
              text="Regresar"
              design="cancelar"
              onClick={() => setConfirmAction(null)}
            />
          </Grid>
          <Grid item>
            <ButtonSimple
              text={confirmAction ? confirmTexts[confirmAction].confirmText : ''}
              design="guardar"
              disabled={activating || egresando}
              onClick={handleConfirmAction}
            />
          </Grid>
        </Grid>
      </DefaultModal>

      <DefaultModal
        title="No se pudieron activar"
        open={noActivadosOpen}
        setOpen={setNoActivadosOpen}
        size="xl"
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          Los siguientes alumnos no pudieron ser activados porque su validación
          no está en estatus Auténtico y/o les faltan documentos requeridos.
          Puede editarlos o revisar sus documentos para corregir su información.
        </Typography>
        <DataTable
          rows={noActivadosList}
          columns={alumnosDetalleColumns}
          title="Alumnos no activados"
        />
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <ButtonSimple
            text="Regresar"
            design="cancelar"
            onClick={() => setNoActivadosOpen(false)}
          />
        </Grid>
      </DefaultModal>

      <DefaultModal
        title="No se pudieron egresar"
        open={noEgresadosOpen}
        setOpen={setNoEgresadosOpen}
        size="xl"
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          Los siguientes alumnos no cumplen los requisitos de egreso: su
          validación no está en estatus Auténtico, les faltan asignaturas
          obligatorias por aprobar, o los créditos cursados no coinciden con
          los requeridos por el RVOE. Puede editarlos para revisar su
          información.
        </Typography>
        <DataTable
          rows={noEgresadosList}
          columns={alumnosDetalleColumns}
          title="Alumnos no egresados"
        />
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <ButtonSimple
            text="Regresar"
            design="cancelar"
            onClick={() => setNoEgresadosOpen(false)}
          />
        </Grid>
      </DefaultModal>
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
  onEgresados: null,
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
  onEgresados: PropTypes.func,
};

export default React.memo(AlumnosDataTable);
