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
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { SnackAlert } from '@siiges-ui/shared';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import AdminLayout from '../../components/admin/AdminLayout';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import FormModal from '../../components/admin/FormModal';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import FirmaValidacionModal from '../../components/admin/FirmaAdminModal';

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

export default function AdminDocumentos() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [openFirma, setOpenFirma] = useState(false);
  const [centers, setCenters] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [modes, setModes] = useState([]);
  const [socOptions, setSocOptions] = useState([]);
  const [studyLevels, setStudyLevels] = useState([]);
  const [states, setStates] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false, mensaje: '', type: 'info',
  });

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
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`${baseUrl}/admin/doc/getDocGrid?${params}`, {
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
  }, [search, statusFilter, page, pageSize, baseUrl]);

  const fetchOptions = useCallback(async () => {
    try {
      const headers = { Authorization: `Bearer ${getToken()}` };
      const [centersRes, modesRes, socRes, levelsRes, statesRes] = await Promise.all([
        fetch(`${baseUrl}/admin/doc/getDocPop`, { headers }),
        fetch(`${baseUrl}/admin/doc/getDocOpc?entity=mode`, { headers }),
        fetch(`${baseUrl}/admin/doc/getDocOpc?entity=soc`, { headers }),
        fetch(`${baseUrl}/admin/doc/getDocOpc?entity=level`, { headers }),
        fetch(`${baseUrl}/admin/doc/getDocOpc?entity=states`, { headers }),
      ]);

      const mapOptions = (res) => (res.ok
        ? res.json().then((d) => (d.data || []).map((i) => ({ value: i.id, label: i.name })))
        : Promise.resolve([]));

      setCenters(await mapOptions(centersRes));
      setModes(await mapOptions(modesRes));
      setSocOptions(await mapOptions(socRes));
      setStudyLevels(await mapOptions(levelsRes));
      setStates(await mapOptions(statesRes));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error cargando opciones:', err);
    }
  }, [baseUrl]);

  const fetchPrograms = async (centerId) => {
    try {
      const response = await fetch(
        `${baseUrl}/admin/doc/getDocOpc?entity=program&center=${centerId}`,
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      if (response.ok) {
        const data = await response.json();
        setPrograms((data.data || []).map((p) => ({ value: p.id, label: p.name })));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchOptions();
  }, [fetchData, fetchOptions]);

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/admin/doc/getDocJson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ entity: 'doc', id }),
      });
      if (response.ok) {
        const data = await response.json();
        const doc = data.data || data;
        if (doc.center) await fetchPrograms(doc.center);
        setEditData(doc);
        setOpenModal(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id, opc) => {
    const action = opc === 1 ? 'eliminar' : 'cancelar';
    // eslint-disable-next-line no-alert
    if (!window.confirm(`¿Está seguro de ${action} este documento?`)) return;
    try {
      const response = await fetch(`${baseUrl}/admin/doc/dropDoc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ entity: 'doc', id, opc }),
      });
      if (response.ok) {
        setSnackbar({ open: true, mensaje: `Documento ${opc === 1 ? 'eliminado' : 'cancelado'}`, type: 'success' });
        fetchData();
      } else {
        setSnackbar({ open: true, mensaje: `Error al ${action}`, type: 'error' });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
      setSnackbar({ open: true, mensaje: 'Error de conexión', type: 'error' });
    }
  };

  const handleSendKey = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/admin/doc/sendKey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setSnackbar({ open: true, mensaje: 'Folio enviado a SEP', type: 'success' });
        fetchData();
      } else {
        const data = await response.json().catch(() => ({}));
        setSnackbar({ open: true, mensaje: data.message || 'Error al enviar', type: 'error' });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
      setSnackbar({ open: true, mensaje: 'Error de conexión', type: 'error' });
    }
  };

  const handleGetKey = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/admin/doc/getKey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setSnackbar({ open: true, mensaje: 'Resultado descargado', type: 'success' });
        fetchData();
      } else {
        const data = await response.json().catch(() => ({}));
        setSnackbar({ open: true, mensaje: data.message || 'Error al consultar', type: 'error' });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
      setSnackbar({ open: true, mensaje: 'Error de conexión', type: 'error' });
    }
  };

  const handleUploadXls = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('layout', file);

    try {
      const response = await fetch(`${baseUrl}/admin/doc/uploadXls`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      if (response.ok) {
        setSnackbar({ open: true, mensaje: 'Archivo cargado exitosamente', type: 'success' });
        fetchData();
      } else {
        const data = await response.json().catch(() => ({}));
        setSnackbar({ open: true, mensaje: data.message || 'Error al cargar archivo', type: 'error' });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
      setSnackbar({ open: true, mensaje: 'Error de conexión', type: 'error' });
    }
    // Reset input
    e.target.value = '';
  };

  const handleSubmit = async (formData, id) => {
    const body = { ...formData };
    if (id) body.id = id;

    const response = await fetch(`${baseUrl}/admin/doc/addDoc`, {
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

    setSnackbar({ open: true, mensaje: id ? 'Documento actualizado' : 'Documento creado', type: 'success' });
    fetchData();
  };

  const handleFirmaSuccess = () => {
    setSnackbar({ open: true, mensaje: 'Documentos firmados correctamente', type: 'success' });
    setSelectedIds([]);
    fetchData();
  };

  const fields = [
    {
      name: 'center', label: 'Centro / IES', required: true, options: centers,
    },
    {
      name: 'program', label: 'Programa', required: true, options: programs,
    },
    { name: 'code', label: 'Folio' },
    { name: 'name', label: 'Nombre', required: true },
    { name: 'firstName', label: 'Apellido Paterno', required: true },
    { name: 'secondName', label: 'Apellido Materno' },
    { name: 'CURP', label: 'CURP', required: true },
    { name: 'email', label: 'Correo', type: 'email' },
    { name: 'date', label: 'Fecha de Expedición', type: 'date' },
    { name: 'start', label: 'Fecha Inicio', type: 'date' },
    { name: 'end', label: 'Fecha Fin', type: 'date' },
    { name: 'mode', label: 'Modalidad', options: modes },
    { name: 'study_state', label: 'Estado de Estudios', options: states },
    { name: 'study_level', label: 'Nivel de Estudios', options: studyLevels },
    { name: 'study_center', label: 'Centro de Estudios' },
    { name: 'study_start', label: 'Inicio Estudios', type: 'date' },
    { name: 'study_end', label: 'Fin Estudios', type: 'date' },
    { name: 'study_code', label: 'Código Estudios' },
    { name: 'soc', label: 'Servicio Social', options: socOptions },
    { name: 'proto', label: 'Fecha Protocolo', type: 'date' },
  ];

  const columns = [
    { field: 'code', headerName: 'Folio', width: 120 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'firstName', headerName: 'Paterno', width: 120 },
    { field: 'secondName', headerName: 'Materno', width: 120 },
    { field: 'CURP', headerName: 'CURP', width: 200 },
    { field: 'programName', headerName: 'Programa', width: 130 },
    { field: 'ies', headerName: 'Institución', width: 130 },
    { field: 'rvoe', headerName: 'RVOE', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const colorMap = {
          ELABORADO: '#ff9800',
          ENVIADO: '#2196f3',
          ACEPTADO: '#4caf50',
          RECHAZADO: '#f44336',
          AUTORIZADO: '#1b5e20',
          CANCELADO: '#9e9e9e',
        };
        return (
          <Typography
            sx={{ color: colorMap[params.value] || 'inherit', fontWeight: 'bold', fontSize: '0.85rem' }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="info"
            onClick={() => handleSendKey(params.row.id)}
            title="Enviar a SEP"
            disabled={params.row.status !== 'ELABORADO'}
          >
            <SendIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="success"
            onClick={() => handleGetKey(params.row.id)}
            title="Consultar resultado"
            disabled={params.row.status !== 'ENVIADO'}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id, 1)}
            title="Eliminar"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const localeText = {
    ...esES.components.MuiDataGrid.defaultProps.localeText,
    noRowsLabel: 'No hay registros',
    footerRowSelected: (count) => (count !== 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : `${count.toLocaleString()} fila seleccionada`),
  };

  return (
    <AdminLayout title="Documentos / Títulos Electrónicos">
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
                if (e.key === 'Enter') {
                  setPage(0);
                  fetchData();
                }
              }}
            />
          </Grid>
          <Grid item>
            <IconButton color="primary" onClick={() => { setPage(0); fetchData(); }}>
              <SearchIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => {
                setSearch('');
                setStatusFilter('');
                setPage(0);
              }}
            >
              <ClearIcon />
            </IconButton>
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
              onClick={() => {
                setStatusFilter(opt.value);
                setPage(0);
              }}
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

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2,
        }}
        >
          <Typography variant="h6">
            Documentos (
            {totalRows}
            )
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              size="small"
            >
              Carga Masiva
              <input type="file" accept=".xlsx,.xls" hidden onChange={handleUploadXls} />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              disabled={selectedIds.length === 0}
              onClick={() => setOpenFirma(true)}
            >
              Firmar (
              {selectedIds.length}
              )
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              onClick={() => { setEditData(null); setOpenModal(true); }}
            >
              Nuevo
            </Button>
          </Box>
        </Box>

        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(newSelection) => setSelectedIds(newSelection)}
            selectionModel={selectedIds}
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
            sx={{
              '& .MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
              '& .MuiDataGrid-row:hover': { backgroundColor: '#e3f2fd' },
              '& .Mui-selected': { backgroundColor: '#bbdefb !important' },
            }}
          />
        </div>
      </Paper>

      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={editData ? 'Editar Documento' : 'Nuevo Documento'}
        fields={fields}
        onSubmit={handleSubmit}
        initialData={editData}
      />

      <FirmaValidacionModal
        open={openFirma}
        setOpen={setOpenFirma}
        selectedIds={selectedIds}
        onSuccess={handleFirmaSuccess}
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
