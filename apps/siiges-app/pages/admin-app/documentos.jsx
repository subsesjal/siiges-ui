/* eslint-disable react/jsx-props-no-spreading */
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
  Autocomplete,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
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

const toDateInput = (val) => {
  if (!val) return '';
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};

const normalize = (str) => str
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

const filterCenters = (options, state) => {
  const input = normalize(state.inputValue);
  if (!input) return options;
  return options.filter((opt) => normalize(opt.label || '').includes(input));
};

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
  const [centerFilter, setCenterFilter] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [openFirma, setOpenFirma] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
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
      if (centerFilter) params.append('center', centerFilter.value);

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
  }, [search, statusFilter, centerFilter, page, pageSize, baseUrl]);

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

      const mapOptionsCenter = (res) => (res.ok
        ? res.json().then((d) => (d.data || []).map((i) => ({
          value: i.code,
          label: `${i.name} (${i.code})`,
        })))
        : Promise.resolve([]));

      setCenters(await mapOptionsCenter(centersRes));
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
        const raw = data.data || data;
        if (raw.center) await fetchPrograms(raw.center);
        // Mapear campos del API a campos del formulario
        const doc = {
          id: raw.id,
          center: raw.ies,
          program: raw.program,
          code: raw.code,
          name: raw.name,
          firstName: raw.firstName,
          secondName: raw.secondName,
          CURP: raw.CURP,
          email: raw.email,
          date: toDateInput(raw.date),
          start: toDateInput(raw.start2),
          end: toDateInput(raw.end2),
          mode: raw.mode,
          study_state: raw.state,
          study_level: raw.level,
          study_center: raw.center2,
          study_start: toDateInput(raw.start1),
          study_end: toDateInput(raw.end1),
          study_code: raw.ced,
          soc: raw.soc,
          proto: toDateInput(raw.proto),
        };
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
    const body = id ? { id } : { ids: selectedIds.join(',') };
    try {
      const response = await fetch(`${baseUrl}/admin/doc/sendKey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data && (data['registros recibidos'] !== undefined || data['folios recibidos'] !== undefined)) {
          setUploadResult(data);
        } else {
          setSnackbar({ open: true, mensaje: 'Folio(s) enviado(s) a SEP', type: 'success' });
        }
        setSelectedIds([]);
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
    const body = id ? { id } : { ids: selectedIds.join(',') };
    try {
      const response = await fetch(`${baseUrl}/admin/doc/getKey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data && (data['registros recibidos'] !== undefined || data['folios recibidos'] !== undefined)) {
          setUploadResult(data);
        } else {
          setSnackbar({ open: true, mensaje: 'Resultado(s) consultado(s)', type: 'success' });
        }
        setSelectedIds([]);
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
        const data = await response.json().catch(() => ({}));
        setUploadResult(data);
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

  const handleFirmaSuccess = (data) => {
    if (data && data['folios recibidos'] !== undefined) {
      setUploadResult(data);
    } else {
      setSnackbar({ open: true, mensaje: 'Documentos firmados correctamente', type: 'success' });
    }
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
      field: 'programName', headerName: 'Programa', flex: 1, minWidth: 120,
    },
    {
      field: 'ies', headerName: 'Institución', flex: 1, minWidth: 120,
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
          <Tooltip title="Editar documento" arrow>
            <IconButton size="small" color="primary" onClick={() => handleEdit(params.row.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Enviar folio a SEP" arrow>
            <span>
              <IconButton
                size="small"
                color="info"
                onClick={() => handleSendKey(params.row.id)}
                disabled={params.row.status !== 'ELABORADO'}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Consultar resultado SEP" arrow>
            <span>
              <IconButton
                size="small"
                color="success"
                onClick={() => handleGetKey(params.row.id)}
                disabled={params.row.status !== 'ENVIADO'}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Eliminar documento" arrow>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id, 1)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
            <Autocomplete
              size="small"
              options={centers}
              getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.label || '')}
              filterOptions={filterCenters}
              noOptionsText="Sin resultados"
              value={centerFilter}
              onChange={(_, newVal) => {
                setCenterFilter(newVal);
                setPage(0);
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => (
                <TextField {...params} label="Institución" />
              )}
              isOptionEqualToValue={(opt, val) => opt.value === val.value}
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
                setCenterFilter(null);
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
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              size="small"
            >
              Carga Masiva
              <input type="file" accept=".xlsx,.xls" hidden onChange={handleUploadXls} />
            </Button>
            <Tooltip title="Enviar seleccionados a SEP" arrow>
              <span>
                <Button
                  variant="outlined"
                  color="info"
                  startIcon={<SendIcon />}
                  size="small"
                  disabled={selectedIds.length === 0}
                  onClick={() => handleSendKey(null)}
                >
                  Enviar SEP (
                  {selectedIds.length}
                  )
                </Button>
              </span>
            </Tooltip>
            <Tooltip title="Consultar resultado SEP de seleccionados" arrow>
              <span>
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={<DownloadIcon />}
                  size="small"
                  disabled={selectedIds.length === 0}
                  onClick={() => handleGetKey(null)}
                >
                  Consultar SEP (
                  {selectedIds.length}
                  )
                </Button>
              </span>
            </Tooltip>
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

      {/* Dialog resultado carga masiva / firma */}
      <Dialog
        open={!!uploadResult}
        onClose={() => setUploadResult(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {uploadResult?.['folios recibidos'] !== undefined
            ? 'Resultado de Firma'
            : 'Resultado de Carga Masiva'}
        </DialogTitle>
        <DialogContent dividers>
          {uploadResult && uploadResult['registros recibidos'] !== undefined && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Registros recibidos:
                {' '}
                <strong>{uploadResult['registros recibidos']}</strong>
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2e7d32' }}>
                Generados (
                {(uploadResult['registros generados'] || []).length}
                ):
              </Typography>
              <Box sx={{
                display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2,
              }}
              >
                {(uploadResult['registros generados'] || []).map((folio) => (
                  <Chip key={folio} label={folio} size="small" color="success" variant="outlined" />
                ))}
                {(uploadResult['registros generados'] || []).length === 0 && (
                  <Typography variant="body2" color="textSecondary">Ninguno</Typography>
                )}
              </Box>

              {(uploadResult['registros no generados'] || []).length > 0 && (
                <>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="subtitle2" sx={{ mb: 1, color: '#c62828' }}>
                    No generados (
                    {(uploadResult['registros no generados'] || []).length}
                    ):
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {(uploadResult['registros no generados'] || []).map((msg) => (
                      <Chip
                        key={msg}
                        label={msg}
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

          {uploadResult && uploadResult['folios recibidos'] !== undefined && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Folios recibidos:
                {' '}
                <strong>{uploadResult['folios recibidos']}</strong>
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Autenticados:
                {' '}
                <strong style={{ color: '#2e7d32' }}>
                  {uploadResult['folios autenticados'] || 0}
                </strong>
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                No autenticados:
                {' '}
                <strong style={{ color: '#c62828' }}>
                  {uploadResult['folios no autenticados'] || 0}
                </strong>
              </Typography>

              {(uploadResult.errores || []).length > 0 && (
                <>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="subtitle2" sx={{ mb: 1, color: '#c62828' }}>
                    Errores (
                    {uploadResult.errores.length}
                    ):
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {uploadResult.errores.map((err) => (
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
          <Button onClick={() => setUploadResult(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <SnackAlert
        open={snackbar.open}
        close={() => setSnackbar({ ...snackbar, open: false })}
        type={snackbar.type}
        mensaje={snackbar.mensaje}
      />
    </AdminLayout>
  );
}
