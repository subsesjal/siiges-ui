import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
} from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import ClearIcon from '@mui/icons-material/Clear';
import { Logo, SnackAlert } from '@siiges-ui/shared';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import FirmaValidacionModal from '../../components/ies/FirmaValidacionModal';

const STATUS_OPTIONS = [
  { value: '', label: 'Todos', color: '#555' },
  { value: 'ELABORADO', label: 'Elaborado', color: '#ff9800' },
  { value: 'ENVIADO', label: 'Enviado', color: '#2196f3' },
  { value: 'ACEPTADO', label: 'Aceptado', color: '#4caf50' },
  { value: 'AUTORIZADO', label: 'Autorizado', color: '#1b5e20' },
  { value: 'VALIDADO', label: 'Validado', color: '#00897b' },
  { value: 'RECHAZADO', label: 'Rechazado', color: '#f44336' },
  { value: 'CANCELADO', label: 'Cancelado', color: '#9e9e9e' },
];

export default function IESDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [firmaResult, setFirmaResult] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false, mensaje: '', type: 'info',
  });

  // Filtros
  const [filters, setFilters] = useState({
    folio: '',
    nombre: '',
    paterno: '',
    materno: '',
    curp: '',
    carrera: '',
    institucion: '',
    rvoe: '',
  });
  const [statusFilter, setStatusFilter] = useState('');

  const fetchData = useCallback(async () => {
    const token = sessionStorage.getItem('iesToken');

    if (!token) {
      router.push('/ies');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = process.env.NEXT_PUBLIC_URL_TITULOS;

      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      if (statusFilter) queryParams.append('status', statusFilter);

      const queryString = queryParams.toString();
      const endpoint = `${url}/doc/getDocGrid${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        sessionStorage.removeItem('iesToken');
        sessionStorage.removeItem('iesCenter');
        router.push('/ies');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setRows(data.data || []);
      } else {
        setError('Error al cargar los datos');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }, [filters, statusFilter, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleClearFilters = () => {
    setFilters({
      folio: '',
      nombre: '',
      paterno: '',
      materno: '',
      curp: '',
      carrera: '',
      institucion: '',
      rvoe: '',
    });
    setStatusFilter('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('iesToken');
    sessionStorage.removeItem('iesCenter');
    router.push('/ies');
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedIds(newSelection);
  };

  const handleOpenFirma = () => {
    if (selectedIds.length === 0) {
      setSnackbar({
        open: true,
        mensaje: 'Seleccione al menos un registro para firmar',
        type: 'warning',
      });
      return;
    }
    setOpenModal(true);
  };

  const handleFirmaSuccess = (data) => {
    if (data && data.foliosRecibidos !== undefined) {
      setFirmaResult(data);
    } else {
      setSnackbar({
        open: true,
        mensaje: 'Documentos firmados correctamente',
        type: 'success',
      });
    }
    setSelectedIds([]);
    fetchData();
  };

  const columns = [
    {
      field: 'code', headerName: 'Folio', flex: 0.7, minWidth: 120,
    },
    {
      field: 'name', headerName: 'Nombre', flex: 1, minWidth: 120,
    },
    {
      field: 'firstName', headerName: 'Paterno', flex: 0.8, minWidth: 100,
    },
    {
      field: 'secondName', headerName: 'Materno', flex: 0.8, minWidth: 100,
    },
    {
      field: 'CURP', headerName: 'CURP', flex: 1.2, minWidth: 180,
    },
    {
      field: 'programName', headerName: 'Carrera', flex: 0.8, minWidth: 100,
    },
    {
      field: 'ies', headerName: 'Institución', flex: 1, minWidth: 100,
    },
    {
      field: 'rvoe', headerName: 'RVOE', flex: 0.7, minWidth: 100,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.7,
      minWidth: 110,
      renderCell: (params) => {
        const colorMap = {
          ELABORADO: '#ff9800',
          ENVIADO: '#2196f3',
          ACEPTADO: '#4caf50',
          RECHAZADO: '#f44336',
          AUTORIZADO: '#1b5e20',
          VALIDADO: '#00897b',
          CANCELADO: '#9e9e9e',
        };
        return (
          <Typography
            sx={{
              color: colorMap[params.value] || 'inherit',
              fontWeight: 'bold',
              fontSize: '0.85rem',
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
  ];

  const localeText = {
    ...esES.components.MuiDataGrid.defaultProps.localeText,
    noRowsLabel: 'No hay registros',
    rowsPerPage: 'Filas por página:',
    footerRowSelected: (count) => (count !== 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : `${count.toLocaleString()} fila seleccionada`),
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Logo />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Sistema de Títulos Electrónicos - IES
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </Paper>

      <Box sx={{ p: 3 }}>
        {/* Filtros */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={1.3}>
              <TextField
                fullWidth
                size="small"
                label="Folio"
                name="folio"
                value={filters.folio}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.3}>
              <TextField
                fullWidth
                size="small"
                label="Nombre"
                name="nombre"
                value={filters.nombre}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.3}>
              <TextField
                fullWidth
                size="small"
                label="Paterno"
                name="paterno"
                value={filters.paterno}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.3}>
              <TextField
                fullWidth
                size="small"
                label="Materno"
                name="materno"
                value={filters.materno}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.5}>
              <TextField
                fullWidth
                size="small"
                label="CURP"
                name="curp"
                value={filters.curp}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <TextField
                fullWidth
                size="small"
                label="Carrera"
                name="carrera"
                value={filters.carrera}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <TextField
                fullWidth
                size="small"
                label="Institución"
                name="institucion"
                value={filters.institucion}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.3}>
              <TextField
                fullWidth
                size="small"
                label="RVOE"
                name="rvoe"
                value={filters.rvoe}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton color="primary" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
                <IconButton color="secondary" onClick={handleClearFilters}>
                  <ClearIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          {/* Filtros de Status */}
          <Box sx={{
            display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2,
          }}
          >
            {STATUS_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                size="small"
                variant={statusFilter === opt.value ? 'contained' : 'outlined'}
                onClick={() => setStatusFilter(opt.value)}
                sx={{
                  borderColor: opt.color,
                  color: statusFilter === opt.value ? 'white' : opt.color,
                  backgroundColor: statusFilter === opt.value ? opt.color : 'transparent',
                  '&:hover': {
                    backgroundColor: opt.color,
                    color: 'white',
                  },
                  textTransform: 'none',
                  fontWeight: statusFilter === opt.value ? 'bold' : 'normal',
                }}
              >
                {opt.label}
              </Button>
            ))}
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Tabla */}
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6">
              Registros de Títulos (
              {rows.length}
              )
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenFirma}
              disabled={selectedIds.length === 0}
            >
              Firmar Documentos (
              {selectedIds.length}
              )
            </Button>
          </Box>

          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={handleSelectionChange}
              selectionModel={selectedIds}
              pageSize={100}
              rowsPerPageOptions={[10, 25, 50, 100]}
              localeText={localeText}
              sx={{
                '& .MuiDataGrid-row:nth-of-type(odd)': {
                  backgroundColor: '#f9f9f9',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#e3f2fd',
                },
                '& .Mui-selected': {
                  backgroundColor: '#bbdefb !important',
                },
              }}
            />
          </div>
        </Paper>
      </Box>

      {/* Modal de Firma */}
      <FirmaValidacionModal
        open={openModal}
        setOpen={setOpenModal}
        selectedIds={selectedIds}
        onSuccess={handleFirmaSuccess}
      />

      {/* Dialog resultado firma */}
      <Dialog
        open={!!firmaResult}
        onClose={() => setFirmaResult(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Resultado de Firma</DialogTitle>
        <DialogContent dividers>
          {firmaResult && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Folios recibidos:
                {' '}
                <strong>{firmaResult.foliosRecibidos || 0}</strong>
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Generados:
                {' '}
                <strong style={{ color: '#2e7d32' }}>
                  {firmaResult.foliosGenerados || 0}
                </strong>
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                No generados:
                {' '}
                <strong style={{ color: '#c62828' }}>
                  {firmaResult.foliosNoGenerados || 0}
                </strong>
              </Typography>

              {(firmaResult.errores || []).length > 0 && (
                <>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="subtitle2" sx={{ mb: 1, color: '#c62828' }}>
                    Errores (
                    {firmaResult.errores.length}
                    ):
                  </Typography>
                  <Box sx={{
                    display: 'flex', flexDirection: 'column', gap: 0.5,
                  }}
                  >
                    {firmaResult.errores.map((err) => (
                      <Chip
                        key={`${err.folio}-${err.error}`}
                        label={`${err.folio}: ${err.error}`}
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ justifyContent: 'flex-start' }}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFirmaResult(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <SnackAlert
        open={snackbar.open}
        close={() => setSnackbar({ ...snackbar, open: false })}
        type={snackbar.type}
        mensaje={snackbar.mensaje}
      />

      {/* Footer */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'rgb(206, 209, 212)',
          py: 2,
          textAlign: 'center',
          color: 'white',
          mt: 3,
        }}
      >
        <Typography variant="body2" style={{ color: '#3b4245' }}>
          &copy; 2026 Secretaría General de Gobierno - Todos los derechos reservados.
        </Typography>
        <Typography variant="body2" style={{ color: '#3b4245' }}>
          Edificio MIND Av. Faro #2350 , Colonia: Verde Valle , CP: 44540, Guadalajara, Jalisco
          Lunes a Viernes de 09:00:00 a 17:00:00 horas
        </Typography>
        <Typography variant="body2" style={{ color: '#3b4245' }}>
          <Link
            href="https://transparenciasitgej.jalisco.gob.mx/api/api/archivos/1908/download?inline=true"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            Avisos de privacidad
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
