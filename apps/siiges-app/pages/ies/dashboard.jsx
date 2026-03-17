import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
} from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import ClearIcon from '@mui/icons-material/Clear';
import { Logo, SnackAlert } from '@siiges-ui/shared';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import FirmaValidacionModal from '../../components/ies/FirmaValidacionModal';

export default function IESDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: '', type: 'info' });

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
    status: '',
  });

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

      // Construir query params
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

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
  }, [filters, router]);

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
      status: '',
    });
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

  const handleFirmaSuccess = () => {
    setSnackbar({
      open: true,
      mensaje: 'Documentos firmados correctamente',
      type: 'success',
    });
    setSelectedIds([]);
    fetchData();
  };

  const columns = [
    { field: 'code', headerName: 'Folio', width: 130 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'firstName', headerName: 'Paterno', width: 130 },
    { field: 'secondName', headerName: 'Materno', width: 130 },
    { field: 'CURP', headerName: 'CURP', width: 200 },
    { field: 'programName', headerName: 'Carrera', width: 100 },
    { field: 'ies', headerName: 'Institución', width: 100 },
    { field: 'rvoe', headerName: 'RVOE', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.value === 'AUTORIZADO' ? 'green' : 'orange',
            fontWeight: 'bold',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  const localeText = {
    ...esES.components.MuiDataGrid.defaultProps.localeText,
    noRowsLabel: 'No hay registros',
    rowsPerPage: 'Filas por página:',
    footerRowSelected: (count) => (count !== 1 ? `${count.toLocaleString()} filas seleccionadas` : `${count.toLocaleString()} fila seleccionada`),
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
              <TextField
                fullWidth
                size="small"
                label="Status"
                name="status"
                value={filters.status}
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
          backgroundColor: 'rgb(206, 209, 212)',
          py: 2,
          textAlign: 'center',
          mt: 3,
        }}
      >
        <Typography variant="body2" sx={{ color: '#3b4245' }}>
          &copy; 2026 Secretaría General de Gobierno - Todos los derechos reservados.
        </Typography>
        <Typography variant="caption" sx={{ color: '#3b4245' }}>
          DOC01 - 2.0.0
        </Typography>
      </Box>
    </Box>
  );
}
