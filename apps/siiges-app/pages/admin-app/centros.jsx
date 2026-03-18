import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Alert,
  TextField,
  Grid,
} from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { SnackAlert } from '@siiges-ui/shared';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import AdminLayout from '../../components/admin/AdminLayout';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import FormModal from '../../components/admin/FormModal';

export default function AdminCentros() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: '', type: 'info' });

  const getToken = () => sessionStorage.getItem('adminToken');
  const baseUrl = process.env.NEXT_PUBLIC_URL_TITULOS;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: page + 1,
        limit: pageSize,
      });
      if (search) params.append('search', search);

      const response = await fetch(`${baseUrl}/admin/org/getOrgGrid?${params}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (response.ok) {
        const data = await response.json();
        setRows(data.data || []);
        if (data.pagination) {
          setTotalRows(data.pagination.total || 0);
        }
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
  }, [search, page, pageSize, baseUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/admin/org/getOrgJson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ entity: 'center', id }),
      });
      if (response.ok) {
        const data = await response.json();
        setEditData(data.data || data);
        setOpenModal(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('¿Está seguro de desactivar este centro?')) return;
    try {
      const response = await fetch(`${baseUrl}/admin/org/dropOrg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ entity: 'center', id }),
      });
      if (response.ok) {
        setSnackbar({ open: true, mensaje: 'Centro desactivado', type: 'success' });
        fetchData();
      } else {
        setSnackbar({ open: true, mensaje: 'Error al desactivar', type: 'error' });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
      setSnackbar({ open: true, mensaje: 'Error de conexión', type: 'error' });
    }
  };

  const handleSubmit = async (formData, id) => {
    const body = { ...formData };
    if (id) body.id = id;

    const response = await fetch(`${baseUrl}/admin/org/addCenter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Error al guardar');
    }

    setSnackbar({ open: true, mensaje: id ? 'Centro actualizado' : 'Centro creado', type: 'success' });
    fetchData();
  };

  const fields = [
    {
      name: 'name', label: 'Nombre del Centro', required: true, fullWidth: true,
    },
    { name: 'code', label: 'Código', required: true },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name', headerName: 'Nombre', flex: 2, minWidth: 250,
    },
    {
      field: 'code', headerName: 'Código', flex: 0.8, minWidth: 120,
    },
    {
      field: 'status', headerName: 'Estado', flex: 0.6, minWidth: 90,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const localeText = {
    ...esES.components.MuiDataGrid.defaultProps.localeText,
    noRowsLabel: 'No hay registros',
  };

  return (
    <AdminLayout title="Centros / Instituciones">
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { setPage(0); fetchData(); }
              }}
            />
          </Grid>
          <Grid item>
            <IconButton color="primary" onClick={() => { setPage(0); fetchData(); }}>
              <SearchIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => { setSearch(''); setPage(0); }}>
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2,
        }}
        >
          <Typography variant="h6">
            Centros (
            {totalRows}
            )
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setEditData(null); setOpenModal(true); }}
          >
            Nuevo Centro
          </Button>
        </Box>

        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            paginationMode="server"
            rowCount={totalRows}
            page={page}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPage(0);
            }}
            rowsPerPageOptions={[25, 50, 100]}
            localeText={localeText}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
              '& .MuiDataGrid-row:hover': { backgroundColor: '#e3f2fd' },
            }}
          />
        </div>
      </Paper>

      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={editData ? 'Editar Centro' : 'Nuevo Centro'}
        fields={fields}
        onSubmit={handleSubmit}
        initialData={editData}
      />

      <SnackAlert
        open={snackbar.open}
        close={() => setSnackbar({ ...snackbar, open: false })}
        type={snackbar.type}
        mensaje={snackbar.mensaje}
      />
    </AdminLayout>
  );
}
