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

export default function AdminUsuarios() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [centers, setCenters] = useState([]);
  const [positions, setPositions] = useState([]);
  const [levels, setLevels] = useState([]);
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

      const response = await fetch(`${baseUrl}/admin/usr/getUsrGrid?${params}`, {
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

  const fetchOptions = useCallback(async () => {
    try {
      const [centersRes, positionsRes, levelsRes] = await Promise.all([
        fetch(`${baseUrl}/admin/usr/getUsrPop`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${baseUrl}/admin/usr/getUsrOpc?entity=position`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        fetch(`${baseUrl}/admin/usr/getUsrOpc?entity=level`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);

      if (centersRes.ok) {
        const data = await centersRes.json();
        setCenters((data.data || []).map((c) => ({ value: c.id, label: c.name })));
      }
      if (positionsRes.ok) {
        const data = await positionsRes.json();
        setPositions((data.data || []).map((p) => ({ value: p.id, label: p.name })));
      }
      if (levelsRes.ok) {
        const data = await levelsRes.json();
        setLevels((data.data || []).map((l) => ({ value: l.id, label: l.name })));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error cargando opciones:', err);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchData();
    fetchOptions();
  }, [fetchData, fetchOptions]);

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/admin/usr/getUsrJson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ entity: 'user', id }),
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
    if (!window.confirm('¿Está seguro de desactivar este usuario?')) return;
    try {
      const response = await fetch(`${baseUrl}/admin/usr/dropUsr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ entity: 'user', id }),
      });
      if (response.ok) {
        setSnackbar({ open: true, mensaje: 'Usuario desactivado', type: 'success' });
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

    const response = await fetch(`${baseUrl}/admin/usr/addUser`, {
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

    setSnackbar({ open: true, mensaje: id ? 'Usuario actualizado' : 'Usuario creado', type: 'success' });
    fetchData();
  };

  const fields = [
    {
      name: 'center', label: 'Centro / IES', required: true, options: centers,
    },
    {
      name: 'position', label: 'Cargo', required: true, options: positions,
    },
    { name: 'level', label: 'Nivel', options: levels },
    { name: 'name', label: 'Nombre', required: true },
    { name: 'firstName', label: 'Apellido Paterno', required: true },
    { name: 'secondName', label: 'Apellido Materno' },
    { name: 'CURP', label: 'CURP', required: true },
    {
      name: 'email', label: 'Correo Electrónico', required: true, type: 'email',
    },
    {
      name: 'NIP', label: 'NIP', type: 'password', required: !editData,
    },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'firstName', headerName: 'Paterno', width: 130 },
    { field: 'secondName', headerName: 'Materno', width: 130 },
    { field: 'CURP', headerName: 'CURP', width: 200 },
    { field: 'email', headerName: 'Correo', width: 200 },
    { field: 'centerName', headerName: 'Centro', width: 150 },
    { field: 'positionName', headerName: 'Cargo', width: 120 },
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
    <AdminLayout title="Usuarios / Responsables">
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
            Usuarios (
            {totalRows}
            )
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setEditData(null); setOpenModal(true); }}
          >
            Nuevo Usuario
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
        title={editData ? 'Editar Usuario' : 'Nuevo Usuario'}
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
